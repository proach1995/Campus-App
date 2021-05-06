/*
Die Datenbank lautet Marktplatz
Fürs erste 3 Einträge die wichtig sind
    -Login
    -Post
    -User
*/


CREATE TABLE users(
    userId bigint primary key generated always as identity,
    userVorname varchar(20) not null,
    userNachname varchar(20) not null,
    geburtsDatum date  not null,
    userImage varchar(100) not null,
    userDescription varchar(500) not null
);

CREATE TABLE posts(
    postId bigint primary key generated always as identity,
    userId bigint references users(userId),
    postTitle varchar(50) not null,
    postDatum date default CURRENT_DATE,
    postCategory varchar(100) not null,
    postTradetype varchar(20) not null,
    postCriterion varchar(20) not null,
    postPrice int,
    postDescription varchar(500)
);

CREATE TABLE registry(
    eMailId bigint primary key generated always as identity,
    userId bigint references users(userId),
    eMail varchar(100) not null unique,
    userPassword varchar(20) not null
);

CREATE TABLE images(
    imageId bigint primary key generated always as identity,
    postId bigint references posts(postId),
    imagePath varchar(100) not null
);

INSERT INTO users(userVorname,userNachname, geburtsDatum, userImage, userDescription) values(
    'Dennis','Semke',TO_DATE('18/09/1995', 'DD.MM.YYYY'),'...','Test' 
);

INSERT INTO posts(userId, postTitle, postCategory, postTradeType, postCriterion, postPrice, postDescription) values(
    1, 'Freunde gesucht', 'Events', 'Verkauf', 'Angebot', 200, 'Einsam und allein'
);

INSERT INTO posts(userId, postTitle, postCategory, postTradeType, postCriterion, postPrice, postDescription values(
    1, 'Toster', 'Marktplatz', 'Verkauf', 'Angebot', 200, 'Toster zum testen'
);

INSERT INTO images(postId, imagePath) values(
    1, 'Images/postImages/toster.jpg'
);

/*Falls ein Fehler auftritt, kann damit gelösch werden*/
drop table images;
drop table posts;
drop table registry;
drop table users;