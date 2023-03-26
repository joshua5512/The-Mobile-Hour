-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: mobile-hour
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `changelog_id` int NOT NULL AUTO_INCREMENT,
  `changelog_change_date` datetime NOT NULL,
  `changelog_change_description` varchar(100) NOT NULL,
  `changelog_user_id` int NOT NULL,
  PRIMARY KEY (`changelog_id`),
  KEY `fk_user_changelogs_idx` (`changelog_user_id`),
  CONSTRAINT `fk_user_changelogs` FOREIGN KEY (`changelog_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'2022-10-17 12:23:40','stock changed',1),(2,'2022-10-25 13:33:08','change',1),(3,'2022-10-25 13:47:22','Staff member with username user21 updated',5),(4,'2022-10-25 13:49:43','Staff member with username user21p updated',5),(5,'2022-10-25 15:12:22','Staff member with username 3 created',5),(6,'2022-10-25 15:28:17','Staff member with username 22 created',5),(7,'2022-10-29 11:42:18','Staff member with username undefined updated',5),(8,'2022-10-29 11:44:38','Product with username iphone14 updated',5),(9,'2022-10-29 11:45:49','Product of iphone14 updated',5),(10,'2022-10-30 15:28:31','Product of iphone14 updated',5);
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `feature_id` int NOT NULL AUTO_INCREMENT,
  `feature_weight_grams` int NOT NULL,
  `feature_height_mm` int NOT NULL,
  `feature_width_mm` int NOT NULL,
  `feature_depth_mm` int NOT NULL,
  `feature_operating_system` varchar(60) NOT NULL,
  `feature_screen_size` varchar(45) NOT NULL,
  `feature_screen_resolution` varchar(45) NOT NULL,
  `feature_cpu` varchar(80) NOT NULL,
  `feature_ram` varchar(45) NOT NULL,
  `feature_storage` varchar(45) NOT NULL,
  `feature_battery` varchar(45) NOT NULL,
  `feature_rear_camera` varchar(45) NOT NULL,
  `feature_front_camera` varchar(45) NOT NULL,
  PRIMARY KEY (`feature_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,206,147,71,8,'IOS 16','6.1','2556 * 1179','A 16 ','6 GB','256G','4300mah','1200M','1200M'),(2,136,146,71,8,'IOS 16','6.6','2556 * 1179','A 15','6 GB','256G','4300mah','1200M','1200M'),(3,136,146,71,8,'IOS 16','6.1','2556 * 1179','A 15','6 GB','256G','4300mah','1200M','1200M'),(4,136,146,71,8,'IOS 16','6.1','2556 * 1179','A 15','6 GB','256G','4300mah','1200M','1200M'),(5,220,146,71,8,'Android','6.8','2556 * 1179','Octa-core','8 GB','512G','4370mAh','1600M','1600M'),(6,220,146,71,8,'Android','6.8','2556 * 1179','Octa-core','8 GB','512G','4370mAh','1600M','1600M'),(7,220,146,71,8,'Android','6.8','2556 * 1179','Octa-core','8 GB','512G','4370mAh','1600M','1600M'),(8,220,146,71,8,'Android','6.8','2556 * 1179','Octa-core','8 GB','512G','4370mAh','1600M','1600M');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_product_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  `order_status` varchar(45) NOT NULL,
  `order_customer_first_name` varchar(45) NOT NULL,
  `order_customer_last_name` varchar(45) NOT NULL,
  `order_customer_address` varchar(100) NOT NULL,
  `order_customer_email` varchar(45) NOT NULL,
  `order_customer_phone` varchar(45) NOT NULL,
  `order_quantity` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_product_orders_idx` (`order_product_id`),
  CONSTRAINT `fk_product_orders` FOREIGN KEY (`order_product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,3,'2022-10-20 12:52:23','complete','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(3,3,'2022-10-20 12:54:41','complete','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(4,3,'2022-10-20 12:56:41','complete','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(8,3,'2022-10-27 13:21:42','pending','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(9,4,'2022-10-27 19:02:44','pending','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(10,4,'2022-10-27 19:05:57','complete','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(11,4,'2022-10-27 19:17:28','pending','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1),(12,2,'2022-10-29 11:48:52','pending','dsfdf','drrt','1 br st, southbank','efss@gmail.com','0432234567',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(80) NOT NULL,
  `product_model` varchar(45) NOT NULL,
  `product_manufacturer` varchar(45) NOT NULL,
  `product_price` varchar(40) NOT NULL,
  `product_stock` int NOT NULL,
  `product_feature_id` int DEFAULT NULL,
  `product_path` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'iphone14','256G','Apple','$1749',10,NULL,'img/iphone14_pro.jpeg'),(2,'iphone14','512G','Apple','$1899',100,NULL,'img/iphone14_pro.jpeg'),(3,'iPhone 13 Pro Max','256G','Apple','$1899',100,3,'img/iphone13_pro_max.jpeg'),(4,'iphone 13 Pro','256G','Apple','$1799',100,4,'img/iphone13_pro.jpeg'),(5,'Samsung Galaxy Z Fold4 5G','512G','Samsung','$2499',100,NULL,'img/galaxy_z_fold.png'),(6,'Samsung Galaxy Z Flip4 5G','256G','Samsung','$1649',100,6,'img/samsung_z_flip.png'),(7,'Samsung Galaxy S22 5G','128G','Samsung','$1049',100,7,'img/galaxy_s22.png'),(15,'Samsung Galaxy S22 5G','512G','Samsung','$1899',10,8,'img/galaxy_s22.png'),(16,'iphone14','1024G','apple','$1999',10,NULL,'img/iphone14.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(50) NOT NULL,
  `user_last_name` varchar(60) NOT NULL,
  `user_role` varchar(45) NOT NULL,
  `user_username` varchar(45) NOT NULL,
  `user_password` varchar(80) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hua','Wei','manager','huawei','password'),(3,'test','ts','stock','user','$2a$10$elmMaYfu2FB35766QhsSZeqp97Tv09MO2HX5t50T7IzP7NGGMgbMe'),(4,'user2','wei','sales','user21p','$2a$10$lKsQ6ih563gLYFjiLd1mRO9L7VXGbNroxne0fz3yMteCjqU/4aPKG'),(5,'lily','wei','manager','lilywei','$2a$10$F30rGZdbx1ET.qLW.Ohhx.Uw9VwjmlTNt4uz7ww0esdvqy1FeRWiW'),(6,'1','1','manager','3','$2a$10$5zM3i/sM/k5eAuAHldEBHeLuAE.wQSmA7IWyBVdAV60s5SOYSf9iS'),(7,'11','11','stock','22','$2a$10$bV1/gNvCUdlDqAW6XXkA9OE2A0J0B1yd9JqnXyYpLnUXCsNhNAc.W');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-01  8:15:08
