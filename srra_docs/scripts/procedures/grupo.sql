SELECT seguranca.excluirFuncao('seguranca', 'selecionarGrupo');
CREATE OR REPLACE FUNCTION seguranca.selecionarGrupo(
    pNome seguranca.grupo.nome%TYPE,
    pPagina INTEGER,
    pQuantidade INTEGER
)

    RETURNS TABLE(
        "registros" JSON,
        "totalRegistros" INTEGER
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: Selecionar grupos
		Autor.............: Thiago Moreira
		Data..............: 05/01/2018
		Ex................: 
			SELECT * FROM seguranca.selecionarGrupo(null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;

    BEGIN

        vRegistros := json_agg(regs) FROM (
            SELECT  Seguranca.Criptografar(g.id) AS "id",
                    g.nome
            FROM seguranca.grupo g
            WHERE (pNome IS NULL OR g.nome ILIKE '%' || pNome || '%')
            
            ORDER BY g.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM seguranca.grupo g
            WHERE (pNome IS NULL OR g.nome ILIKE '%' || pNome || '%')
		);

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'buscarGrupo');
CREATE OR REPLACE FUNCTION seguranca.buscarGrupo(
    pId VARCHAR
)

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.grupo.nome%TYPE,
        "funcionalidades" JSON
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: Buscar um grupo
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.buscarGrupo('-3P-k8oib1k');
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        RETURN QUERY

		SELECT  Seguranca.Criptografar(g.id) AS "id",
                g.nome,
                (
                    SELECT json_agg(func) FROM (
                        SELECT seguranca.criptografar(f.id) AS "id",
                            f.nome
                        FROM seguranca.funcionalidade f
                            INNER JOIN seguranca.grupoFuncionalidade gf
                                ON gf.idFuncionalidade = f.id
                        WHERE gf.idGrupo = vId
                    ) func
                ) AS "funcionalidades"
		FROM seguranca.grupo g
		WHERE g.id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'inserirGrupo');
CREATE OR REPLACE FUNCTION seguranca.inserirGrupo(
    pNome seguranca.usuario.nome%TYPE,
    pFuncionalidades JSON
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: Inserir um grupo
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.inserirGrupo("teste grupo 1", '[]');
	*/

    DECLARE 
        vId INTEGER;

    BEGIN

        INSERT INTO seguranca.grupo (
            nome
        )
        VALUES (
            pNome
        )

        RETURNING id INTO vId;

        INSERT INTO seguranca.grupoFuncionalidade (idGrupo, idFuncionalidade)
            SELECT vId,
            seguranca.descriptografar("id")::INTEGER
            FROM json_to_recordset(pFuncionalidades) AS funcionalidades_json(
                "id" VARCHAR
            );

        INSERT INTO seguranca.opcaoMenuGrupo (idGrupo, idOpcaoMenu)
            SELECT vId,
                (SELECT id FROM seguranca.opcaoMenu WHERE nome ILIKE json.nome)
            FROM json_to_recordset(pFuncionalidades) AS json(
                "nome" VARCHAR
            );

	END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'alterarGrupo');
CREATE OR REPLACE FUNCTION seguranca.alterarGrupo(
    pId VARCHAR,
    pNome seguranca.usuario.nome%TYPE,
    pFuncionalidades JSON
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: usuario.sql
		Objetivo..........: Alterar um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.alterarGrupo(1, 'Administrador',
                '[
                    { "nome": "Grupo", "id": "c20BGwjVIvs" },
                    { "nome": "Usuario", "id": "sYv0-m8i8u8" }
                ]'
			);
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        UPDATE seguranca.grupo SET
            nome = pNome
        WHERE id = vId;

        DELETE FROM seguranca.grupoFuncionalidade gf WHERE gf.idGrupo = vId;
        DELETE FROM seguranca.opcaoMenuGrupo og WHERE og.idGrupo = vId;

        INSERT INTO seguranca.grupoFuncionalidade (idGrupo, idFuncionalidade)
            SELECT vId,
                seguranca.descriptografar(func_json.id)::INTEGER
            FROM json_to_recordset(pFuncionalidades) AS func_json(
                "id" VARCHAR
            );

        INSERT INTO seguranca.opcaoMenuGrupo (idGrupo, idOpcaoMenu)
            SELECT vId,
                (SELECT id FROM seguranca.opcaoMenu WHERE nome ILIKE json.nome)
            FROM json_to_recordset(pFuncionalidades) AS json(
                "nome" VARCHAR
            );

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'deletarGrupo');
CREATE OR REPLACE FUNCTION seguranca.deletarGrupo(
    pId VARCHAR
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: deletar um grupo
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.deletarGrupo(1);
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        DELETE FROM seguranca.grupoFuncionalidade gf WHERE gf.idGrupo = vId;
        DELETE FROM seguranca.opcaoMenuGrupo og WHERE og.idGrupo = vId;
        DELETE FROM seguranca.grupo WHERE id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'selecionarGrupoDropdown');
CREATE OR REPLACE FUNCTION seguranca.selecionarGrupoDropdown()

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.grupo.nome%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: Selecionar grupos dropdown
		Autor.............: Thiago Moreira
		Data..............: 05/01/2018
		Ex................: 
			SELECT * FROM seguranca.selecionarGrupoDropdown();
	*/

    BEGIN

        RETURN QUERY
			SELECT  Seguranca.Criptografar(g.id) AS "id",
                    g.nome
            FROM seguranca.grupo g;

    END;
$$
LANGUAGE plpgsql;