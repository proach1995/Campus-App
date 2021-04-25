/*
Die Datenbank lautet Marktplatz
Fürs erste 3 Einträge die wichtig sind
    -Login
    -Post
    -User
*/

CREATE TABLE nutzer(
    userId bigint primary key generated always as identity,
    userVorname varchar(20) not null,
    userNachname varchar(20) not null,
    geburtsDatum date  not null,
    userImage varchar(100) not null,
    userBeschreibung varchar(500) not null
);

CREATE TABLE post(
    postId bigint primary key generated always as identity,
    userId bigint references nutzer(userId),
    titel varchar(50) not null,
    postImage varchar(100) not null,
    postDatum date default CURRENT_DATE,
    kategorie varchar(100) not null,
    handelTyp varchar(20) not null,
    preis int not null
);

CREATE TABLE registrie(
    eMailId bigint primary key generated always as identity,
    eMail varchar(100) not null unique,
    userPassword varchar(20) not null
);

INSERT INTO nutzer(userVorname,userNachname, geburtsDatum, userImage, userBeschreibung) values(
    'Dennis','Semke',TO_DATE('18/09/1995', 'DD.MM.YYYY'),'...','Test' 
);

INSERT INTO post(userId, titel, postImage, kategorie, handelTyp, preis) values(
    1, 'Testmäher', '490.png', 'gartengeräte', 'Verkauf', 200
);

INSERT INTO post(userId, titel, postImage, kategorie, handelTyp, preis) values(
    2, 'Testmäher', '490.png', 'gartengeräte', 'Verkauf', 200
);