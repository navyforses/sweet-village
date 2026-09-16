import { useId, useRef, useState } from "react";
import { ImagePlus, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { assetUrl } from "@/lib/assetUrl";
import { uploadImage, UploadError, type UploadPhase } from "../lib/uploadImage";
import { S } from "../strings";

function uploadErrorMessage(error: unknown): string {
  if (error instanceof UploadError) {
    if (error.code === "not_image") return S.upload.notImage;
    if (error.code === "too_large") return S.upload.tooLarge;
    if (error.code === "blob_missing") return S.upload.blobMissing;
    if (error.code === "unauthorized") return S.session.expired;
  }
  return S.upload.failed;
}

interface Progress {
  phase: UploadPhase;
  percentage: number;
  index: number;
  total: number;
}

function progressLabel(progress: Progress) {
  const prefix = progress.total > 1 ? `${progress.index + 1}/${progress.total} · ` : "";
  return prefix + (progress.phase === "preparing" ? S.upload.preparing : S.upload.uploading(progress.percentage));
}

/** Runs the compress-and-upload pipeline for one or more files, reporting progress. */
export function useImageUpload() {
  const [progress, setProgress] = useState<Progress | null>(null);

  const run = async (files: File[], onUploaded: (url: string) => void) => {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      try {
        const url = await uploadImage(file, (phase, percentage) => setProgress({ phase, percentage, index, total: files.length }));
        onUploaded(url);
      } catch (error) {
        toast.error(uploadErrorMessage(error));
        break;
      }
    }
    setProgress(null);
  };

  return { progress, busy: progress !== null, run };
}

const ASPECTS = { wide: "aspect-[16/10]", square: "aspect-square", portrait: "aspect-[4/5]" } as const;

/** Single-photo field: preview plus a replace button. */
export function ImageUploader({
  value,
  onChange,
  aspect = "wide",
  className = "",
}: {
  value?: string;
  onChange: (url: string) => void;
  aspect?: keyof typeof ASPECTS;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const { progress, busy, run } = useImageUpload();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className={`relative overflow-hidden border border-line bg-pistachio/10 ${ASPECTS[aspect]}`}>
        {value ? <img src={assetUrl(value)} alt="" className="size-full object-cover" /> : null}
        {busy && progress && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/60 text-[0.8125rem] text-white">
            <Loader2 className="me-2 size-4 animate-spin" />
            {progressLabel(progress)}
          </div>
        )}
      </div>
      <input
        ref={input}
        id={id}
        type="file"
        accept="image/*,.heic,.heif"
        className="sr-only"
        onChange={event => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void run([file], onChange);
        }}
      />
      <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => input.current?.click()}>
        {value ? <RefreshCw className="size-4" /> : <ImagePlus className="size-4" />}
        {value ? S.upload.replace : S.upload.choose}
      </Button>
    </div>
  );
}

/** Multi-file button used by gallery editors. */
export function UploadButton({ onUploaded, disabled }: { onUploaded: (url: string) => void; disabled?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const { progress, busy, run } = useImageUpload();

  return (
    <>
      <input
        ref={input}
        id={id}
        type="file"
        accept="image/*,.heic,.heif"
        multiple
        className="sr-only"
        onChange={event => {
          const files = Array.from(event.target.files ?? []);
          event.target.value = "";
          if (files.length) void run(files, onUploaded);
        }}
      />
      <Button type="button" variant="outline" disabled={busy || disabled} onClick={() => input.current?.click()}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
        {busy && progress ? progressLabel(progress) : S.upload.add}
      </Button>
    </>
  );
}
