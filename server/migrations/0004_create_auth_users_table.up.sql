
-- File: 0004_create_auth_users_table.up.sql
-- Description: Create the users table and grant permissions on the table.

SET search_path TO auth, public;
CREATE TABLE auth.users
(
    instance_id                 UUID,
    id                          UUID         NOT NULL DEFAULT public.uuid_generate_v4() PRIMARY KEY,
    aud                         VARCHAR(255), -- authenticated or not TEXT script --
    role                        VARCHAR(255), -- role of the user that relates to the psql system. --
    email                       VARCHAR(255) NOT NULL UNIQUE,
    encrypted_password          TEXT,
    email_confirmed_at          TIMESTAMP WITH TIME ZONE,
    invited_at                  TIMESTAMP WITH TIME ZONE,
    confirmation_token          VARCHAR(255),
    confirmation_sent_at        TIMESTAMP WITH TIME ZONE,
    recovery_token              VARCHAR(255),
    recovery_sent_at            TIMESTAMP WITH TIME ZONE,
    email_change_token_new      VARCHAR(255),
    email_change                VARCHAR(255),
    email_change_sent_at        TIMESTAMP WITH TIME ZONE,
    last_sign_in_at             TIMESTAMP WITH TIME ZONE,
    raw_app_meta_data           JSONB,
    raw_user_meta_data          JSONB,
    created_at                  TIMESTAMP WITH TIME ZONE,
    updated_at                  TIMESTAMP WITH TIME ZONE,
    phone                       TEXT                  DEFAULT NULL::CHARACTER VARYING
        unique,
    phone_confirmed_at          TIMESTAMP WITH TIME ZONE,
    phone_change                TEXT                  DEFAULT ''::CHARACTER VARYING,
    phone_change_token          VARCHAR(255)          DEFAULT ''::CHARACTER VARYING,
    phone_change_sent_at        TIMESTAMP WITH TIME ZONE,
    confirmed_at                TIMESTAMP WITH TIME ZONE GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current  VARCHAR(255)          DEFAULT ''::CHARACTER VARYING,
    email_change_confirm_status smallint              DEFAULT 0
        constraint users_email_change_confirm_status_check
            check ((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)),
    banned_until                TIMESTAMP WITH TIME ZONE,
    re_authentication_token     VARCHAR(255)          DEFAULT ''::CHARACTER VARYING,
    re_authentication_sent_at   TIMESTAMP WITH TIME ZONE,
    is_sso_user                 BOOLEAN               DEFAULT FALSE NOT NULL,
    deleted_at                  TIMESTAMP WITH TIME ZONE
);

ALTER TABLE auth.users
    OWNER TO auth_admin;

GRANT SELECT, INSERT, UPDATE, DELETE ON auth.users TO public;
GRANT ALL PRIVILEGES ON TABLE auth.users TO auth_admin;

CREATE INDEX users_instance_id_email_idx
    ON auth.users (instance_id, lower(email::text));

