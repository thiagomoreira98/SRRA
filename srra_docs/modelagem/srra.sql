CREATE SCHEMA seguranca;
ALTER SCHEMA seguranca OWNER TO postgres;
SET search_path TO pg_catalog,public,seguranca;

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.funcao(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT pk_id_funcao PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE seguranca.opcaoMenu(
	id serial NOT NULL,
	nome varchar(30) NOT NULL,
	CONSTRAINT pk_id_opcaoMenu PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE seguranca.opcaoMenuFuncao(
	id serial NOT NULL,
	idFuncao smallint NOT NULL,
	idOpcaoMenu smallint NOT NULL,
	CONSTRAINT pk_id_opcaoMenuFuncao PRIMARY KEY (id),
	CONSTRAINT fk_idFuncao_opcaoMenuFuncao FOREIGN KEY (idFuncao) REFERENCES public.funcao (id),
	CONSTRAINT fk_idOpcaoMenu_opcaoMenuFuncao FOREIGN KEY (idOpcaoMenu) REFERENCES seguranca.opcaoMenu (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.docente(
	id serial NOT NULL,
	nome varchar(250) NOT NULL,
	matricula varchar(20) NOT NULL,
	cpf varchar(11) NOT NULL,
	email varchar(250) NOT NULL,
	senha varchar(12) NOT NULL,
	idFuncao smallint NOT NULL,
	CONSTRAINT pk_id_docente PRIMARY KEY (id),
	CONSTRAINT fk_idFuncao_funcao FOREIGN KEY (idFuncao) REFERENCES public.funcao (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.tipoRecurso(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT pk_id_tipoRecurso PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.statusRecurso(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT pk_id_statusRecurso PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.recurso(
	id serial NOT NULL,
	idTipoRecurso smallint NOT NULL,
	nome varchar(50) NOT NULL,
	descricao text NOT NULL,
	dataMotivo date,
	motivo text,
	idStatusRecurso smallint NOT NULL,
	codigoPatrimonio integer,
	CONSTRAINT pk_id_recurso PRIMARY KEY (id),
	CONSTRAINT fk_idTipoRecurso_recurso FOREIGN KEY (idTipoRecurso) REFERENCES public.tipoRecurso (id),
	CONSTRAINT fk_idStatusRecurso_recurso FOREIGN KEY (idStatusRecurso) REFERENCES public.statusRecurso (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.ocorrencia(
	id serial NOT NULL,
	idRecurso integer NOT NULL,
	idDocente integer NOT NULL,
	data date NOT NULL,
	detalhes text NOT NULL,
	CONSTRAINT pk_id_ocorrencia PRIMARY KEY (id),
	CONSTRAINT fk_idRecurso_ocorrencia FOREIGN KEY (idRecurso) REFERENCES public.recurso (id),
	CONSTRAINT fk_idDocente_ocorrencia FOREIGN KEY (idDocente) REFERENCES public.docente (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.statusReserva(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT pk_id_statusReserva PRIMARY KEY (id)
);

---------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE public.reserva(
	id serial NOT NULL,
	idRecurso integer NOT NULL,
	idDocente integer NOT NULL,
	data date NOT NULL,
	idStatusReserva smallint NOT NULL,
	CONSTRAINT pk_id_reserva PRIMARY KEY (id),
	CONSTRAINT fk_idRecurso_reserva FOREIGN KEY (idRecurso) REFERENCES public.recurso (id),
	CONSTRAINT fk_idDocente_reserva FOREIGN KEY (idDocente) REFERENCES public.docente (id),
	CONSTRAINT fk_idStatusReserva_reserva FOREIGN KEY (idStatusReserva) REFERENCES public.statusReserva (id)
);