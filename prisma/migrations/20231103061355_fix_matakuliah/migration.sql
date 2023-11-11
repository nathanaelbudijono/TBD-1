/*
  Warnings:

  - You are about to drop the column `mataKuliah` on the `mataKuliah` table. All the data in the column will be lost.
  - Added the required column `matakuliah` to the `mataKuliah` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[mataKuliah] DROP COLUMN [mataKuliah];
ALTER TABLE [dbo].[mataKuliah] ADD [matakuliah] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
