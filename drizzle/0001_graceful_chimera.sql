CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`checkIn` varchar(32),
	`checkOut` varchar(32),
	`interest` varchar(32) NOT NULL,
	`guests` int,
	`notes` text,
	`lang` varchar(8) NOT NULL,
	`notified` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
