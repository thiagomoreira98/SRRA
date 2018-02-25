SELECT seguranca.excluirFuncao('seguranca', 'selecionarUsuario');
CREATE OR REPLACE FUNCTION seguranca.selecionarUsuario(
    pNome seguranca.usuario.nome%TYPE,
    pMatricula seguranca.usuario.matricula%TYPE,
    pCpf seguranca.usuario.cpf%TYPE,
    pEmail seguranca.usuario.email%TYPE,
    pIdGrupo VARCHAR,
    pPagina INTEGER,
    pQuantidade INTEGER
)

    RETURNS TABLE(
        "registros" JSON,
        "totalRegistros" INTEGER
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: Selecionar usuarios
		Autor.............: Thiago Moreira
		Data..............: 05/01/2018
		Ex................: 
			SELECT * FROM seguranca.selecionarUsuario(null, null, null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;
        vIdGrupo INTEGER;

    BEGIN

        vIdGrupo := seguranca.descriptografar(pIdGrupo)::INTEGER;

        vRegistros := json_agg(regs) FROM (
            SELECT  Seguranca.Criptografar(u.id) AS "id",
                    u.matricula,
                    u.nome,
                    g.nome AS "grupo"
            FROM seguranca.usuario AS u
                INNER JOIN seguranca.grupo AS g
                    ON u.idGrupo = g.id
            WHERE (pNome IS NULL OR u.nome ILIKE '%' || pNome || '%')
                AND (pEmail IS NULL OR u.email ILIKE '%' || pEmail || '%')
				AND (pMatricula IS NULL OR u.matricula = pMatricula)
                AND (pCpf IS NULL OR u.cpf = pCpf)
                AND (pIdGrupo IS NULL OR u.idGrupo = vIdGrupo)
            
            ORDER BY u.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
			FROM seguranca.usuario AS u
                INNER JOIN seguranca.grupo AS g
                    ON u.idGrupo = g.id
            WHERE (pNome IS NULL OR u.nome ILIKE '%' || pNome || '%')
                AND (pEmail IS NULL OR u.email ILIKE '%' || pEmail || '%')
				AND (pMatricula IS NULL OR u.matricula = pMatricula)
                AND (pCpf IS NULL OR u.cpf = pCpf)
                AND (pIdGrupo IS NULL OR u.idGrupo = vIdGrupo)
		);

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'buscarUsuario');
CREATE OR REPLACE FUNCTION seguranca.buscarUsuario(
    pId VARCHAR
)

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.usuario.nome%TYPE,
        "cpf" seguranca.usuario.cpf%TYPE,
        "matricula" seguranca.usuario.matricula%TYPE,
        "idGrupo" VARCHAR,
        "email" seguranca.usuario.email%TYPE,
        "senha" seguranca.usuario.senha%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: Buscar um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.buscarusuario('1');
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        RETURN QUERY

			SELECT  Seguranca.Criptografar(u.id) AS "id",
                    u.nome,
                    u.cpf,
                    u.matricula,
                    Seguranca.Criptografar(u.idGrupo) AS "idGrupo",
                    u.email,
                    u.senha
            FROM seguranca.usuario u
            WHERE u.id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'inserirUsuario');
CREATE OR REPLACE FUNCTION seguranca.inserirUsuario(
    pNome seguranca.usuario.nome%TYPE,
    pCpf seguranca.usuario.cpf%TYPE,
    pMatricula seguranca.usuario.matricula%TYPE,
    pIdGrupo VARCHAR,
    pEmail seguranca.usuario.email%TYPE,
    pSenha seguranca.usuario.senha%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: Inserir um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.inserirusuario("teste usuario 1", 12345678901, 1234, 1, "teste@usuario.com", "1234");
	*/

    DECLARE vIdGrupo INTEGER;

    BEGIN

        vIdGrupo := Seguranca.Descriptografar(pIdGrupo)::INTEGER;

        INSERT INTO seguranca.usuario (
            nome,
            cpf,
            matricula,
            idGrupo,
            email,
            senha
        )
        VALUES (
            pNome,
            pCpf,
            pMatricula,
            vIdGrupo,
            pEmail,
            pSenha
        );

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'alterarUsuario');
CREATE OR REPLACE FUNCTION seguranca.alterarusuario(
    pId VARCHAR,
    pNome seguranca.usuario.nome%TYPE,
    pCpf seguranca.usuario.cpf%TYPE,
    pMatricula seguranca.usuario.matricula%TYPE,
    pIdGrupo VARCHAR,
    pEmail seguranca.usuario.email%TYPE,
    pSenha seguranca.usuario.senha%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: Alterar um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.alterarUsuario(1, "teste usuario 1", 12345678901, 1234, 1, "teste@usuario.com", "1234");
	*/

    DECLARE vId INTEGER;
        vIdGrupo INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;
        vIdGrupo := Seguranca.Descriptografar(pIdGrupo)::INTEGER;

        UPDATE seguranca.usuario SET
            nome = pNome,
            cpf = pCpf,
            matricula = pMatricula,
            idGrupo = vIdGrupo,
            email = pEmail,
            senha = pSenha
        WHERE id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'deletarUsuario');
CREATE OR REPLACE FUNCTION seguranca.deletarUsuario(
    pId VARCHAR
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: deletar um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.deletarUsuario(1);
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        DELETE FROM seguranca.usuario WHERE id = vId;

    END;
$$
LANGUAGE plpgsql;