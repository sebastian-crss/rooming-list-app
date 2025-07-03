-- CreateEnum
CREATE TYPE "RoomingListStatus" AS ENUM ('Active', 'Closed', 'Cancelled');

-- CreateEnum
CREATE TYPE "AgreementType" AS ENUM ('leisure', 'staff', 'artist');

-- CreateTable
CREATE TABLE "RoomingList" (
    "roomingListId" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "rfpName" TEXT NOT NULL,
    "cutOffDate" TIMESTAMP(3) NOT NULL,
    "status" "RoomingListStatus" NOT NULL,
    "agreement_type" "AgreementType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomingList_pkey" PRIMARY KEY ("roomingListId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "bookingId" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestPhoneNumber" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "RoomingListBooking" (
    "roomingListId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "RoomingListBooking_pkey" PRIMARY KEY ("roomingListId","bookingId")
);

-- AddForeignKey
ALTER TABLE "RoomingListBooking" ADD CONSTRAINT "RoomingListBooking_roomingListId_fkey" FOREIGN KEY ("roomingListId") REFERENCES "RoomingList"("roomingListId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomingListBooking" ADD CONSTRAINT "RoomingListBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("bookingId") ON DELETE RESTRICT ON UPDATE CASCADE;
