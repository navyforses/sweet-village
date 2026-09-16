import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Lang, SectionKey, SiteContent } from "@shared/content";

export const CSRF_HEADER = "X-Requested-With";
export const CSRF_VALUE = "sv-admin";

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly payload: unknown,
  ) {
    super(`${status} ${code}`);
    this.name = "AdminApiError";
  }
}

export async function adminFetch<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const response = await fetch(path, {
    method: init.method ?? "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      [CSRF_HEADER]: CSRF_VALUE,
      ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  let payload: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }
  if (!response.ok) {
    const code =
      payload && typeof payload === "object" && typeof (payload as { error?: unknown }).error === "string"
        ? (payload as { error: string }).error
        : `http_${response.status}`;
    throw new AdminApiError(response.status, code, payload);
  }
  return payload as T;
}

export const isUnauthorized = (error: unknown) => error instanceof AdminApiError && error.status === 401;

export interface SessionResponse {
  ok: true;
  expiresAt: string;
}

export function useAdminSession() {
  return useQuery({
    queryKey: ["admin-session"],
    queryFn: () => adminFetch<SessionResponse>("/api/admin/me"),
    retry: false,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: true,
  });
}

export function useLogin() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (password: string) => adminFetch<{ ok: true; expiresAt: string }>("/api/admin/login", { method: "POST", body: { password } }),
    onSuccess: data => {
      client.setQueryData(["admin-session"], { ok: true, expiresAt: data.expiresAt } satisfies SessionResponse);
    },
  });
}

export function useLogout() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => adminFetch<{ ok: true }>("/api/admin/logout", { method: "POST" }),
    onSettled: () => {
      client.removeQueries({ queryKey: ["admin-session"] });
      client.removeQueries({ queryKey: ["admin-section"] });
    },
  });
}

/**
 * Asks the server to rebuild the static pages. Fire-and-forget: a failure
 * only delays when search engines see the change (the nightly cron catches
 * up), so it never blocks or fails the save itself. A debounced request is
 * retried once after the debounce window.
 */
export function requestPublish(retry = true): void {
  adminFetch<{ triggered: boolean; retryAfterSeconds?: number }>("/api/admin/publish", { method: "POST" })
    .then(result => {
      if (!result.triggered && retry && result.retryAfterSeconds) {
        window.setTimeout(() => requestPublish(false), (result.retryAfterSeconds + 5) * 1000);
      }
    })
    .catch(() => {
      /* not configured or transient — the nightly rebuild covers it */
    });
}

export interface SectionResponse<K extends SectionKey = SectionKey> {
  key: K;
  value: SiteContent[K];
  /** Opaque server timestamp; null when the section has never been saved. */
  updatedAt: string | null;
  stored: boolean;
}

export const sectionQueryKey = (key: SectionKey) => ["admin-section", key] as const;

export function useSection<K extends SectionKey>(key: K) {
  return useQuery({
    queryKey: sectionQueryKey(key),
    queryFn: () => adminFetch<SectionResponse<K>>(`/api/admin/content?key=${key}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: (count, error) => !isUnauthorized(error) && count < 1,
  });
}

export interface SaveSectionInput<K extends SectionKey> {
  value: SiteContent[K];
  ifUpdatedAt: string | null;
  note?: string;
}

export function useSaveSection<K extends SectionKey>(key: K) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: SaveSectionInput<K>) =>
      adminFetch<{ key: K; updatedAt: string }>("/api/admin/content", {
        method: "PUT",
        body: { key, value: input.value, ifUpdatedAt: input.ifUpdatedAt, note: input.note },
      }),
    onSuccess: (data, input) => {
      client.setQueryData<SectionResponse<K>>(sectionQueryKey(key), { key, value: input.value, updatedAt: data.updatedAt, stored: true });
      client.invalidateQueries({ queryKey: ["site-content"] });
      requestPublish();
    },
  });
}

export interface RevisionSummary {
  id: number;
  key: SectionKey;
  savedAt: string;
  savedBy: string;
  note: string | null;
}

export interface RevisionDetail<K extends SectionKey = SectionKey> extends RevisionSummary {
  key: K;
  value: SiteContent[K];
}

export const revisionsQueryKey = (key: SectionKey) => ["admin-revisions", key] as const;

export function useRevisions(key: SectionKey) {
  return useQuery({
    queryKey: revisionsQueryKey(key),
    queryFn: () => adminFetch<{ key: SectionKey; revisions: RevisionSummary[] }>(`/api/admin/revisions?key=${key}&limit=50`),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: (count, error) => !isUnauthorized(error) && count < 1,
  });
}

export function useRevision<K extends SectionKey>(key: K, id: number | null) {
  return useQuery({
    queryKey: ["admin-revision", key, id] as const,
    queryFn: () => adminFetch<{ revision: RevisionDetail<K> }>(`/api/admin/revisions?key=${key}&id=${id}`),
    enabled: id !== null,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: (count, error) => !isUnauthorized(error) && count < 1,
  });
}

export function useRestore(key: SectionKey) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: number; ifUpdatedAt: string | null }) =>
      adminFetch<{ key: SectionKey; restoredFrom: number; updatedAt: string }>("/api/admin/restore", {
        method: "POST",
        body: { key, id: input.id, ifUpdatedAt: input.ifUpdatedAt },
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: sectionQueryKey(key) });
      client.invalidateQueries({ queryKey: revisionsQueryKey(key) });
      client.invalidateQueries({ queryKey: ["site-content"] });
      requestPublish();
    },
  });
}

export interface BookingRow {
  id: number;
  name: string;
  phone: string;
  checkIn: string | null;
  checkOut: string | null;
  interest: string;
  unit: string | null;
  guests: number | null;
  notes: string | null;
  lang: string;
  createdAt: string;
}

export function useBookings() {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => adminFetch<{ bookings: BookingRow[] }>("/api/admin/bookings?limit=100"),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    retry: (count, error) => !isUnauthorized(error) && count < 1,
  });
}

export type TranslateKind = "title" | "body" | "caption" | "label";

export interface TranslateItem {
  id: string;
  text: string;
  kind: TranslateKind;
  maxChars?: number;
}

export interface TranslateResponse {
  items: { id: string; translations: Partial<Record<Exclude<Lang, "ka">, string>> }[];
  usage: { inputTokens: number; outputTokens: number };
}

export function useTranslate() {
  return useMutation({
    mutationFn: (input: { items: TranslateItem[]; context?: string }) =>
      adminFetch<TranslateResponse>("/api/admin/translate", { method: "POST", body: input }),
  });
}
