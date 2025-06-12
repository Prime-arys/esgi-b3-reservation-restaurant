-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 12 juin 2025 à 16:56
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `esgi-b3-reservation-restaurant`
--

-- --------------------------------------------------------

--
-- Structure de la table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE IF NOT EXISTS `menu_items` (
  `items_id` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(130) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `category` enum('APPETIZER','MAIN','DESSERT','BEVERAGE','SPECIAL') DEFAULT NULL,
  PRIMARY KEY (`items_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `menu_items`
--

INSERT INTO `menu_items` (`items_id`, `name`, `description`, `price`, `category`) VALUES
(1, 'salade', 'salade avec des olives', '10.00', 'APPETIZER'),
(2, 'steak', 'servi avec des frites', '50.00', 'MAIN'),
(3, 'tiramisu', 'café ou chocolat', '5.00', 'DESSERT'),
(4, 'virgin mojito', 'cocktail sans alcool à la menthe', '2.00', 'BEVERAGE'),
(5, 'plateau partage', 'plateau de brunch avec un ensemble d entrée, plat, dessert et boisson', '100.00', 'SPECIAL');

-- --------------------------------------------------------

--
-- Structure de la table `opening_slots`
--

DROP TABLE IF EXISTS `opening_slots`;
CREATE TABLE IF NOT EXISTS `opening_slots` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  `comment` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `opening_slots`
--

INSERT INTO `opening_slots` (`slot_id`, `date_time`, `duration`, `available`, `comment`) VALUES
(1, '2025-06-15 18:55:38', '20:00:00', 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `user_id` int NOT NULL,
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `number_of_people` int DEFAULT NULL,
  `date_` date DEFAULT NULL,
  `time_` time DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL,
  PRIMARY KEY (`reservation_id`,`user_id`),
  KEY `fk_reservations_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`user_id`, `reservation_id`, `number_of_people`, `date_`, `time_`, `status`) VALUES
(8, 4, 2, '2025-06-03', '16:00:00', 'PENDING');

-- --------------------------------------------------------

--
-- Structure de la table `reservation_tables`
--

DROP TABLE IF EXISTS `reservation_tables`;
CREATE TABLE IF NOT EXISTS `reservation_tables` (
  `tables_id` smallint NOT NULL,
  `user_id` int NOT NULL,
  `reservation_id` int NOT NULL,
  PRIMARY KEY (`tables_id`,`user_id`,`reservation_id`),
  KEY `fk_reservation_tables_reservations` (`user_id`,`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

DROP TABLE IF EXISTS `tables`;
CREATE TABLE IF NOT EXISTS `tables` (
  `tables_id` smallint NOT NULL AUTO_INCREMENT,
  `seats` smallint DEFAULT NULL,
  PRIMARY KEY (`tables_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tables`
--

INSERT INTO `tables` (`tables_id`, `seats`) VALUES
(1, 2),
(2, 4),
(3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password_hash` varchar(128) DEFAULT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `role` enum('ADMIN','CLIENT') DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password_hash`, `fname`, `lname`, `phone`, `role`) VALUES
(5, '0@0.com', '$2b$10$K5XT/7vUFjYjrX1KEzKrx.SHMz0jCDAE8JOVfF6soSxoxl/MTSqJy', '0', '0', '33 6 10 10 10 10', 'ADMIN'),
(8, '1@0.com', '$2b$10$gUY860Pvu63KyYqDOzXGOOPXMbRpNoo97fvb8tE6yCShJ/VtyBLvO', '1', '1', '33 6 10 10 10 10', 'CLIENT'),
(9, '2@0.com', '$2b$10$4.MQmOJxQf2N.IDRu2YBYellPRrkGKTaLWixGDJzHwOff3I9mKseK', '2', '2', '22 22 22 22', 'CLIENT');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_reservations_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `reservation_tables`
--
ALTER TABLE `reservation_tables`
  ADD CONSTRAINT `fk_reservation_tables_reservations` FOREIGN KEY (`user_id`,`reservation_id`) REFERENCES `reservations` (`user_id`, `reservation_id`),
  ADD CONSTRAINT `fk_reservation_tables_tables` FOREIGN KEY (`tables_id`) REFERENCES `tables` (`tables_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
