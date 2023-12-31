CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Edsger W. Dijkstra', 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful');

insert into blogs (author, url, title, likes) values ('', 'https://reactpatterns.com/', 'React patterns', 10);

insert into users (name, username, created_at, updated_at) values ('John Doe', 'johnD', current_timestamp, current_timestamp);

insert into users (name, username, created_at, updated_at) values ('Jane Doe', 'janeD', current_timestamp, current_timestamp);