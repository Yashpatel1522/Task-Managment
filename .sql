DROP DATABASE IF EXISTS task_managment_db; 
CREATE DATABASE task_managment_db;

USE task_managment_db;

DROP TABLE IF EXISTS roles; 

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    status BOOLEAN DEFAULT 1
);

DROP TABLE IF EXISTS permissions; 

CREATE TABLE permissions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission VARCHAR(50),-- all permission of system
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- per add time
    update_at TIMESTAMP DEFAULT NULL,  
    status BOOLEAN DEFAULT 1 -- status 0 inActive and 1 for active
);

DROP TABLE IF EXISTS role_has_permissions; 

CREATE TABLE role_has_permissions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT,
    permission_id INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- per add time
    update_at TIMESTAMP DEFAULT NULL,  
    status BOOLEAN DEFAULT 1, -- status 0 inActive and 1 for active
    FOREIGN KEY (role_id) REFERENCES roles(id) ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS users; 

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    contact CHAR(12),
    date_of_birth DATE,
    employee_role VARCHAR(100) DEFAULT NULL,
    activation_code VARCHAR(255),
    create_at TIMESTAMP default current_timestamp,
    update_at TIMESTAMP default NULL,
    img_url VARCHAR(255),
    status BOOLEAN,
    FOREIGN KEY(role_id) REFERENCES roles(id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS log_datas; 

CREATE TABLE log_datas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    is_success BOOLEAN default 0,
    log_time TIMESTAMP default current_timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
);


DROP TABLE IF EXISTS user_passwords
CREATE TABLE user_passwords(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    password VARCHAR(80),
    salt VARCHAR(10),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN DEFAULT 1,
    FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS tasks
CREATE TABLE tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    manager_id INT,
    category_id INT,
    prioritiy_id INT,
    task_name VARCHAR(80),
    task_description VARCHAR(255),
    task_start_date DATE,
    task_end_date DATE,
    task_status VARCHAR(50),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    status BOOLEAN DEFAULT 1,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON UPDATE CASCADE,
    FOREIGN KEY(prioritiy_id) REFERENCES priorities(id) ON UPDATE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES users(id) ON UPDATE CASCADE
);
CREATE TABLE attechments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    attechment_url VARCHAR(255),
    FOREIGN KEY(task_id) REFERENCES tasks(id)
);

CREATE TABLE tasks_assigend_to(
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    emp_id INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT NULL,
    status BOOLEAN DEFAULT 0,
    FOREIGN KEY(task_id) REFERENCES tasks(id) ON UPDATE CASCADE,
    FOREIGN KEY(emp_id) REFERENCES users(id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS select_masters

CREATE TABLE select_masters(
    id INT PRIMARY KEY AUTO_INCREMENT,
    select_key VARCHAR(100),
    select_type VARCHAR(100),
    multiple BOOLEAN, 
);

DROP TABLE IF EXISTS option_masters

CREATE TABLE option_masters(
    id INT PRIMARY KEY AUTO_INCREMENT,
    select_id INT,
    options VARCHAR(50),
    FOREIGN KEY(select_id) REFERENCES select_masters(id) ON UPDATE CASCADE
);

DROP TABLE IF EXISTS categories

CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(80),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status BOOLEAN DEFAULT 1
);

DROP TABLE IF EXISTS urgency

CREATE TABLE urgency(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) -- urgent/high/low/modrate
);

DROP TABLE IF EXISTS importants

CREATE TABLE importants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) -- high/low/modrate
);


DROP TABLE IF EXISTS priorities

CREATE TABLE priorities(
    id INT PRIMARY KEY AUTO_INCREMENT,
    urgency_id INT,
    important_id INT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT null,
    status BOOLEAN DEFAULT 1,
    FOREIGN KEY(urgency_id) REFERENCES urgency(id) ON UPDATE CASCADE,
    FOREIGN KEY(important_id) REFERENCES importants(id) ON UPDATE CASCADE,
);


DROP TABLE IF EXISTS comments
CREATE TABLE user_comments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    task_id INT,
    task_status VARCHAR(15),
    comment VARCHAR(255),
    attechment VARCHAR(255),
    FOREIGN KEY(emp_id) REFERENCES users(id) ON UPDATE CASCADE,
    FOREIGN KEY(task_id) REFERENCES tasks(id) ON UPDATE CASCADE
);

create table user_profiles(
id int primary key auto_increment,
user_id int,
oldimage_name varchar(255),
newimage_name varchar(255),
is_deleted boolean default 0,
FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
);

create table user_profiles(
id int primary key auto_increment,
task_id int,
oldfile_name varchar(255),
newfile_name varchar(255),
is_deleted boolean default 0,
FOREIGN KEY(task_id) REFERENCES tasks(id) ON UPDATE CASCADE
);

create table teams(
	id int primary key auto_increment,
    team_name varchar(100),
    manager_id int,
	is_deleted boolean default 0,
    FOREIGN KEY (manager_id) REFERENCES users(id),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table team_members(
	id int primary key auto_increment,
	team_id int,
    FOREIGN KEY(team_id) REFERENCES teams(id),
    emp_id int,
	FOREIGN KEY (emp_id) REFERENCES users(id),
    is_deleted boolean default 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
