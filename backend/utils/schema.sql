-- Create & use database.
DROP DATABASE IF EXISTS techtrendsdb;
CREATE DATABASE techtrendsdb;
USE techtrendsdb;

--Create tables.
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS levels;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS software;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS frameworks;
DROP TABLE IF EXISTS dbs;

CREATE TABLE users(
    id VARCHAR(16),
    username VARCHAR(16),
    passwd VARCHAR(64) NOT NULL,
    email VARCHAR(50) NOT NULL,
    salary DECIMAL(8,2),
    age INT,
    country VARCHAR(16),
    PRIMARY KEY (id)
);

CREATE TABLE jobs(
    id INT AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    education INT,
    experience INT,
    company VARCHAR(32) NOT NULL,
    addr VARCHAR (255),
    city VARCHAR(16),
    province VARCHAR(2),
    country VARCHAR(16) NOT NULL,
    link VARCHAR(255) NOT NULL,
    postDate DATE,
    PRIMARY KEY (id)
);

CREATE TABLE levels(
    id INT AUTO_INCREMENT,
    lvl VARCHAR(16) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE attendance(
    id INT AUTO_INCREMENT,
    attendance VARCHAR(16) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE dbs(
    id INT AUTO_INCREMENT,
    db VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE frameworks(
    id INT AUTO_INCREMENT,
    framework VARCHAR(16) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE languages(
    id INT AUTO_INCREMENT,
    lang VARCHAR(16) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE positions(
    id INT AUTO_INCREMENT,
    position VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE software(
    id INT AUTO_INCREMENT,
    software VARCHAR(32) NOT NULL,
    jobId INT,
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    PRIMARY KEY(id)
);

--Create associative tables.
DROP TABLE IF EXISTS users_positions;
DROP TABLE IF EXISTS users_jobs;
DROP TABLE IF EXISTS users_levels;
DROP TABLE IF EXISTS jobs_levels;
DROP TABLE IF EXISTS jobs_attendance;
DROP TABLE IF EXISTS jobs_languages;
DROP TABLE IF EXISTS jobs_frameworks;
DROP TABLE IF EXISTS jobs_databases;

CREATE TABLE users_positions (
    userId VARCHAR(16) NOT NULL,
    positionId INT NOT NULL,
    PRIMARY KEY (userId, positionId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (positionId) REFERENCES positions(id)
);

CREATE TABLE users_jobs (
    userId VARCHAR(16) NOT NULL,
    jobId INT NOT NULL,
    PRIMARY KEY (userId, jobId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (jobId) REFERENCES jobs(id)
);

CREATE TABLE users_levels (
    userId VARCHAR(16) NOT NULL,
    levelId INT NOT NULL,
    PRIMARY KEY (userId, levelId),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (levelId) REFERENCES levels(id)
);

CREATE TABLE jobs_levels (
    jobId INT,
    levelId INT,
    PRIMARY KEY (jobId, levelId),
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    FOREIGN KEY (levelId) REFERENCES levels(id)
);

CREATE TABLE jobs_attendance (
    jobId INT,
    attendanceId INT,
    PRIMARY KEY (jobId, attendanceId),
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    FOREIGN KEY (attendanceId) REFERENCES attendance(id)
);

CREATE TABLE jobs_languages (
    jobId INT,
    languageId INT,
    PRIMARY KEY (jobId, languageId),
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    FOREIGN KEY (languageId) REFERENCES languages(id)
);

CREATE TABLE jobs_frameworks (
    jobId INT,
    frameworkId INT,
    PRIMARY KEY (jobId, frameworkId),
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    FOREIGN KEY (frameworkId) REFERENCES frameworks(id)
);

CREATE TABLE jobs_databases (
    jobId INT,
    databaseId INT,
    PRIMARY KEY (jobId, databaseId),
    FOREIGN KEY (jobId) REFERENCES jobs(id),
    FOREIGN KEY (databaseId) REFERENCES dbs(id)
);

--Populate tables for dropdown menu inputs.
INSERT INTO levels (lvl) VALUES 
('Intern'),
('Entry'),
('Associate'),
('Mid-Senior'),
('Director'),
('Executive');

INSERT INTO positions (position) VALUES 
('Front-End Developer'),
('Back-End Developer'),
('Full Stack Developer'),
('DevOps Engineer'),
('Software Architect'),
('QA Engineer'),
('Data Engineer'),
('Mobile App Developer'),
('Machine Learning Engineer'),
('Web Developer');

INSERT INTO attendance (attendance) VALUES 
('On-Site'),
('Hybrid'),
('Remote');

INSERT INTO languages (lang) VALUES 
('Java'),
('Python'),
('JavaScript'),
('C++'),
('C#'),
('Ruby'),
('Swift'),
('Kotlin'),
('Go'),
('Rust'),
('PHP'),
('TypeScript'),
('R'),
('Scala'),
('Dart'),
('Perl'),
('MATLAB'),
('Objective-C'),
('Elixir'),
('Haskell'),
('F#'),
('Lua'),
('Shell Scripting'),
('SQL'),
('HTML'),
('CSS'),
('SASS'),
('C'),
('GraphQL');

INSERT INTO frameworks (framework) VALUES 
('React'),
('Android'),
('iOS'),
('Angular'),
('Vue.js'),
('Django'),
('Flask'),
('Spring'),
('Express'),
('Ruby on Rails'),
('Laravel'),
('ASP.NET'),
('Next.js'),
('Nuxt.js'),
('Svelte'),
('Ember.js'),
('NestJS'),
('FastAPI'),
('Koa'),
('Gin'),
('Quarkus'),
('Micronaut'),
('Phoenix'),
('Symfony'),
('CodeIgniter'),
('CakePHP'),
('jQuery'),
('Backbone.js'),
('Meteor'),
('Gatsby'),
('Struts'),
('Play'),
('Hapi'),
('Electron'),
('Flutter'),
('React Native'),
('Ionic'),
('Xamarin'),
('Unity'),
('Unreal Engine'),
('TensorFlow'),
('PyTorch'),
('Keras'),
('Hugging Face'),
('Apache Spark'),
('Hadoop'),
('Airflow'),
('Pandas'),
('D3.js');

INSERT INTO dbs (db) VALUES 
('MySQL'),
('PostgreSQL'),
('MongoDB'),
('SQLite'),
('Redis'),
('MariaDB'),
('Oracle DB'),
('Microsoft SQL Server'),
('Cassandra'),
('Elasticsearch'),
('DynamoDB'),
('Firebase Realtime Database'),
('Firestore'),
('CouchDB'),
('Neo4j'),
('Couchbase'),
('HBase'),
('GraphQL Database'),
('Amazon RDS'),
('Amazon Redshift'),
('Snowflake'),
('Apache Hive'),
('ClickHouse'),
('InfluxDB'),
('TimescaleDB'),
('Presto'),
('BigQuery'),
('Azure Cosmos DB'),
('CockroachDB'),
('Supabase'),
('Memcached'),
('IBM Db2'),
('Teradata'),
('Apache Druid'),
('VoltDB'),
('TiDB'),
('ArangoDB'),
('OrientDB'),
('Realm'),
('Apache Derby');


--Insert sample data.
INSERT INTO users(id, username, passwd, email, salary, age, country) VALUES ("admin00", "aiden", "admin123", "aiden@techtrends.ca", 100000.00, 24, "Canada");
INSERT INTO jobs(title, education, experience, company, addr, city, province, country, link) VALUE 
("Software Engineer (Early Career)", 3, 0, "Cresta", "100 King Street West 1 First Canadian Place, Suite 6200", "Toronto","ON", "Canada", "https://job-boards.greenhouse.io/cresta/jobs/4251044008?gh_src=9a5432008us");
INSERT INTO users_positions(userId, positionId) VALUES ("admin00", 3);
INSERT INTO users_jobs(userId, jobId) VALUES ("admin00", 1);
INSERT INTO users_levels(userId, levelId) VALUES ("admin00", 1);
INSERT INTO jobs_levels(jobId, levelId) VALUES (1, 2);
INSERT INTO jobs_attendance(jobId, attendanceId) VALUES (1, 2);
