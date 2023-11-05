BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [update] DATETIME2 NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MATA_KULIAH] (
    [ID_MK] VARCHAR(10) NOT NULL,
    [NAME_MK] NVARCHAR(50) NOT NULL,
    [SKS] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MATA_KULIAH_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [MATA_KULIAH_pkey] PRIMARY KEY CLUSTERED ([ID_MK])
);

-- CreateTable
CREATE TABLE [dbo].[AUDIT_MK] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ID_MK] VARCHAR(10),
    [SKS_NEW] INT,
    [SKS_OLD] INT,
    [NAME_NEW] NVARCHAR(50),
    [NAME_OLD] NVARCHAR(50),
    [DATE] DATETIME,
    [USER] NVARCHAR(50),
    CONSTRAINT [PK__AUDIT_MK__3214EC27E0AA82A9] PRIMARY KEY CLUSTERED ([ID])
);

-- AddForeignKey
ALTER TABLE [dbo].[AUDIT_MK] ADD CONSTRAINT [FK__AUDIT_MK__USER__4CA06362] FOREIGN KEY ([ID_MK]) REFERENCES [dbo].[MATA_KULIAH]([ID_MK]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
