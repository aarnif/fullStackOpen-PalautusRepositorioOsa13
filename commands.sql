CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    username text NOT NULL,
);

insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7, current_timestamp, current_timestamp, 1);
insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Edsger W. Dijkstra', 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful', 5, current_timestamp, current_timestamp, 1);
insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 'Canonical string reduction', 12, current_timestamp, current_timestamp, 1);
insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 'First class tests', 10, current_timestamp, current_timestamp, 2);
insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 'TDD harms architecture', 0, current_timestamp, current_timestamp, 2);
insert into blogs (author, url, title, likes, created_at, updated_at, user_id) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'Type wars', 2, current_timestamp, current_timestamp, 2);

insert into users (name, username, created_at, updated_at) values ('John Doe', 'johnD@gmail.com', current_timestamp, current_timestamp);
insert into users (name, username, created_at, updated_at) values ('Jane Doe', 'janeD@gmail.com', current_timestamp, current_timestamp);
