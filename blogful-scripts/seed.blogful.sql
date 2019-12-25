BEGIN;

INSERT INTO blogful_articles (title, content, date_published)
VALUES
('keith', 'keith dumont', now()),
('mika', 'mika dumont', now()),
('indie', 'indie dumont', now()),
('dree', 'dree dumont', now()),
('kai', 'kai dumont', now()) 
;
COMMIT;