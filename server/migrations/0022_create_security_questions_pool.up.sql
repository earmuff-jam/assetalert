SET search_path TO auth, public;

DROP TABLE IF EXISTS auth.question_pool;
CREATE TABLE auth.question_pool (
    id       UUID                          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question VARCHAR(500)                  NOT NULL
);

COMMENT ON TABLE auth.question_pool IS 'Pool of question and answer for the user to choose from for forgot password workflow';

GRANT SELECT, INSERT, UPDATE, DELETE ON auth.question_pool TO public;
GRANT ALL PRIVILEGES ON TABLE auth.question_pool TO auth_admin;
