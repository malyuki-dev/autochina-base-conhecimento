/*
  Warnings:

  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tags` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Resource` table. All the data in the column will be lost.
  - The `id` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fileUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Resource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
DROP COLUMN "tags",
DROP COLUMN "updatedAt",
DROP COLUMN "url",
ADD COLUMN     "fileUrl" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "ResourceType";
