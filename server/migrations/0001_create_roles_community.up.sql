
-- File: 0001_create_roles_community.up.sql
-- Description: Create the initial role table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS auth cascade;
DROP SCHEMA IF EXISTS community cascade;

DROP ROLE IF EXISTS auth_admin;
DROP ROLE IF EXISTS community_admin;
DROP ROLE IF EXISTS community_public;
DROP ROLE IF EXISTS community_test;

CREATE USER auth_admin
    CREATEROLE
    NOINHERIT;
ALTER USER auth_admin SET SEARCH_PATH = auth;
ALTER USER auth_admin SET idle_in_transaction_session_timeout = 6000;

CREATE USER community_admin
    CREATEROLE
    NOINHERIT;
ALTER USER community_admin SET SEARCH_PATH = community;
ALTER USER community_admin SET idle_in_transaction_session_timeout = 6000;

CREATE USER community_public WITH PASSWORD 'password' LOGIN;
ALTER USER community_public SET SEARCH_PATH = auth, community;
ALTER USER community_public SET idle_in_transaction_session_timeout = 6000;

CREATE USER community_test WITH PASSWORD 'password' LOGIN;
ALTER USER community_test SET SEARCH_PATH = auth, community;
ALTER USER community_test SET idle_in_transaction_session_timeout = 2000;