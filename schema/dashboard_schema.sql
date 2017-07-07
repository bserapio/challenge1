--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: client_db; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE client_db (
    id integer NOT NULL,
    client_id integer,
    identifier character varying(31) NOT NULL,
    name character varying(255) NOT NULL,
    lang character varying(2),
    db_name character varying(31) NOT NULL,
    db_login character varying(31) NOT NULL,
    db_pass character varying(31) NOT NULL,
    active boolean DEFAULT false NOT NULL,
    maintenance boolean DEFAULT false NOT NULL,
    auto_update boolean,
    expire_date date,
    archived_at timestamp without time zone
);


ALTER TABLE client_db OWNER TO dev;

--
-- Name: client_db_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE client_db_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client_db_id_seq OWNER TO dev;

--
-- Name: client_db_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE client_db_id_seq OWNED BY client_db.id;


--
-- Name: client_meta; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE client_meta (
    id integer NOT NULL,
    client_id integer NOT NULL,
    user_id integer NOT NULL,
    type character varying(255) NOT NULL,
    new_invoice boolean DEFAULT true NOT NULL,
    new_channel boolean DEFAULT true NOT NULL,
    cubilis boolean DEFAULT false NOT NULL,
    ikentoo boolean DEFAULT false NOT NULL,
    seekda boolean DEFAULT false NOT NULL,
    channel_manager boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone NOT NULL,
    last_login timestamp without time zone
);


ALTER TABLE client_meta OWNER TO dev;

--
-- Name: client_meta_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE client_meta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client_meta_id_seq OWNER TO dev;

--
-- Name: client_meta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE client_meta_id_seq OWNED BY client_meta.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone NOT NULL
);


ALTER TABLE users OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO dev;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY client_db ALTER COLUMN id SET DEFAULT nextval('client_db_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY client_meta ALTER COLUMN id SET DEFAULT nextval('client_meta_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: client_db_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY client_db
    ADD CONSTRAINT client_db_pkey PRIMARY KEY (id);


--
-- Name: client_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY client_meta
    ADD CONSTRAINT client_meta_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: client_db; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON TABLE client_db FROM PUBLIC;
REVOKE ALL ON TABLE client_db FROM dev;
GRANT ALL ON TABLE client_db TO dev;


--
-- Name: client_db_id_seq; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON SEQUENCE client_db_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE client_db_id_seq FROM dev;
GRANT ALL ON SEQUENCE client_db_id_seq TO dev;


--
-- Name: client_meta; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON TABLE client_meta FROM PUBLIC;
REVOKE ALL ON TABLE client_meta FROM dev;
GRANT ALL ON TABLE client_meta TO dev;


--
-- Name: client_meta_id_seq; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON SEQUENCE client_meta_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE client_meta_id_seq FROM dev;
GRANT ALL ON SEQUENCE client_meta_id_seq TO dev;


--
-- Name: users; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON TABLE users FROM PUBLIC;
REVOKE ALL ON TABLE users FROM dev;
GRANT ALL ON TABLE users TO dev;


--
-- Name: users_id_seq; Type: ACL; Schema: public; Owner: dev
--

REVOKE ALL ON SEQUENCE users_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE users_id_seq FROM dev;
GRANT ALL ON SEQUENCE users_id_seq TO dev;


--
-- PostgreSQL database dump complete
--

