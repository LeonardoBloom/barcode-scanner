create database merchandise_db;
use merchandise_db;

create table item (
	item_id INT PRIMARY KEY,
    item_name VARCHAR(50),
    item_quantity VARCHAR(50),
    current_stock INT,
    item_price DECIMAL(10,2),
    item_image VARCHAR(255)
);

drop table item;
select * from item;