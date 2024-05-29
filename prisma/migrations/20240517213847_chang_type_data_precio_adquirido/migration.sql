/*
  Warnings:

  - You are about to drop the column `nombreProvedor` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `nombreProveedor` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `precioAdquirido` on the `Producto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "nombreProvedor",
ADD COLUMN     "nombreProveedor" TEXT NOT NULL,
DROP COLUMN "precioAdquirido",
ADD COLUMN     "precioAdquirido" DOUBLE PRECISION NOT NULL;
