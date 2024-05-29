/*
  Warnings:

  - Made the column `fechaVenta` on table `Venta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Venta" ALTER COLUMN "fechaVenta" SET NOT NULL,
ALTER COLUMN "fechaVenta" SET DATA TYPE TIMESTAMP(3);
