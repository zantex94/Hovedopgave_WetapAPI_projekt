DROP DATABASE IF EXISTS dbWetap;
CREATE DATABASE dbWetap;
USE dbWetap;

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
rolle VARCHAR(10),
PRIMARY KEY (id)
);
CREATE TABLE billedet(
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
billede MEDIUMBLOB NOT NULL,
email VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(email) references brugere(email)
);

CREATE TABLE brugere_erhverv(
id BIGINT UNSIGNED NOT NULL,
cvr INT NOT NULL,
email VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(email) references brugere(email)
);


INSERT INTO `brugere` (`email`, `navn`, `adresse`, `postnummer`, `_by`, `telefonnummer`, `status_bruger`, `password`, `rolle`) VALUES
('test@gmail.com', 'René Seebach', 'Lærkevej 3', 6200, 'kliplev', 20913871, 'aktiv', '$2b$10$xrHb1jXOEwFMfXbbSUX8U.c1G6bPWUjMxpLayoXv2t76PFRGCAKiC', "admin");



CREATE TABLE firma(
cvr BIGINT UNSIGNED NOT NULL,
title VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL,
PRIMARY KEY (cvr),
foreign key(email) references brugere(email)
);

CREATE TABLE produktkategori(
kategori VARCHAR(100) NOT NULL,
title VARCHAR(50) NOT NULL,
PRIMARY KEY (kategori)
);

CREATE TABLE produkt(
id BIGINT UNSIGNED NOT NULL,
title VARCHAR(50) UNIQUE NOT NULL,
beskrivelse VARCHAR(50) NOT NULL,
billedet MEDIUMBLOB NOT NULL,
vægt VARCHAR(50) NOT NULL,
kategori VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(kategori) references produktkategori(kategori)
);

CREATE TABLE firmaprodukt(
produktnummer BIGINT UNSIGNED NOT NULL,
service_tjek DATE NOT NULL,
oprettet DATE NOT NULL,
billedet MEDIUMBLOB NOT NULL,
cvr BIGINT UNSIGNED NOT NULL,
title VARCHAR(50) NOT NULL,
PRIMARY KEY (produktnummer),
foreign key(cvr) references firma(cvr),
foreign key(title) references produkt(title)
);
/** flaske **/
CREATE TABLE farve(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE volume(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE højde(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE diameter(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE kvalitetsmærke(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);
/** vandpost **/

CREATE TABLE berøringsfri_betjening(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE automatisk_rens(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE betalingsløsning(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE produkt_filter(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE frostsikker(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE lækagesystem(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE plc_styring(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE kabinetmateriale(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE køletemperatur(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE vandtrykskrav(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE strømforsyning(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE dimensioner(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE lys(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);

CREATE TABLE kølekapacitet(
id BIGINT UNSIGNED NOT NULL,
beskrivelse VARCHAR(100) NOT NULL,
PRIMARY KEY (id),
foreign key(id) references produkt(id)
);


