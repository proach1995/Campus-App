CREATE TABLE user (
    userId BIGSERIAL NOT NULL PRIMARY KEY,
    userName VARCHAR(20) UNIQUE NOT NULL,
    mailId VARCHAR(320) UNIQUE NOT NULL,
    birthday DATE,


);

CREATE TABLE user_post (
    userId REFERENCES user(userId) PRIMARY KEY,
    postId REFERENCES posts(postId)PRIMARY KEY,
    postDate,
)


CREATE TABLE loginData (
    registerId BIGSERIAL PRIMARY KEY NOT NULL,
    userId FOREIGN KEY REFERENCES user(userId),

)





CREATE TABLE posts
postId BIGSERIAL PRIMARY KEY,
userId REFERENCES user(userId),
title
postDescription
postDate
price
priceType --> Fest, VHB , geschenkt, verleih
imagesrc
postType --> Angebot & Gesuch



CREATE TABLE categories
catId
catName

<-- Testtabelle -->

CREATE TABLE dataTable (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    imagesrc VARCHAR(200),
    url VARCHAR(100)
);

INSERT INTO dataTable (

    title, imagesrc, url) values("meme1", "./490.jpg", "/meineposts" );

    INSERT INTO dataTable VALUES
    ('UA502', './490.jpg', '/meineposts');

    INSERT INTO dataTable (title, imagesrc, url)
    VALUES ('T_601', './490.jpg', '/meineposts');