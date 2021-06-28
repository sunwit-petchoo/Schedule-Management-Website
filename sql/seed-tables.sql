-- initial users

INSERT INTO users (first_name, sur_name, email, password) 
VALUES ('Bob', 'Smith', 'bobsmith@gmail.com','$2b$10$rv1wcidGO/IAPuIc0SPYeeD.SvxNXdiRHpbQvYa5K4z10aAbc/Nwq'),
       ('Sally', 'Davis', 'sallydavis@gmail.com','$2b$10$rv1wcidGO/IAPuIc0SPYeeD.SvxNXdiRHpbQvYa5K4z10aAbc/Nwq'),
       ('Jim', 'Holden', 'jimholden@gmail.com','$2b$10$rv1wcidGO/IAPuIc0SPYeeD.SvxNXdiRHpbQvYa5K4z10aAbc/Nwq'),
       ('Tom', 'Mcdonald', 'tommcdonald@gmail.com','$2b$10$rv1wcidGO/IAPuIc0SPYeeD.SvxNXdiRHpbQvYa5K4z10aAbc/Nwq'),
       ('Ben', 'Why', 'benwhy@gmail.com','$2b$10$rv1wcidGO/IAPuIc0SPYeeD.SvxNXdiRHpbQvYa5K4z10aAbc/Nwq');


-- initial schedules

INSERT INTO schedules (user_id, day, start_at, end_at) 
VALUES (1, 1, '08:00:00','18:00:00'),
       (2, 2, '08:00:00','18:00:00'),
       (3, 2, '08:00:00','18:00:00'),
       (4, 1, '08:00:00','18:00:00'),
       (5, 3, '08:00:00','18:00:00');





