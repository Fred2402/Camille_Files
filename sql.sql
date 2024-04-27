##
# \\Author: Thibault Napoléon "Imothep"
# \\Company: ISEN Yncréa Ouest
# \\Email: thibault.napoleon@isen-ouest.yncrea.fr
# \\Created Date: 22-Jan-2018 - 14:10:27
# \\Last Modified: 23-Jan-2024 - 14:37:32
##

#-------------------------------------------------------------------------------
#--- Change database -----------------------------------------------------------
#-------------------------------------------------------------------------------
USE comweb_project;

#-------------------------------------------------------------------------------
#--- Database cleanup ----------------------------------------------------------
#-------------------------------------------------------------------------------
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS users;

#-------------------------------------------------------------------------------
#--- Database creation ---------------------------------------------------------
#-------------------------------------------------------------------------------
CREATE TABLE users
(
  login VARCHAR(20) NOT NULL,
  password VARCHAR(40) NOT NULL,
  token VARCHAR(20),
  PRIMARY KEY(login)
)
engine = innodb;

CREATE TABLE photos
(
  id INT NOT NULL auto_increment,
  title VARCHAR(20) NOT NULL,
  small VARCHAR(128) NOT NULL,
  large VARCHAR(128) NOT NULL,
  PRIMARY KEY(id)
)
engine = innodb;

CREATE TABLE comments
(
  id INT NOT NULL auto_increment,
  userLogin VARCHAR(20) NOT NULL,
  photoId INT NOT NULL,
  comment VARCHAR(256) NOT NULL,
  PRIMARY KEY(id),
  foreign key(userLogin) REFERENCES users(login),
  foreign key(photoId) REFERENCES photos(id)
)
engine = innodb;

#-------------------------------------------------------------------------------
#--- Populate databases --------------------------------------------------------
#-------------------------------------------------------------------------------
INSERT INTO users(login, password) VALUES('cir2', SHA1('cir2'));
INSERT INTO users(login, password) VALUES('m2', SHA1('m2'));
INSERT INTO photos(title, small, large) VALUES('Rituel du temple', 'img/small/photo1.png', 'img/large/photo1.png');
INSERT INTO photos(title, small, large) VALUES('Batons de prière', 'img/small/photo2.png', 'img/large/photo2.png');
INSERT INTO photos(title, small, large) VALUES('Containers d''été', 'img/small/photo3.png', 'img/large/photo3.png');
INSERT INTO photos(title, small, large) VALUES('Ouverture de porte', 'img/small/photo4.png', 'img/large/photo4.png');
INSERT INTO photos(title, small, large) VALUES('Amarage en liberté', 'img/small/photo5.png', 'img/large/photo5.png');
INSERT INTO photos(title, small, large) VALUES('Volet ouvert', 'img/small/photo6.png', 'img/large/photo6.png');
INSERT INTO photos(title, small, large) VALUES('Repos spirituel', 'img/small/photo7.png', 'img/large/photo7.png');
INSERT INTO photos(title, small, large) VALUES('Trois petits lapins', 'img/small/photo8.png', 'img/large/photo8.png');
INSERT INTO photos(title, small, large) VALUES('Bienvenue chez nous', 'img/small/photo9.png', 'img/large/photo9.png');
INSERT INTO photos(title, small, large) VALUES('Maison vers l''océan', 'img/small/photo10.png', 'img/large/photo10.png');
INSERT INTO photos(title, small, large) VALUES('Fuite en hiver', 'img/small/photo11.png', 'img/large/photo11.png');
INSERT INTO photos(title, small, large) VALUES('Entrée de verdure', 'img/small/photo12.png', 'img/large/photo12.png');

SET autocommit = 0;
SET names utf8;
