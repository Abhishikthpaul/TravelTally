sqlite3 project.db "VACUUM;"

CREATE TABLE lists 
(
    id INTEGER PRIMARY KEY NOT NULL,
    user_id INTEGER,
    list_id INTEGER,
    item TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY("user_id") REFERENCES users("id")
);


CREATE TABLE aliases
(
    id INTEGER PRIMARY KEY NOT NULL,
    user_id INTEGER,
    list_id INTEGER,
    list_name TEXT NOT NULL UNIQUE,
    FOREIGN KEY("user_id") REFERENCES users("id"),
    FOREIGN KEY(list_id) REFERENCES lists(list_id)
);


CREATE TABLE users 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
    username TEXT NOT NULL, 
    "hash" TEXT NOT NULL
);

CREATE UNIQUE INDEX username ON users(username);


-- SQL for SELECT in /show-list
SELECT list_id FROM aliases WHERE list_name = lst_name

SELECT item FROM lists WHERE list_id = lst_id