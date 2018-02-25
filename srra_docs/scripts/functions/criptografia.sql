CREATE EXTENSION pgcrypto;

SELECT seguranca.excluirFuncao('seguranca', 'Criptografar');
CREATE OR REPLACE FUNCTION seguranca.Criptografar(pBase integer)

	RETURNS varchar(200) AS $$

	/*
	Documentação
	Arquivo fonte.....: Criptografia.sql
	Objetivo..........: Criptografa numeros com base em chave informada
	Autor.............: Thiago Moreira
 	Data..............: 04/02/2017
	Ex................: SELECT seguranca.Criptografar(1000009);
	*/
	DECLARE vChave varchar(30);
			vRet varchar(200);
	BEGIN
	    SET bytea_output TO 'escape';

		-- Pegando chave publica
		SELECT  COALESCE(CAST(nome AS text), '') || lpad(date_part('day', current_date)::text,2,'0')
			INTO vChave
			FROM
				(
					SELECT 'srra' as nome
				) x;

		-- Criptografando
        RETURN replace(replace(replace((encode(public.encrypt(pBase::text::bytea, vChave::bytea, 'bf'::text), 'base64')::varchar(200)), '=', ''), '+', '-'), '/', '_');
	END;
$$
LANGUAGE plpgsql;

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION seguranca.Criptografar(pBase integer, pNaoExpira boolean)

	RETURNS varchar(200) AS $$

	/*
	Documentação
	Arquivo fonte.....: Criptografia.sql
	Objetivo..........: Criptografa numeros com base em chave informada
	Autor.............: Thiago Moreira
 	Data..............: 03/03/2017
	Ex................: SELECT Seguranca.Criptografar(1000009);
	*/
	DECLARE vChave varchar(30);
			vRet varchar(200);
	BEGIN
	    SET bytea_output TO 'escape';

		-- Pegando chave publica
		SELECT  COALESCE(CAST(nome AS text), '') || CASE WHEN pNaoExpira THEN  '' ELSE lpad(date_part('day', current_date)::text,2,'0') END
			INTO vChave
			FROM
				(
					SELECT 'srra' as nome
				) x;

		-- Criptografando
        RETURN replace(replace(replace((encode(public.encrypt(pBase::text::bytea, vChave::bytea, 'bf'::text), 'base64')::varchar(200)), '=', ''), '+', '-'), '/', '_');
	END;
$$
LANGUAGE plpgsql;

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION seguranca.Criptografar(pBase smallint)

	RETURNS varchar(200) AS $$

	/*
	Documentação
	Arquivo fonte.....: Criptografia.sql
	Objetivo..........: Criptografa numeros com base em chave informada
	Autor.............: Thiago Moreira
 	Data..............: 03/03/2017
	Ex................: SELECT Seguranca.Criptografar(1, 123::smallint);
	*/
	BEGIN
		RETURN seguranca.Criptografar(pBase::integer);
	END;
$$
LANGUAGE plpgsql;

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'Descriptografar');
CREATE OR REPLACE FUNCTION seguranca.Descriptografar(pBase varchar(100))

	RETURNS varchar(200) AS $$

	/*
	Documentação
	Arquivo fonte.....: Criptografia.sql
	Objetivo..........: Descriptografa numeros com base em chave informada
	Autor.............: Thiago Moreira
 	Data..............: 03/03/2017
    Ex................: SELECT Seguranca.Descriptografar('123');
	*/
	DECLARE vChave varchar(30);
			vRet varchar(200);
	BEGIN
	    SET bytea_output TO 'escape';

	    IF pBase ~ '^[0-9]+$' THEN
	        RETURN pBase;
	    END IF;

		-- Pegando chave publica
		SELECT  COALESCE(CAST(nome AS text), '') || lpad(date_part('day', current_date)::text,2,'0')
			INTO vChave
			FROM
				(
					SELECT 'srra' as nome
				) x;

		-- Tratando para descriptografar
		WHILE (4*(length(pBase)/3.0)) % 1 <> 0
		    LOOP
		        pBase := CONCAT(pBase, '=');
		    END LOOP;

		vRet := public.decrypt(decode(replace(replace(pBase, '-', '+'), '_', '/'), 'base64')::bytea, vChave::bytea, 'bf');

		IF vRet ~ '^[0-9]+$' THEN
			RETURN vRet;
		ELSE
			RETURN NULL;
		END IF;

		EXCEPTION WHEN Others THEN
			GET STACKED DIAGNOSTICS vRet = MESSAGE_TEXT;
		RETURN NULL;
	END;
$$
LANGUAGE plpgsql;

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION seguranca.Descriptografar(pBase varchar(100), pNaoExpira boolean)

	RETURNS varchar(200) AS $$

	/*
	Documentação
	Arquivo fonte.....: Criptografia.sql
	Objetivo..........: Descriptografa numeros com base em chave informada
	Autor.............: Thiago Moreira
 	Data..............: 03/03/2017
    Ex................: SELECT seguranca.Descriptografar('123');
	*/
	DECLARE vChave varchar(30);
			vRet varchar(200);
	BEGIN
	    SET bytea_output TO 'escape';

	    IF pBase ~ '^[0-9]+$' THEN
	        RETURN pBase;
	    END IF;

		-- Pegando chave publica
		SELECT  COALESCE(CAST(nome AS text), '') || CASE WHEN pNaoExpira THEN '' ELSE lpad(date_part('day', current_date)::text,2,'0') END
			INTO vChave
			FROM
				(
					SELECT 'srra' as nome
				) x;

		-- Tratando para descriptografar
		WHILE (4*(length(pBase)/3.0)) % 1 <> 0
		    LOOP
		        pBase := CONCAT(pBase, '=');
		    END LOOP;

		vRet := public.decrypt(decode(replace(replace(pBase, '-', '+'), '_', '/'), 'base64')::bytea, vChave::bytea, 'bf');

		IF vRet ~ '^[0-9]+$' THEN
			RETURN vRet;
		ELSE
			RETURN NULL;
		END IF;

		EXCEPTION WHEN Others THEN
			GET STACKED DIAGNOSTICS vRet = MESSAGE_TEXT;
		RETURN NULL;
	END;
$$
LANGUAGE plpgsql;