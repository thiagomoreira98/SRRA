CREATE SCHEMA seguranca;

---- SEGURANCA
CREATE TABLE seguranca.grupo(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT pk_id_grupo PRIMARY KEY (id)
);

CREATE TABLE seguranca.usuario(
	id serial NOT NULL,
	idgrupo smallint NOT NULL,
	nome varchar(250) NOT NULL,
	matricula varchar(20) NOT NULL,
	cpf varchar(11) NOT NULL,
	email varchar(250) NOT NULL,
	senha varchar(100) NOT NULL,
	CONSTRAINT pk_id_usuario PRIMARY KEY (id),
	CONSTRAINT fk_idgrupo_usuario FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id)
);

CREATE TABLE seguranca.opcaomenu(
	id serial NOT NULL,
	nome varchar(30) NOT NULL,
	idmae INTEGER,
	url varchar(30) NOT NULL,
	CONSTRAINT "pk_id_opcaoMenu" PRIMARY KEY (id)
);

CREATE TABLE seguranca.opcaomenugrupo(
	id serial NOT NULL,
	idgrupo integer NOT NULL,
	idopcaomenu integer NOT NULL,
	CONSTRAINT pk_id_opcaomenugrupo PRIMARY KEY (id),
	CONSTRAINT fk_idgrupo_opcaomenugrupo FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id),
	CONSTRAINT fk_idopcaomenu_opcaomenugrupo FOREIGN KEY (idopcaomenu) REFERENCES seguranca.opcaomenu (id)
);

CREATE TABLE seguranca.funcionalidade(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT pk_id_funcionalidade PRIMARY KEY (id)
);

CREATE TABLE seguranca.grupofuncionalidade(
	id serial NOT NULL,
	idgrupo integer NOT NULL,
	idfuncionalidade integer NOT NULL,
	CONSTRAINT pk_id_grupofuncionalidade PRIMARY KEY (id),
	CONSTRAINT fk_idgrupo_grupofuncionalidade FOREIGN KEY (idgrupo) REFERENCES seguranca.grupo (id),
	CONSTRAINT fk_idfuncionalidade_grupofuncionalidade FOREIGN KEY (idfuncionalidade) REFERENCES seguranca.funcionalidade (id)
);


-- PUBLIC
CREATE TABLE public.tiporecurso(
	id serial NOT NULL,
	nome varchar(50) NOT NULL,
	CONSTRAINT pk_id_tiporecurso PRIMARY KEY (id)
);

CREATE TABLE public.statusrecurso(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT "pk_id_statusRecurso" PRIMARY KEY (id)
);

CREATE TABLE public.recurso(
	id serial NOT NULL,
	idtiporecurso smallint NOT NULL,
	idstatusrecurso smallint NOT NULL,
	nome varchar(50) NOT NULL,
	descricao text NOT NULL,
	datamotivo timestamp with time zone,
	motivo text,
	CONSTRAINT pk_id_recurso PRIMARY KEY (id),
	CONSTRAINT fk_idtiporecurso_recurso FOREIGN KEY (idtiporecurso) REFERENCES public.tiporecurso (id),
	CONSTRAINT fk_idstatusrecurso_recurso FOREIGN KEY (idstatusrecurso) REFERENCES public.statusrecurso (id)
);

CREATE TABLE public.ocorrencia(
	id serial NOT NULL,
	idusuario integer NOT NULL,
	idrecurso integer NOT NULL,
	data timestamp with time zone NOT NULL,
	detalhes text NOT NULL,
	CONSTRAINT pk_id_ocorrencia PRIMARY KEY (id),
	CONSTRAINT fk_idusuario_ocorrencia FOREIGN KEY (idusuario) REFERENCES seguranca.usuario (id),
	CONSTRAINT fk_idrecurso_ocorrencia FOREIGN KEY (idrecurso) REFERENCES public.recurso (id)
);

CREATE TABLE public.statusreserva(
	id serial NOT NULL,
	nome varchar(20) NOT NULL,
	CONSTRAINT pk_id_statureserva PRIMARY KEY (id)
);

CREATE TABLE public.reserva(
	id serial NOT NULL,
	idusuario integer NOT NULL,
	idrecurso integer NOT NULL,
	idstatusreserva smallint NOT NULL,
	data date NOT NULL,
	CONSTRAINT pk_id_reserva PRIMARY KEY (id),
	CONSTRAINT fk_idstatusreserva_reserva FOREIGN KEY (idstatusreserva) REFERENCES public.statusreserva (id),
	CONSTRAINT fk_idusuario_reserva FOREIGN KEY (idusuario) REFERENCES seguranca.usuario (id),
	CONSTRAINT fk_idrecurso_reserva FOREIGN KEY (idrecurso) REFERENCES public.recurso (id)
);