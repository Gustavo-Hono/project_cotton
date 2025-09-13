CREATE TYPE cargos_enum AS ENUM ('ADMIN', 'OPERADOR_DE_CAMPO');

CREATE TABLE perfil (
	id serial primary key,
	cargos cargos_enum NOT NULL DEFAULT 'OPERADOR_DE_CAMPO'
);

CREATE TYPE steps_enum AS ENUM ('COLHEITA', 'TRASPORTE', 'ARMAZENAMENTO');

CREATE TABLE steps (
	id serial primary key,
	name_step steps_enum NOT NULL DEFAULT 'COLHEITA'
);


CREATE TABLE users (
	id serial primary key,
	name VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	password VARCHAR(60) NOT NULL,
	perfil_id INTEGER NOT NULL,
	active BOOLEAN NOT NULL,
	FOREIGN KEY (perfil_id) REFERENCES perfil(id)
);


CREATE TABLE movimentations (
	id serial primary key,
	perfil_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	step_id INTEGER NOT NULL,
	time_movimentation TIMESTAMPTZ NOT NULL,
	FOREIGN KEY (perfil_id) REFERENCES perfil(id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (step_id) REFERENCES steps(id)
);


CREATE TABLE fards (
	id serial primary key,
	created_at timestamptz NOT NULL,
	id_user_create_fard INTEGER NOT NULL,
	FOREIGN KEY (id_user_create_fard) REFERENCES users(id)
);