create database DBTremps
go

use DBTremps
go

CREATE TABLE tremps (
Id INT IDENTITY(1,1) PRIMARY KEY,
Type BIT NOT NULL, -- 1 offer ride , 0 reqest for tremp
Time DATETIME NOT NULL,
From_Root NVARCHAR(100) NOT NULL,
To_Root NVARCHAR(100) NOT NULL,
);
GO


Set DateFormat DMY
go
INSERT INTO tremps (Type, Time, from_root, to_root)
VALUES  (1, '10-02-2023 09:00:00', '���� ������', '���� ���� �����'),
		(0, '15-03-2023 08:00:00', '���� ������', '���� ���� �����')

GO


INSERT INTO tremps (Type, Time, from_root, to_root)
VALUES  (1, '10-02-2023 09:00:00', '�������', '�� ����'),
		(0, '15-03-2023 08:00:00', '����', '�� ����')

GO