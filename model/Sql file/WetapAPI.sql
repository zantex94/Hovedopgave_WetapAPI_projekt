DROP DATABASE IF EXISTS dbWetap;
CREATE DATABASE dbWetap;
USE dbWetap;
set global net_buffer_length=1000000; 
set global max_allowed_packet=1000000000;

CREATE TABLE brugere(
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
email VARCHAR(100) UNIQUE NOT NULL,
navn VARCHAR(100) NOT NULL,
adresse VARCHAR(200) NOT NULL,
postnummer INT(4) NOT NULL,
_by VARCHAR(100) NOT NULL,
telefonnummer INT(20) NOT NULL,
status_bruger VARCHAR(25) NOT NULL,
password VARCHAR(100) NOT NULL,
rolle VARCHAR(100),
PRIMARY KEY (id)
);
CREATE TABLE billedet(
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
billede MEDIUMBLOB NOT NULL,
email VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(email) references brugere(email) on delete cascade on update cascade
);

CREATE TABLE brugere_erhverv(
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
cvr INT NOT NULL,
email VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(email) references brugere(email) on delete cascade on update cascade
);


INSERT INTO `brugere` (`email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `status_bruger`, `password`, `rolle`) VALUES
('test@gmail.com', 'René Seebach', 'Lærkevej 3', 6200, 'kliplev', 20913871, 'aktiv', '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAKiC', "admin");

INSERT INTO `brugere` (`email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `status_bruger`, `password`, `rolle`) VALUES
('jensfaarup@gmail.com', 'Jens Bøgner', 'Lærkevej 3', 6200, 'Tinglev', 22938732, 'aktiv', '$2b$10$aQ/QyTP7n1l5MOiXD5wYq.kjDZ5AhkS5ZnQ6y1pr.xYp0CmyKuzK2', "kundeadmin");

INSERT INTO `brugere_erhverv` (`cvr`, `email`) VALUES
('37984515', 'jensfaarup@gmail.com');

INSERT INTO `brugere` (`email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `status_bruger`, `password`, `rolle`) VALUES
('larsfaarup@gmail.com', 'Lars Jensen', 'Lærkevej 3', 6200, 'Vojens', 54342312, 'deaktiveret', '$2b$10$WWG2UAFFn3XbdObGPvwCUuSD2Ev/qbqvLS.UlYQPNn30KZB4yiduq', "kunde");

INSERT INTO `brugere_erhverv` (`cvr`, `email`) VALUES
('37984515', 'larsfaarup@gmail.com');

INSERT INTO `brugere` (`email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `status_bruger`, `password`, `rolle`) VALUES
('bentdjursland@gmail.com', 'Bent Bøgner', 'Lærkevej 3', 6200, 'Tinglev', 22938732, 'deaktiveret', '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAK43', "kunde");

INSERT INTO `brugere_erhverv` (`cvr`, `email`) VALUES
('39528045', 'bentdjursland@gmail.com');

CREATE TABLE firma(
cvr BIGINT UNSIGNED NOT NULL,
title VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL,
teknikker INT(50) NOT NULL,
PRIMARY KEY (cvr),
foreign key(email) references brugere(email) on delete cascade
);
INSERT INTO `firma` (`cvr`, `title`, `email`, `teknikker`) VALUES
('39528045', "faarup sommerland", 'jensfaarup@gmail.com', '37984515');


CREATE TABLE produktkategori(
kategori VARCHAR(200) NOT NULL,
title VARCHAR(200) NOT NULL,
PRIMARY KEY (kategori)
);
INSERT INTO `produktkategori` (`kategori`, `title`) VALUES
('Udendørs vandpost', 'Vandposter til udendørs brug');
INSERT INTO `produktkategori` (`kategori`, `title`) VALUES
('Flasker', 'Drikkedunke med mulighed for refill');

CREATE TABLE produkt(
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
title VARCHAR(300) UNIQUE NOT NULL,
beskrivelse VARCHAR(800) NOT NULL,
billedet MEDIUMBLOB NOT NULL,
contenttype VARCHAR(32) NOT NULL,
vægt VARCHAR(200) NOT NULL,
kategori VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(kategori) references produktkategori(kategori) on delete cascade on update cascade
);

CREATE TABLE firmaprodukt(
produktnummer BIGINT UNSIGNED NOT NULL,
service_tjek DATE NOT NULL,
oprettet DATE NOT NULL,
billedet MEDIUMBLOB NOT NULL,
contenttype VARCHAR(32) NOT NULL,
cvr BIGINT UNSIGNED NOT NULL,
title VARCHAR(300) NOT NULL,
PRIMARY KEY (produktnummer),
foreign key(cvr) references firma(cvr) on delete cascade on update cascade,
foreign key(title) references produkt(title) on delete cascade on update cascade
);
/** flaske **/
CREATE TABLE farve(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE volume(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE højde(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE diameter(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE kvalitetsmærke(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);
/** vandpost **/

CREATE TABLE berøringsfri_betjening(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE automatisk_rens(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE betalingsløsning(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE produkt_filter(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE frostsikker(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE lækagesystem(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE plc_styring(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE kabinetmateriale(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE køletemperatur(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);
CREATE TABLE vandtrykskrav(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE strømforsyning(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE dimensioner(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE lys(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);

CREATE TABLE kølekapacitet(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);
CREATE TABLE vandtype(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(200) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id) on delete cascade on update cascade
);


