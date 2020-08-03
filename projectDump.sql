CREATE DATABASE  IF NOT EXISTS `elect_voting_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `elect_voting_db`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: elect_voting_db
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `role` varchar(10) NOT NULL,
  `date_registered` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (5,'Emmanuel','Adjei-Sah','adjeisahemmanuel@stu.ucc.edu.gh','$2b$10$l6FBwDFptWwN70puiSPN4egtt3aRYbxhNOO6Tvs0NaoYQMtG1nR0i','admin','2020-5-25 22:11:25'),(29,'Emmanuel ','Adjei','adjeisahemmanuel@gmail.com','$2b$10$MlOiGZjdV1aDixjiThzodOffQxMxataZNQ/xsbBRfwKEPXwv5PVF2','ec','2020-6-17 20:1:30'),(34,'Emmanuel','Adjei-Sah','adjeisahemmanuel@ymail.com','$2b$10$igrNxUN2Adg9s1xcxYYVnOgKgHJTeafAmqdaKE5CMlGXdgysn5ebm','ec','2020-6-23 13:53:39'),(35,'Larry','Godwin','larrygodwin59@gmail.com','$2b$10$iJNm8Y1d24jtBnx90yHPQuGKQG2CGCFKctc5M112s27p8cEAiU8pW','admin','2020-8-3 12:38:19');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `refresh_token` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (3,'adjeisahemmanuel@stu.ucc.edu.gh','tdBxzVQJXIYiCff4cvNnlGhqq8dOwwEFbciFqM9BKZ7HOMtfxrWMaDn3HvT0lKWg3vAKGsmOwZj2p5UMmK1w1t0FqbbNglmKfmBWI5ncTh35JbYWk4GydCBLS3a70neUmkM4ODoHc6lFnajC89d3gl6EJuUwWQ5q3It5ycQOIE7CF9sMwCIzwLLLAcIvD7zBZ5uopIWskNjuIaKuWwsO2R4TwvjZK0bI3oMR6H03pqdIK42MfP3iSlB9kAZBTPGG'),(4,'adjeisahemmanuel@stu.ucc.edu.gh','rSkJA7GsClUBXwnbWGP5BNycxMMOiMLGGOcwX7jxrq9FQMd0UWmuXWzmoLuBjsEhlYSAEJSxCchsoayqmLJzyxperzgk07lRZ7F80IxqkSEZBtQrVCkNm3De0wtpIC7dNFGV5JtJL8IiQw9ijfWhqIkzcBMUuKrrgHcvO4zVpDQvibVruPvWgtalq1t0dMF4DATc2qHI608FxN8qn9sQlsYtevUSJrFL5LRq39KBfR2qpwsW8RnwDq9di25N1M4m'),(5,'adjeisahemmanuel@stu.ucc.edu.gh','iZN0gGwJkH6f4FG4WrcQIo2EWg3UntynCX5cpG5cuvnPgl7rGU9yaSWQ516zv73XhDvcmBwcL08QYzo98k3mBRm9wphAKdR6DcrD7mOjSpo6gV95HeFaRirEXbLlfzOJbTbNSXhb3N0jCgF2PdPaSChkkCd55YcXlRZUH9QpofbwxnLSOVjiy2GJ9ViDJfENYcaAMA3BsGXiF4behWThYnQi5KpHMkUAgMEkg23eI8DDnsUSHSf8IZShy2RYHJvC'),(6,'adjeisahemmanuel@stu.ucc.edu.gh','HoohSLb1YxA3ZjxnBJTqBi8mITd0pY1WW3zuBRnObzebciERZy6Fqq85WnakpCblYuYscnWzaPU3PUs6OXx0qqsoeTPq0oNMv6pueLwWGCxBW08yuRLwBh6I40UR90TuGusOwKUEGAUjhnSHM7T6pOepHnHV22E5zOkiXwMurqNgUDEM9WeFxXQr0NiLa4WZdbDZH3xtWYx5cmxBEt6kei0zgd28ZLSgMJcRLFgJ2srF1O7vR0kB2w2378riOXAG'),(7,'adjeisahemmanuel@stu.ucc.edu.gh','TWS9gnQt9c7wVE4bbtBWzhKLFLq5fIlIYEzAEk0qi08RstwABbmp9x6dnJCQXEAavFf62YBinXD5bWjmf5dLDVTkpQQRg0IAxjMeEeKyT42irYA8kaoJAnRUUZFWKQzN7rFblOLz2UjT2u7uTwyq6cM2FXqZxo4w45dSmmPQQwpsjSqr3Hd6OMPyvWGH7iYzUPYMVG5HiZ1ENW1iyhSKPy77Mx1HIO1Ho5S1YVtTBoIdcxw4A8dfzmpXdtVDK6rH'),(8,'adjeisahemmanuel@stu.ucc.edu.gh','hYJTZq6hXOacliQ8Ofzu8y2h6QrcAJozk8gNgDgI9eitOCCWHnWN69QwJt8QIeWwmARB8DaQxD1yTWFW59pNRWUSjpo4YoBxHqeuzSO3p1JVbeh301LVjQiFhYynakHxFdfltOxQA6HSEGgWkw00WpIz2GzGv64sMMV2BwBgxNIZHKEoFzNZHRXwQi7OQE67tvzHsULXrSlT9cgpAftp0vTBLh4BlEDPKCdy2SXDJfB5x20rg01HeyJwX3Whi9uu'),(9,'adjeisahemmanuel@stu.ucc.edu.gh','YGbBcm4wn1i2HXYI9M3veYQpKDSWaEk6Heu4PlYiiFnCAZQfuuWYw9ZlxesIUKGGKNmkEelazSuB9j7smBxbrJaGASQWY6FkmD3o2JLpHwBGZQC92zb2nkqiBeF5dHvMWtYhWy5WYdByKe9BbViIXnuYbnLc2QCSIfhTLPpsUqh4H7uDGo1Pmhr3J3x82cZBo86Ls1kqZ9AxBBXij6JrTPc3CQG8Pdn30ks8RBa7XLPZG2gnfEol2DKH0I58W0Jr'),(10,'adjeisahemmanuel@stu.ucc.edu.gh','xeWrsZcXyXh9wDn89c9ppSrlwx9nuJeDxnymHECl0XFDuGhEidF5PTHyYTZI5AERCWh99ceb07QpSINFXYbiMr6R1Hxish2wkPLA4aLk5BjDFkg5ZGk4QtyoCR8hJyZI5rr9n1jNLMYHbDeDEtrG29YFrtNviVBEO3xu0hIA0DBLJi9MX4t5xCtIKL0lvIjDM7uhRuj706l59VWMbE9w9syTr86ksOyTDpSLbmOAd4LrKFJoUAUcgyOlmS7Oeum5'),(11,'adjeisahemmanuel@stu.ucc.edu.gh','P3UjQ5MWCcfZVvWDZssnQnpRIU34WTAPSD8vMOe06RjXA8dPqnUJVmpU7wEIKko2gv03EZWK1NW6kbG8yivSs99WnOAlITuGl8KctWp4gpIG22kVgBZLJd8Te7mdJGw4E0DPpuEDNT11F5YR7AR9XzxBpGuXDORPdt5Q2Sk1M8vrBi6ufo9bS0XHvYEHWGEjZ16LczguzByiXM1eu5tjJTHXr62R63M2PY1y8a3R2ksz1oNqGexfqIcBK9uWZAnF'),(12,'adjeisahemmanuel@stu.ucc.edu.gh','Nf6CSsqaz6s93iOd2wqKsMdXpxse30rJjAH1K3YsdV462kQ8yGOJLQzepr70QvaUEIIyte20bJmjpsJin5EXAITy8nC8FtdEEapkFFBE5JWF0wYxBYbTQRPrczmYddZCS1Sdd0brwDmUABtNPRbvRQjfor5xlDj5VLARUBplS9yZSGjZa5fgZes0WzUOLjTAdWa2za7PsM57RPaD69mYcPFsX12Qa8Bh85Ngb3KbPApleYRAjvi6unZ3pQbHZRxk'),(13,'adjeisahemmanuel@stu.ucc.edu.gh','klbXaSMkgS7trVnHyc471M7QxpOr1VFmSARN5boS4ay9ILwzaPlACB1ZSjvoq4DypZrXlHCb9LfHGv2pkOwAgj8ZemeuGGjfDZUHhLJYxxIXKIkZBTcX5gEGoZ9oBfkeFd9DnyyicBqKOfCWvBnCWCxKBAy6ZR5Xf173v8rMqiGsE1X30MjEGAnCqhCaHpBXAvq8Dim3zPzF9exaxXzZiqK53aUYAba1DmDVSg1ODNMuQOjAThhSzgM6swJNFFaD'),(19,'adjeisahemmanuel@stu.ucc.edu.gh','yf3evVrgGpMLk6vruHpAsQ2DBn85XnBrAeQDg8qQOAeXoSvdPRBwrq3b2dgH0z9A530ftd1zck7ALOhusOqT00iQFncnzfFlKi1IzrB2YR8M3XiiWBNiAYC4PaLKWIIMBToCeTgi6gDY7DmDEEYc6pq6jDfIX9WTZ6OBvJ1p99evgXtXbobo9ja8eeahBs6T0UiHsj5qsCZV3RA1Mv4uIgc1YEBMzwgubMlMCvU2dBUoO7TGJLmIolxiehD1kUEG'),(24,'adjeisahemmanuel@stu.ucc.edu.gh','hkQwliUl72i1hfajqV4LlQg1uMHSKvmzVa8uMYJWFRU3H26zTh6u7fMRnWL54YQzoLlyrR5eW1fvSvbARZo7OmiLCckyJm3F4mOWX0y2ehJgsdN81PxztzAKeS8ADl503ezEhI1ujftVnJAk14WLBbUl3ExoXx8eksBX2p2gkOpSGY8zPIRuNelUKl2iLtJZuqswHNq4giLU25v7dvtoTKXGmRcPRWRHs3oW1HYXz9JXYD5Azpm2t4jY3puh3yzu'),(34,'adjeisahemmanuel@stu.ucc.edu.gh','x6tAFyGEDJLJ4ltZQoZNL3sxZzWlFPMEUMzlHtUiEKlo3UfR90wyagDBdSlaW24YRVecxOcpop2ehAwQiHhY35CTN0m3GYvKp7BFR1qCvSfklxD7Vd5FTQTD2gPqLcUMOQrgyYTenCg1Gky4wJtdCdLL4dCsNdZwCovbiJJ8NZHsSPQ0hJNTp5byfJfoMvFxFi9XJ27vO52iVPbtzTAhsv1TKgR4VBkwt84YUuIjOlLrxyCQYugT3HOJkhuVH510'),(35,'adjeisahemmanuel@stu.ucc.edu.gh','r6KBpT3bgbb9y6OsclQjScewjTycEhWmSM0shvwceZwr57RolGaBJa9Ouk9h2jXqene6JRIBdTAOegxpndsqJLgThnzsIcAsrcSg3SFSlW0ljVslDm3hBwY0L57g8AQGbpEbnt7fTDQpP3mXPO3Goq1nzDs6eCNK7f4icey9uqbkfsPEyX2nUuqQqWznL3xCb3UNICLCugrziiB4UsxVIw4abg32SSqH3RBCXQU5Qy1Wc392WWogDLL04mAx6ECe');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voter`
--

DROP TABLE IF EXISTS `voter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `hall_id` int NOT NULL,
  `year` year NOT NULL,
  `date_registered` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id_UNIQUE` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voter`
--

LOCK TABLES `voter` WRITE;
/*!40000 ALTER TABLE `voter` DISABLE KEYS */;
INSERT INTO `voter` VALUES (3,'Maxwell','Agra','agramaxwell6@gmail.com','ps/csc/16/0021','$2b$10$zSSPdc6imYpEGAKIrnbFEuC9nE41JuHRBjucS8TdzgBaCohePqi/.',4,2016,'2020-8-2 11:11:52'),(4,'Larry','Okraku','larrygodwin59@gmail.com','ps/csc/16/0026','$2b$10$XXa3ds5FLmyKZAJFT0aUneEFaekTiI2hzqQaJRCRWmuPAix3MWmTS',3,2016,'2020-8-2 11:11:52');
/*!40000 ALTER TABLE `voter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-03 12:43:06
