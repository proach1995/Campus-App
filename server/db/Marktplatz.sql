/*
Die Datenbank lautet Marktplatz
Fürs erste 3 Einträge die wichtig sind
    -Login
    -Post
    -User
*/

/* Vorher Extension installieren: create extension if not exists "uuid-ossp"; */

/* UUID generiert verschlüsselte einzigartige IDs, die für das gesamte Ökosystem 
einzigartig sind und nicht nur für die Datenbank. Außerdem wird die ID so vor Klartextattacken
geschützt, da sie unter Umständen teil der URL ist */
CREATE TABLE users(
    userId uuid DEFAULT uuid_generate_v4(),
    userName varchar(255) NOT NULL,
    userEmail varchar(255) NOT NULL unique,
    userPassword varchar(255) NOT NULL,
    userPrename varchar(20) not null,
    userLastname varchar(20) not null,
    userBirthdate date  not null,
    userImage varchar(100) ,
    userDescription varchar(500),
    primary key (userId)
);

CREATE TABLE posts(
    postId bigint generated always as identity,
    userId uuid,
    postTitle varchar(200) not null,
    postDate date default CURRENT_DATE,
    postCategory varchar(100) not null,
    postType varchar(100) not null,
    postPrice int,
    postPriceType varchar(100),
    postDescription varchar(500),
    PRIMARY KEY (postId), 
    FOREIGN KEY (userId) references users(userId)

);


CREATE TABLE images(
    imageId bigint generated always as identity,
    postId bigint,
    imagePath varchar(100) not null,
    primary key (imageId),
    FOREIGN KEY (postId) references posts(postId) 
);

INSERT INTO users(userName, userEmail,userPassword, userPrename, userLastname, userBirthdate, userImage, userDescription) values(
    'uludag', 'depy0002@stud.hs-kl.de','Passwort1234','Dennis', 'pyka', TO_DATE('18/09/1995', 'DD.MM.YYYY'),'./pb.jpg','Test' 
);

INSERT INTO posts( userId, postTitle, postCategory, postType, postPriceType, postPrice, postDescription) values(
     '535ec009-2e3b-4fe0-94b9-3b979753ab6f', 'Freunde gesucht', 'Events', 'Verkauf', 'Angebot', 200, 'Einsam und allein'
);

INSERT INTO posts(userId, postTitle, postCategory, postTradeType, postCriterion, postPrice, postDescription values(
    1, 'Toster', 'Marktplatz', 'Verkauf', 'Angebot', 200, 'Toster zum testen'
);

INSERT INTO images(postId, imagePath) values(
    10, 'Images/postImages/toster.jpg'
);

UPDATE users SET userName = '111111', userEmail = 'depy0100@stud.hs-kl.de', userPrename = '1313', userLastname = '13213', userbirthdate = '1995-10-13', userImage = './UserImage', userDescription = 'geiler typ', userpassword = 'hi' where userId = '29610f76-1f1e-4524-a2b4-b5892994f67c';
{
    "username": "uuuuuuuuuuuuuu",
    "useremail": "depy9999@stud.hs-kl.de",
    "userprename": "Dennis11",
    "userlastname": "pyk11a",
    "userbirthdate": "1995-09-17T22:00:00.000Z",
    "userpassword": "1111",
    "userimage": "./pb.jpg",
    "userdescription": "Test131313131"

}

/*Falls ein Fehler auftritt, kann damit gelösch werden*/
drop table images;
drop table posts;
drop table users;



