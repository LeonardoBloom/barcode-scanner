create database merchandise_db;
use merchandise_db;

create table item (
	item_id BIGINT PRIMARY KEY,
    item_name VARCHAR(50),
    item_quantity VARCHAR(50),
    current_stock INT,
    item_price DECIMAL(10,2),
    item_image VARCHAR(255)
);

create table supplier (
	supplier_id BIGINT PRIMARY KEY,
    supplier_name varchar(50),
    order_id bigint,
    foreign key (order_id) references pallet(pallet_id)
);

create table pallet (
	pallet_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_created DATE,
    supplier_name varchar(50)
);

create table pallet_items (
    pallet_id bigint auto_increment not null,
    item_id bigint not null,
    item_quantity varchar(50),
    item_count int not null,
    primary key (pallet_id, item_id),
    foreign key (pallet_id) references pallet(pallet_id) on delete cascade,
    foreign key (item_id) references item(item_id) on delete cascade
);

select * from item;
select * from pallet;
select * from pallet_items;

truncate table pallet;
truncate table pallet_items;

drop table pallet_items;
drop table item;

alter table pallet_items add column item_name varchar(50)

alter table pallet change date_created date_created DATETIME;
alter table pallet_items
	add column item_name varchar(50);
    
DROP INDEX idx_item_name ON item;
    
alter table pallet_items drop column item_name;

select * from item where item_id = '20910001'