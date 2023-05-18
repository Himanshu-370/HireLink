create table users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
)

--@block
ALTER TABLE users
CHANGE COLUMN id users_id INT;


--@block
CREATE TABLE Company (
  company_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  website VARCHAR(255)
);


--@block
CREATE TABLE Category (
  category_id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE Job (
  job_id INT PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  company_id INT,
  location VARCHAR(255),
  eligibility VARCHAR(255),
  category_id INT,
  job_url VARCHAR(255),
  posted_date DATE,
  FOREIGN KEY (company_id) REFERENCES Company(company_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);


--@block
CREATE TABLE Application (
  application_id INT PRIMARY KEY,
  job_id INT,
  users_id INT,
  application_date DATE,
  FOREIGN KEY (job_id) REFERENCES Job(job_id),
  FOREIGN KEY (users_id) REFERENCES users(users_id)
);


