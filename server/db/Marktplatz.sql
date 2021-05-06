/*
Die Datenbank lautet Marktplatz
Fürs erste 3 Einträge die wichtig sind
    -Login
    -Post
    -User
*/
/*
CREATE TABLE nutzer(
    userId bigint primary key generated always as identity,
    userVorname varchar(20) not null,
    userNachname varchar(20) not null,
    geburtsDatum date  not null,
    userImage varchar(100) not null,
    userBeschreibung varchar(500) not null
);
*/
/* Users tabelle ist neu - an registrie und post tabelle hab ich nix gemacht */
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_prename VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_image VARCHAR(100),
  user_description VARCHAR(500),
  PRIMARY KEY(user_id)
);
INSERT INTO users (user_name, user_prename, user_email, user_password) VALUES ('henry','dennis', 'henryly214@gmail.com', 'kthl8822');

CREATE TABLE post(
    postId bigint primary key generated always as identity,
    userId bigint references nutzer(userId), // Nutzer has to be changed
    title varchar(50) not null,
    postDescription varchar(500),
    postImagePath varchar(100) not null,
    postDate date default CURRENT_DATE,
    category varchar(100) not null,
    handelTyp varchar(20) not null,
    price int not null
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
    1, 'Freunde gesucht', './pb.jpg', 'Events', 'Verkauf', 200
);

INSERT INTO post(userId, title, postDescription, postImagePath, category, handelTyp, price) values(
    2, 'Testmäher', 'jkhjkhjkhkjhkjkjhkjhkkj', './490.jpg', 'gartengeräte', 'Verkauf', 200
);