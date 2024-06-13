-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    user_id CHAR(36) NOT NULL,
    name VARCHAR(50),
    email VARCHAR(50),
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;

INSERT INTO public."user"(
	username, password, user_id, name, email)
	VALUES ('admin',
	'123456aZ@',
	gen_random_uuid(),
	'admin','admin@gmail.com'
	);