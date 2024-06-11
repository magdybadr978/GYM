-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2024 at 10:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nationalId` bigint(15) NOT NULL,
  `phoneNumber` bigint(15) NOT NULL,
  `membershipFrom` date NOT NULL,
  `membershipTo` date NOT NULL,
  `membershipCost` float NOT NULL,
  `status` enum('active','freeze') NOT NULL,
  `trainerId` int(11) DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `nationalId`, `phoneNumber`, `membershipFrom`, `membershipTo`, `membershipCost`, `status`, `trainerId`, `isDeleted`) VALUES
(2, 'mahmoud', 2547896325, 12544848, '2024-01-01', '2024-12-01', 400, 'active', 2, 0),
(3, 'updated name', 215448444, 649648545, '2024-02-01', '2024-07-01', 500, 'active', 2, 0),
(4, 'new member', 65655656456, 5487846645, '2024-02-01', '2024-07-01', 800, 'active', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `id` int(11) NOT NULL,
  `trainerName` varchar(50) NOT NULL,
  `durationFrom` date NOT NULL,
  `durationTo` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`id`, `trainerName`, `durationFrom`, `durationTo`) VALUES
(2, 'ahmed', '2024-01-01', '2024-06-30'),
(3, 'updated name', '2024-02-01', '2024-07-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nationalId` (`nationalId`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD KEY `FK_Members_Trainer` (`trainerId`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `FK_Members_Trainer` FOREIGN KEY (`trainerId`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
