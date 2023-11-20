-- Exercise 1: Keys
-- Create the authors table
CREATE TABLE authors (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255),
  university VARCHAR(255),
  date_of_birth DATE,
  h_index INT,
  gender VARCHAR(1)
);
-- Add a column called mentor with a foreign key constraint
ALTER TABLE authors
ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
-- ====================================
-- Exercise 2: Relationships:
--Create research_papers Table
CREATE TABLE research_papers (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE,
);
--Create authors_papers Table (junction table )
CREATE TABLE authors_papers (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);
-- Insert 15 authors
INSERT INTO authors (
    author_id,
    author_name,
    university,
    date_of_birth,
    h_index,
    gender,
    mentor
  )
VALUES (
    1,
    'Author1',
    'University1',
    '1990-01-01',
    10,
    'M',
    NULL
  ),
  (
    2,
    'Author2',
    'University2',
    '1992-03-15',
    8,
    'F',
    1
  ),
  (
    3,
    'Author3',
    'University3',
    '1985-07-22',
    12,
    'M',
    2
  ),
  (
    4,
    'Author4',
    'University4',
    '1995-05-30',
    6,
    'F',
    1
  ),
  (
    5,
    'Author5',
    'University5',
    '1988-11-12',
    15,
    'M',
    3
  ),
  (
    6,
    'Author6',
    'University6',
    '1993-09-05',
    9,
    'F',
    2
  ),
  (
    7,
    'Author7',
    'University7',
    '1982-04-18',
    11,
    'M',
    4
  ),
  (
    8,
    'Author8',
    'University8',
    '1997-12-03',
    7,
    'F',
    3
  ),
  (
    9,
    'Author9',
    'University9',
    '1986-08-28',
    13,
    'M',
    5
  ),
  (
    10,
    'Author10',
    'University10',
    '1994-06-10',
    8,
    'F',
    2
  ),
  (
    11,
    'Author11',
    'University11',
    '1984-02-14',
    14,
    'M',
    3
  ),
  (
    12,
    'Author12',
    'University12',
    '1996-10-25',
    6,
    'F',
    6
  ),
  (
    13,
    'Author13',
    'University13',
    '1989-09-08',
    12,
    'M',
    4
  ),
  (
    14,
    'Author14',
    'University14',
    '1991-07-01',
    9,
    'F',
    7
  ),
  (
    15,
    'Author15',
    'University15',
    '1983-03-20',
    11,
    'M',
    8
  );
-- Insert 30 research papers
INSERT INTO research_papers (paper_title, conference, publish_date)
VALUES ('Paper1', 'ConferenceA', '2022-05-10'),
  ('Paper2', 'ConferenceB', '2022-06-20'),
  ('Paper3', 'ConferenceC', '2022-07-15'),
  ('Paper4', 'ConferenceD', '2022-08-05'),
  ('Paper5', 'ConferenceE', '2022-09-12'),
  ('Paper6', 'ConferenceF', '2022-10-30'),
  ('Paper7', 'ConferenceG', '2022-11-18'),
  ('Paper8', 'ConferenceH', '2022-12-25'),
  ('Paper9', 'ConferenceI', '2023-01-08'),
  ('Paper10', 'ConferenceJ', '2023-02-14'),
  ('Paper11', 'ConferenceK', '2023-03-22'),
  ('Paper12', 'ConferenceL', '2023-04-05'),
  ('Paper13', 'ConferenceM', '2023-05-16'),
  ('Paper14', 'ConferenceN', '2023-06-28'),
  ('Paper15', 'ConferenceO', '2023-07-10'),
  ('Paper16', 'ConferenceP', '2023-08-20'),
  ('Paper17', 'ConferenceQ', '2023-09-03'),
  ('Paper18', 'ConferenceR', '2023-10-15'),
  ('Paper19', 'ConferenceS', '2023-11-02'),
  ('Paper20', 'ConferenceT', '2023-12-12'),
  ('Paper21', 'ConferenceU', '2024-01-25'),
  ('Paper22', 'ConferenceV', '2024-02-08'),
  ('Paper23', 'ConferenceW', '2024-03-18'),
  ('Paper24', 'ConferenceX', '2024-04-30'),
  ('Paper25', 'ConferenceY', '2024-05-12'),
  ('Paper26', 'ConferenceZ', '2024-06-24'),
  ('Paper27', 'ConferenceAA', '2024-07-07'),
  ('Paper28', 'ConferenceBB', '2024-08-19'),
  ('Paper29', 'ConferenceCC', '2024-09-01'),
  ('Paper30', 'ConferenceDD', '2024-10-13');
-- Authors contributing to multiple papers
INSERT INTO authors_papers (author_id, paper_id)
VALUES (1, 1),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 8),
  (5, 9),
  (6, 10),
  (7, 11),
  (8, 12),
  (11, 27),
  (13, 28),
  (14, 29),
  (15, 20);
-- ====================================
-- Exercise 3 : JOiN:
-- authors and their corresponding mentors:
SELECT a.author_name,
  m.author_name AS mentor_name
FROM authors a
  LEFT JOIN authors m ON a.mentor = m.author_id;
-- authors and their published paper_title:
SELECT a.*,
  rp.paper_title
FROM authors a
  LEFT JOIN authors_papers ap ON a.author_id = ap.author_id
  LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
-- ====================================
-- Exercise 4 : Aggregate Functions:
-- papers and the number of authors that wrote each paper:
SELECT rp.paper_title,
  COUNT(ap.author_id) AS num_authors
FROM research_papers rp
  LEFT JOIN authors_papers ap ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_id;
-- Sum of the research papers published by all female authors:
SELECT a.gender,
  SUM(ap.paper_id IS NOT NULL) AS num_papers_published
FROM authors a
  LEFT JOIN authors_papers ap ON a.author_id = ap.author_id
GROUP BY a.gender
HAVING a.gender = 'F';
-- Average of the h-index of all authors per university:
SELECT university,
  AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university;
-- Sum of the research papers of the authors per university:
SELECT a.university,
  COUNT(ap.paper_id) AS num_papers
FROM authors a
  LEFT JOIN authors_papers ap ON a.author_id = ap.author_id
GROUP BY a.university;
-- Minimum and maximum of the h-index of all authors per university:
SELECT university,
  MIN(h_index) AS min_h_index,
  MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;