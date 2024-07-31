
-- File: 0001_create_roles.up.sql
-- Description: Create the initial role table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS auth cascade;
DROP SCHEMA IF EXISTS asset cascade;

DROP ROLE IF EXISTS auth_admin;
DROP ROLE IF EXISTS asset_admin;
DROP ROLE IF EXISTS asset_public;
DROP ROLE IF EXISTS asset_test;

CREATE USER auth_admin
    CREATEROLE
    NOINHERIT;
ALTER USER auth_admin SET SEARCH_PATH = auth;
ALTER USER auth_admin SET idle_in_transaction_session_timeout = 6000;

CREATE USER asset_admin
    CREATEROLE
    NOINHERIT;
ALTER USER asset_admin SET SEARCH_PATH = asset;
ALTER USER asset_admin SET idle_in_transaction_session_timeout = 6000;

CREATE USER asset_public WITH PASSWORD 'password' LOGIN;
ALTER USER asset_public SET SEARCH_PATH = auth, asset;
ALTER USER asset_public SET idle_in_transaction_session_timeout = 6000;

CREATE USER asset_test WITH PASSWORD 'password' LOGIN;
ALTER USER asset_test SET SEARCH_PATH = auth, asset;
ALTER USER asset_test SET idle_in_transaction_session_timeout = 2000;