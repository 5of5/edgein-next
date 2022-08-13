CREATE SEQUENCE users_id_seq AS integer START 1 OWNED BY users.id;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
