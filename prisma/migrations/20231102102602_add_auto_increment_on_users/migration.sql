/*
  Warnings:

  - Added the required column `update` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Users] ADD CONSTRAINT [Users_createdAt_df] DEFAULT CURRENT_TIMESTAMP FOR [createdAt];
ALTER TABLE [dbo].[Users] ADD [update] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
