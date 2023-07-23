# Create Tables

### customers table

```sql
CREATE TABLE `customers` (
  `cust_Id` varchar(28) NOT NULL,
  `custName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`cust_Id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `custName_UNIQUE` (`custName`),
  CONSTRAINT `chk_phone` CHECK (regexp_like(`phone`,_utf8mb4'^[0-9]{10}$'))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### addresses table

```sql
CREATE TABLE `addresses` (
  `address_Id` int NOT NULL AUTO_INCREMENT,
  `cust_Id` varchar(28) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `house_number` varchar(255) NOT NULL,
  PRIMARY KEY (`address_Id`),
  KEY `addresses_ibfk_1` (`cust_Id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`cust_Id`) REFERENCES `customers` (`cust_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

products table

```sql
CREATE TABLE `products` (
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_discount` decimal(10,2) NOT NULL,
  `product_quantity` int NOT NULL,
  `product_description_id` varchar(255) NOT NULL,
  `product_category_id` varchar(255) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_description_id` (`product_description_id`),
  KEY `product_category_id` (`product_category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_description_id`) REFERENCES `product_description` (`description_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### product_description table

```sql
CREATE TABLE `product_description` (
  `description_id` varchar(255) NOT NULL,
  `description_text` text,
  PRIMARY KEY (`description_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### product_category table

```sql
CREATE TABLE `product_category` (
  `category_id` varchar(255) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### images table

```sql
CREATE TABLE `images` (
  `image_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `image_file` longblob NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `images_ibfk_1` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### cart_items table

```sql
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `cart_items_ibfk_1` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

### orders table

```sql
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `cust_Id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `day` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cust_Id` (`cust_Id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cust_Id`) REFERENCES `customers` (`cust_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
