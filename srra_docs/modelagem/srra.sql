--CREATE DATABASE srra;
SET SEARCH_PATH = srra;

CREATE SCHEMA seguranca;
CREATE SCHEMA principal;

---- SEGURANCA
CREATE TABLE seguranca.grupo(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(70) NOT NULL,
	datacadastro TIMESTAMP WITH TIME ZONE,
	idusuariocadastro INTEGER,
	dataalteracao TIMESTAMP WITH TIME ZONE,
	idusuarioalteracao INTEGER
	--CONSTRAINT pk_grupo PRIMARY KEY (id)
);

CREATE TABLE seguranca.usuario(
	id SERIAL PRIMARY KEY,
	idgrupo INTEGER NOT NULL,
	nome VARCHAR(250) NOT NULL,
	matricula VARCHAR(20) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	email VARCHAR(250) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	datacadastro TIMESTAMP WITH TIME ZONE,
	idusuariocadastro INTEGER,
	dataalteracao TIMESTAMP WITH TIME ZONE,
	idusuarioalteracao INTEGER,
	--CONSTRAINT pk_usuario PRIMARY KEY (id),
	CONSTRAINT fk_idgrupo_usuario FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id)
);

CREATE TABLE seguranca.opcaomenu(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(30) NOT NULL,
	idmae INTEGER,
	url VARCHAR(30) NOT NULL
	--CONSTRAINT pk_opcaoMenu PRIMARY KEY (id)
);

CREATE TABLE seguranca.opcaomenugrupo(
	idgrupo INTEGER NOT NULL,
	idopcaomenu INTEGER NOT NULL,
	PRIMARY KEY (idgrupo, idopcaomenu),
	CONSTRAINT fk_idgrupo_opcaomenugrupo FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id),
	CONSTRAINT fk_idopcaomenu_opcaomenugrupo FOREIGN KEY (idopcaomenu) REFERENCES seguranca.opcaomenu (id)
);

CREATE TABLE seguranca.funcionalidade(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
	--CONSTRAINT pk_funcionalidade PRIMARY KEY (id)
);

CREATE TABLE seguranca.grupofuncionalidade(
	idgrupo INTEGER NOT NULL,
	idfuncionalidade INTEGER NOT NULL,
	PRIMARY KEY(idgrupo, idfuncionalidade),
	CONSTRAINT fk_idgrupo_grupofuncionalidade FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id),
	CONSTRAINT fk_idfuncionalidade_grupofuncionalidade FOREIGN KEY (idfuncionalidade) REFERENCES seguranca.funcionalidade (id)
);


-- PUBLIC
CREATE TABLE principal.tiporecurso(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(30) NOT NULL
	--CONSTRAINT pk_tiporecurso PRIMARY KEY (id)
);

CREATE TABLE principal.statusrecurso(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(20) NOT NULL
	--CONSTRAINT pk_statusRecurso PRIMARY KEY (id)
);

CREATE TABLE principal.recurso(
	id SERIAL PRIMARY KEY,
	codigoPatrimonio INTEGER,
	idtiporecurso smallint NOT NULL,
	idstatusrecurso smallint NOT NULL,
	nome VARCHAR(50) NOT NULL,
	descricao TEXT NOT NULL,
	datamotivo TIMESTAMP WITH TIME ZONE,
	motivo TEXT,
	datacadastro TIMESTAMP WITH TIME ZONE,
	idusuariocadastro INTEGER,
	dataalteracao TIMESTAMP WITH TIME ZONE,
	idusuarioalteracao INTEGER,
	--CONSTRAINT pk_recurso PRIMARY KEY (id),
	CONSTRAINT fk_idtiporecurso_recurso FOREIGN KEY (idtiporecurso) REFERENCES principal.tiporecurso (id),
	CONSTRAINT fk_idstatusrecurso_recurso FOREIGN KEY (idstatusrecurso) REFERENCES principal.statusrecurso (id)
);

CREATE TABLE principal.statusocorrencia(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(20) NOT NULL
	--CONSTRAINT pk_statusocorrencia PRIMARY KEY (id)
);

CREATE TABLE principal.ocorrencia(
	id SERIAL PRIMARY KEY,
	idusuario INTEGER NOT NULL,
	idrecurso INTEGER NOT NULL,
	data TIMESTAMP WITH TIME ZONE NOT NULL,
	detalhes TEXT NOT NULL,
	datacadastro TIMESTAMP WITH TIME ZONE,
	idusuariocadastro INTEGER,
	dataalteracao TIMESTAMP WITH TIME ZONE,
	idusuarioalteracao INTEGER,
	idstatusocorrencia INTEGER,
	--CONSTRAINT pk_ocorrencia PRIMARY KEY (id),
	CONSTRAINT fk_idusuario_ocorrencia FOREIGN KEY (idusuario) REFERENCES seguranca.usuario (id),
	CONSTRAINT fk_idrecurso_ocorrencia FOREIGN KEY (idrecurso) REFERENCES principal.recurso (id),
	CONSTRAINT fk_idstatusocorrencia_ocorrencia FOREIGN KEY (idstatusocorrencia) REFERENCES principal.statusocorrencia (id)
);

CREATE TABLE principal.statusreserva(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(20) NOT NULL
	--CONSTRAINT pk_statureserva PRIMARY KEY (id)
);

CREATE TABLE principal.reserva(
	id SERIAL PRIMARY KEY,
	idusuario INTEGER NOT NULL,
	idrecurso INTEGER NOT NULL,
	idstatusreserva SMALLINT NOT NULL,
	data TIMESTAMP WITH TIME ZONE NOT NULL,
	--CONSTRAINT pk_reserva PRIMARY KEY (id),
	CONSTRAINT fk_idstatusreserva_reserva FOREIGN KEY (idstatusreserva) REFERENCES principal.statusreserva (id),
	CONSTRAINT fk_idusuario_reserva FOREIGN KEY (idusuario) REFERENCES seguranca.usuario (id),
	CONSTRAINT fk_idrecurso_reserva FOREIGN KEY (idrecurso) REFERENCES principal.recurso (id)
);