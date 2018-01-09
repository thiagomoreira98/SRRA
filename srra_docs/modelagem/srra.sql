-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.0
-- PostgreSQL version: 9.6
-- Project Site: pgmodeler.com.br
-- Model Author: ---


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: srra | type: DATABASE --
-- -- DROP DATABASE IF EXISTS srra;
-- CREATE DATABASE srra
-- ;
-- -- ddl-end --
-- 

-- object: seguranca | type: SCHEMA --
-- DROP SCHEMA IF EXISTS seguranca CASCADE;
CREATE SCHEMA seguranca;
-- ddl-end --
ALTER SCHEMA seguranca OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,seguranca;
-- ddl-end --

-- object: public.funcao | type: TABLE --
-- DROP TABLE IF EXISTS public.funcao CASCADE;
CREATE TABLE public.funcao(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT pk_id_funcao PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.funcao OWNER TO postgres;
-- ddl-end --

-- object: public.docente | type: TABLE --
-- DROP TABLE IF EXISTS public.docente CASCADE;
CREATE TABLE public.docente(
	id serial NOT NULL,
	nome varchar(250) NOT NULL,
	matricula varchar(20) NOT NULL,
	cpf varchar(11) NOT NULL,
	email varchar(250) NOT NULL,
	senha varchar(12) NOT NULL,
	"idFuncao" smallint NOT NULL,
	CONSTRAINT pk_id_docente PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.docente OWNER TO postgres;
-- ddl-end --

-- object: public."tipoRecurso" | type: TABLE --
-- DROP TABLE IF EXISTS public."tipoRecurso" CASCADE;
CREATE TABLE public."tipoRecurso"(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT "pk_id_tipoRecurso" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."tipoRecurso" OWNER TO postgres;
-- ddl-end --

-- object: public.recurso | type: TABLE --
-- DROP TABLE IF EXISTS public.recurso CASCADE;
CREATE TABLE public.recurso(
	id serial NOT NULL,
	"idTipoRecurso" smallint NOT NULL,
	nome varchar(50) NOT NULL,
	descricao text NOT NULL,
	"dataMotivo" date,
	motivo text,
	"idStatusRecurso" smallint NOT NULL,
	CONSTRAINT pk_id_recurso PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.recurso OWNER TO postgres;
-- ddl-end --

-- object: public."statusRecurso" | type: TABLE --
-- DROP TABLE IF EXISTS public."statusRecurso" CASCADE;
CREATE TABLE public."statusRecurso"(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT "pk_id_statusRecurso" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."statusRecurso" OWNER TO postgres;
-- ddl-end --

-- object: public.ocorrencia | type: TABLE --
-- DROP TABLE IF EXISTS public.ocorrencia CASCADE;
CREATE TABLE public.ocorrencia(
	id serial NOT NULL,
	"idRecurso" integer NOT NULL,
	"idDocente" integer NOT NULL,
	data date NOT NULL,
	detalhes text NOT NULL,
	CONSTRAINT pk_id_ocorrencia PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.ocorrencia OWNER TO postgres;
-- ddl-end --

-- object: public.reserva | type: TABLE --
-- DROP TABLE IF EXISTS public.reserva CASCADE;
CREATE TABLE public.reserva(
	id serial NOT NULL,
	"idRecurso" integer NOT NULL,
	"idDocente" integer NOT NULL,
	data date NOT NULL,
	"idStatusReserva" smallint NOT NULL,
	CONSTRAINT pk_id_reserva PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.reserva OWNER TO postgres;
-- ddl-end --

-- object: public."statusReserva" | type: TABLE --
-- DROP TABLE IF EXISTS public."statusReserva" CASCADE;
CREATE TABLE public."statusReserva"(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT "pk_id_statusReserva" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public."statusReserva" OWNER TO postgres;
-- ddl-end --

-- object: seguranca."opcaoMenu" | type: TABLE --
-- DROP TABLE IF EXISTS seguranca."opcaoMenu" CASCADE;
CREATE TABLE seguranca."opcaoMenu"(
	id serial NOT NULL,
	nome varchar(30) NOT NULL,
	CONSTRAINT "pk_id_opcaoMenu" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE seguranca."opcaoMenu" OWNER TO postgres;
-- ddl-end --

-- object: seguranca."opcaoMenuFuncao" | type: TABLE --
-- DROP TABLE IF EXISTS seguranca."opcaoMenuFuncao" CASCADE;
CREATE TABLE seguranca."opcaoMenuFuncao"(
	id serial NOT NULL,
	"idFuncao" smallint NOT NULL,
	"idOpcaoMenu" smallint NOT NULL,
	CONSTRAINT "pk_id_opcaoMenuFuncao" PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE seguranca."opcaoMenuFuncao" OWNER TO postgres;
-- ddl-end --

-- object: public.item | type: TABLE --
-- DROP TABLE IF EXISTS public.item CASCADE;
CREATE TABLE public.item(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	ativo boolean NOT NULL,
	"idRecurso" smallint NOT NULL,
	CONSTRAINT pk_id_item PRIMARY KEY (id)

);
-- ddl-end --
ALTER TABLE public.item OWNER TO postgres;
-- ddl-end --

-- object: "fk_idFuncao_funcao" | type: CONSTRAINT --
-- ALTER TABLE public.docente DROP CONSTRAINT IF EXISTS "fk_idFuncao_funcao" CASCADE;
ALTER TABLE public.docente ADD CONSTRAINT "fk_idFuncao_funcao" FOREIGN KEY ("idFuncao")
REFERENCES public.funcao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idTipoRecurso_recurso" | type: CONSTRAINT --
-- ALTER TABLE public.recurso DROP CONSTRAINT IF EXISTS "fk_idTipoRecurso_recurso" CASCADE;
ALTER TABLE public.recurso ADD CONSTRAINT "fk_idTipoRecurso_recurso" FOREIGN KEY ("idTipoRecurso")
REFERENCES public."tipoRecurso" (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idStatusRecurso_recurso" | type: CONSTRAINT --
-- ALTER TABLE public.recurso DROP CONSTRAINT IF EXISTS "fk_idStatusRecurso_recurso" CASCADE;
ALTER TABLE public.recurso ADD CONSTRAINT "fk_idStatusRecurso_recurso" FOREIGN KEY ("idStatusRecurso")
REFERENCES public."statusRecurso" (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idRecurso_ocorrencia" | type: CONSTRAINT --
-- ALTER TABLE public.ocorrencia DROP CONSTRAINT IF EXISTS "fk_idRecurso_ocorrencia" CASCADE;
ALTER TABLE public.ocorrencia ADD CONSTRAINT "fk_idRecurso_ocorrencia" FOREIGN KEY ("idRecurso")
REFERENCES public.recurso (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idDocente_ocorrencia" | type: CONSTRAINT --
-- ALTER TABLE public.ocorrencia DROP CONSTRAINT IF EXISTS "fk_idDocente_ocorrencia" CASCADE;
ALTER TABLE public.ocorrencia ADD CONSTRAINT "fk_idDocente_ocorrencia" FOREIGN KEY ("idDocente")
REFERENCES public.docente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idRecurso_reserva" | type: CONSTRAINT --
-- ALTER TABLE public.reserva DROP CONSTRAINT IF EXISTS "fk_idRecurso_reserva" CASCADE;
ALTER TABLE public.reserva ADD CONSTRAINT "fk_idRecurso_reserva" FOREIGN KEY ("idRecurso")
REFERENCES public.recurso (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idDocente_reserva" | type: CONSTRAINT --
-- ALTER TABLE public.reserva DROP CONSTRAINT IF EXISTS "fk_idDocente_reserva" CASCADE;
ALTER TABLE public.reserva ADD CONSTRAINT "fk_idDocente_reserva" FOREIGN KEY ("idDocente")
REFERENCES public.docente (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idStatusReserva_reserva" | type: CONSTRAINT --
-- ALTER TABLE public.reserva DROP CONSTRAINT IF EXISTS "fk_idStatusReserva_reserva" CASCADE;
ALTER TABLE public.reserva ADD CONSTRAINT "fk_idStatusReserva_reserva" FOREIGN KEY ("idStatusReserva")
REFERENCES public."statusReserva" (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idFuncao_opcaoMenuFuncao" | type: CONSTRAINT --
-- ALTER TABLE seguranca."opcaoMenuFuncao" DROP CONSTRAINT IF EXISTS "fk_idFuncao_opcaoMenuFuncao" CASCADE;
ALTER TABLE seguranca."opcaoMenuFuncao" ADD CONSTRAINT "fk_idFuncao_opcaoMenuFuncao" FOREIGN KEY ("idFuncao")
REFERENCES public.funcao (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idOpcaoMenu_opcaoMenuFuncao" | type: CONSTRAINT --
-- ALTER TABLE seguranca."opcaoMenuFuncao" DROP CONSTRAINT IF EXISTS "fk_idOpcaoMenu_opcaoMenuFuncao" CASCADE;
ALTER TABLE seguranca."opcaoMenuFuncao" ADD CONSTRAINT "fk_idOpcaoMenu_opcaoMenuFuncao" FOREIGN KEY ("idOpcaoMenu")
REFERENCES seguranca."opcaoMenu" (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "fk_idRecurso_item" | type: CONSTRAINT --
-- ALTER TABLE public.item DROP CONSTRAINT IF EXISTS "fk_idRecurso_item" CASCADE;
ALTER TABLE public.item ADD CONSTRAINT "fk_idRecurso_item" FOREIGN KEY ("idRecurso")
REFERENCES public.recurso (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


