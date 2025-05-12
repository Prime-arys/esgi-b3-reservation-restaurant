CREATE TABLE users(
   user_id INT AUTO_INCREMENT NOT NULL,
   email VARCHAR(50) NOT NULL,
   password_hash VARCHAR(128),
   fname VARCHAR(50),
   lname VARCHAR(50),
   phone VARCHAR(50),
   role ENUM('ADMIN', 'CLIENT'),
   PRIMARY KEY(user_id),
   UNIQUE(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE reservations(
   user_id INT,
   reservation_id INT AUTO_INCREMENT,
   number_of_people INT,
   date_ DATE,
   time_ TIME,
   status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL,
   PRIMARY KEY(reservation_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tables(
   tables_id SMALLINT AUTO_INCREMENT,
   seats SMALLINT,
   PRIMARY KEY(tables_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE reservation_tables(
   tables_id SMALLINT,
   user_id INT,
   reservation_id INT,
   PRIMARY KEY(tables_id, user_id, reservation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE menu_items(
   items_id SMALLINT AUTO_INCREMENT,
   name VARCHAR(50),
   description VARCHAR(130),
   price DECIMAL(8,2),
   category ENUM('APPETIZER', 'MAIN', 'DESSERT', 'BEVERAGE', 'SPECIAL'),
   PRIMARY KEY(items_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE opening_slots(
   slot_id INT AUTO_INCREMENT,
   date_time DATETIME,
   duration TIME,
   available BOOLEAN,
   comment VARCHAR(80),
   PRIMARY KEY(slot_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Add foreign key constraints using ALTER TABLE
ALTER TABLE reservations
   ADD CONSTRAINT fk_reservations_users FOREIGN KEY(user_id) REFERENCES users(user_id);

ALTER TABLE reservation_tables
   ADD CONSTRAINT fk_reservation_tables_tables FOREIGN KEY(tables_id) REFERENCES tables(tables_id),
   ADD CONSTRAINT fk_reservation_tables_reservations FOREIGN KEY(user_id, reservation_id) REFERENCES reservations(user_id, reservation_id);