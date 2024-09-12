SET search_path TO auth, public;

DROP TABLE IF EXISTS auth.question_answer;
CREATE TABLE auth.question_answer (
    id                UUID                          NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    q1                VARCHAR(60)                   NOT NULL,
    a1                VARCHAR(500)                  NOT NULL,
    q2                VARCHAR(500)                  NOT NULL,
    a2                VARCHAR(60)                   NOT NULL,
    retries           INT                           NOT NULL,
    email             VARCHAR(255)                  NOT NULL UNIQUE,
    created_at        TIMESTAMP WITH TIME ZONE      NOT NULL DEFAULT NOW(),
    created_by        UUID                          REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_at        TIMESTAMP WITH TIME ZONE      NOT NULL DEFAULT NOW(),
    updated_by        UUID                          REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
);

COMMENT ON TABLE auth.question_answer IS 'Question and answer for each user that is unique, used if the user password is forgotten';

GRANT SELECT, INSERT, UPDATE, DELETE ON auth.question_answer TO public;
GRANT ALL PRIVILEGES ON TABLE auth.question_answer TO auth_admin;
