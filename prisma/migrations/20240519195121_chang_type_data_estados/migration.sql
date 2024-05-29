/*
  Warnings:

  - Added the required column `estado` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "estado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "estado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "estado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "estado" TEXT NOT NULL;
