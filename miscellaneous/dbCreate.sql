/*DROP DATABASE IF EXISTS ViitorStudent;*/
USE ViitorStudent;

CREATE TABLE [User](
[user_id] INT PRIMARY KEY NOT NULL IDENTITY(1,1),
username VARCHAR(255) NOT NULL,
[password] VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL ,
lastName VARCHAR(255) NOT NULL,
firstName VARCHAR(255) NOT NULL,
age INT,
[role] VARCHAR(255) NOT NULL,
join_date DATETIME,
);

/* --------- RECOMANDATION FORM --------- */

CREATE TABLE [Subject](
subject_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL
)
CREATE TABLE [Club](
club_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL
)
CREATE TABLE [Interest](
interest_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL
)
CREATE TABLE [Job](
job_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL
)
CREATE TABLE [City](
city_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL
)

/* --------------------------- */


/* --------- MANY TO MANY USER -> RECOMANDATION FORM --------- */

CREATE TABLE UserSubject(
userSubject_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
subject_id INT NOT NULL,
FOREIGN KEY(subject_id) REFERENCES [Subject](subject_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)

CREATE TABLE UserClub(
userClub_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
club_id INT NOT NULL,
FOREIGN KEY(club_id) REFERENCES [Club](club_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)


CREATE TABLE UserInterest(
userInterest_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
interest_id INT NOT NULL,
FOREIGN KEY(interest_id) REFERENCES [Interest](interest_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)

CREATE TABLE UserJob(
userJob_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
job_id INT NOT NULL,
FOREIGN KEY(job_id) REFERENCES [Job](job_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)

CREATE TABLE UserCity(
userCity_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
city_id INT NOT NULL,
FOREIGN KEY(city_id) REFERENCES [City](city_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)


/* --------------------------- */


/* --------- UNIVERSITY --------- */

CREATE TABLE University(
university_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),

[name] VARCHAR(255) NOT NULL,
[group] VARCHAR(255),

[shortDescription] VARCHAR(255) NOT NULL,
[longDescription] VARCHAR(4000),
[examInfo] VARCHAR(4000),

[email] VARCHAR(255),
[phoneNumber] VARCHAR(255),
[address] VARCHAR(255) NOT NULL,

city_id INT NOT NULL,
FOREIGN KEY(city_id) REFERENCES City(city_id)
)

CREATE TABLE Reviews(
review_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),

[title] VARCHAR(255) NOT NULL,
[body] VARCHAR(400),

university_id INT NOT NULL,
FOREIGN KEY(university_id) REFERENCES University(university_id),

rating INT NOT NULL,

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])
)

/* --------------------------- */

/* --------- MANY TO MANY University -> RECOMANDATION FORM --------- */


CREATE TABLE UniversitySubject(
universitySubject_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
subject_id INT NOT NULL,
FOREIGN KEY(subject_id) REFERENCES [Subject](subject_id),

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)

CREATE TABLE UniversityClub(
universityClub_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
club_id INT NOT NULL,
FOREIGN KEY(club_id) REFERENCES [Club](club_id),

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)


CREATE TABLE UniversityInterest(
universityInterest_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
interest_id INT NOT NULL,
FOREIGN KEY(interest_id) REFERENCES [Interest](interest_id),

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)

CREATE TABLE UniversityJob(
universityJob_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
job_id INT NOT NULL,
FOREIGN KEY(job_id) REFERENCES [Job](job_id),

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)

CREATE TABLE UniversityCity(
universityCity_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
city_id INT NOT NULL,
FOREIGN KEY(city_id) REFERENCES [City](city_id),

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)

/* --------------------------- */


/* --------- MEETINGS --------- */

CREATE TABLE Meeting(
meeting_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
[name] VARCHAR(255) NOT NULL,
[date] DATETIMP NOT NULL,
[description] VARCHAR(255),
[price] INT NOT NULL,
[link] VARCHAR(255) NOT NULL,

[university_id] INT NOT NULL,
FOREIGN KEY([university_id]) REFERENCES [University]([university_id])
)

CREATE TABLE UserMetings(
userMeeting_id INT PRIMARY KEY NOT NULL IDENTITY(1,1),

meeting_id INT NOT NULL,
FOREIGN KEY(meeting_id) REFERENCES Meeting(meeting_id),

[user_id] INT NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [User]([user_id])

)

/* --------------------------- */