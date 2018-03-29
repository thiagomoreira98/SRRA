SELECT seguranca.excluirFuncao('principal', 'selecionarRecurso');
CREATE OR REPLACE FUNCTION principal.selecionarRecurso(
    pNome principal.recurso.nome%TYPE,
    pCodigoPatrimonio principal.recurso.codigoPatrimonio%TYPE,
    pIdStatusRecurso VARCHAR,
    pIdTipoRecurso VARCHAR,
    pPagina SMALLINT,
    pQuantidade SMALLINT
)

    RETURNS TABLE(
        "registros" JSON,
        "totalRegistros" INTEGER
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Selecionar recursos
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.selecionarRecurso(null, null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;
        vIdStatusRecurso INTEGER;
        vIdTipoRecurso INTEGER;

    BEGIN

        vIdStatusRecurso := seguranca.descriptografar(pIdStatusRecurso)::INTEGER;
        vIdTipoRecurso := seguranca.descriptografar(pIdTipoRecurso)::INTEGER;

        vRegistros := json_agg(regs) FROM (
            SELECT  seguranca.criptografar(r.id) as "id",
                    r.nome,
                    tr.nome AS "tipo",
                    sr.nome AS "status"
            FROM principal.recurso r
                INNER JOIN principal.statusRecurso sr
                    ON r.idStatusRecurso = sr.id
                INNER JOIN principal.tipoRecurso tr
                    ON r.idTipoRecurso = tr.id
            WHERE (pNome IS NULL OR r.nome ILIKE '%' || pNome || '%')
                AND (pCodigoPatrimonio IS NULL OR r.codigoPatrimonio = pCodigoPatrimonio)
		AND (pIdTipoRecurso IS NULL OR tr.id = vIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR sr.id = vIdStatusRecurso)
            
            ORDER BY r.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM principal.recurso r
                INNER JOIN principal.statusRecurso sr
                    ON r.idStatusRecurso = sr.id
                INNER JOIN principal.tipoRecurso tr
                    ON r.idTipoRecurso = tr.id
            WHERE (pNome IS NULL OR r.nome ILIKE '%' || pNome || '%')
                AND (pCodigoPatrimonio IS NULL OR r.codigoPatrimonio = pCodigoPatrimonio)
		AND (pIdTipoRecurso IS NULL OR tr.id = vIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR sr.id = vIdStatusRecurso)
		);

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'buscarRecurso');
CREATE OR REPLACE FUNCTION principal.buscarRecurso(
    pId VARCHAR
)

    RETURNS TABLE(
        "id" VARCHAR,
        "codigoPatrimonio" principal.recurso.codigoPatrimonio%TYPE,
        "nome" principal.recurso.nome%TYPE,
        "descricao" principal.recurso.descricao%TYPE,
        "idStatus" VARCHAR,
        "idTipo" VARCHAR,
        "dataMotivo" principal.recurso.dataMotivo%TYPE,
        "motivo" principal.recurso.motivo%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Buscar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.buscarRecurso('1');
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := seguranca.descriptografar(pId)::INTEGER;

        RETURN QUERY

			SELECT  seguranca.criptografar(r.id) as "id",
                    r.codigoPatrimonio as "codigoPatrimonio",
                    r.nome,
                    r.descricao,
                    seguranca.criptografar(r.idStatusRecurso) as "idStatus",
                    seguranca.criptografar(r.idTipoRecurso) as "idTipo",
                    r.dataMotivo as "dataMotivo",
                    r.motivo
            FROM principal.recurso r
            WHERE r.id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'inserirRecurso');
CREATE OR REPLACE FUNCTION principal.inserirRecurso(
    pCodigoPatrimonio principal.recurso.codigoPatrimonio%TYPE,
    pNome principal.recurso.nome%TYPE,
    pDescricao principal.recurso.descricao%TYPE,
    pIdStatusRecurso VARCHAR,
    pIdTipoRecurso VARCHAR,
    pMotivo principal.recurso.motivo%TYPE,
    pDataMotivo principal.recurso.dataMotivo%TYPE,
    pIdUsuarioCadastro VARCHAR,
    pDataCadastro TIMESTAMP WITHOUT TIME ZONE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Inserir um recurso
		Autor.............: Thiago Moreira
		Data..............: 07/01/2018
		Ex................: 
			SELECT * FROM principal.inserirRecurso(1, "recurso 1", "não contem extras", 1, 2, null, null);
	*/
    DECLARE vIdStatusRecurso INTEGER;
        vIdTipoRecurso INTEGER;
        vIdUsuarioCadastro INTEGER;

    BEGIN

        vIdStatusRecurso := seguranca.descriptografar(pIdStatusRecurso)::INTEGER;
        vIdTipoRecurso := seguranca.descriptografar(pIdTipoRecurso)::INTEGER;
        vIdUsuarioCadastro := seguranca.descriptografar(pIdUsuarioCadastro)::INTEGER;

        INSERT INTO principal.recurso (
            codigoPatrimonio,
            nome,
            descricao,
            idStatusRecurso,
            idTipoRecurso,
            motivo,
            dataMotivo,
            idUsuarioCadastro,
            dataCadastro
        )
        VALUES (
            pCodigoPatrimonio,
            pNome,
            pDescricao,
            vIdStatusRecurso,
            vIdTipoRecurso,
            pMotivo,
            pDataMotivo,
            vIdUsuarioCadastro,
            pDataCadastro
        );

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'alterarRecurso');
CREATE OR REPLACE FUNCTION principal.alterarRecurso(
    pId VARCHAR,
    pCodigoPatrimonio principal.recurso.codigoPatrimonio%TYPE,
    pNome principal.recurso.nome%TYPE,
    pDescricao principal.recurso.descricao%TYPE,
    pIdStatusRecurso VARCHAR,
    pIdTipoRecurso VARCHAR,
    pMotivo principal.recurso.motivo%TYPE,
    pDataMotivo principal.recurso.dataMotivo%TYPE,
    pIdUsuarioAlteracao VARCHAR,
    pDataAlteracao TIMESTAMP WITHOUT TIME ZONE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Alterar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.alterarRecurso(1, "recurso alterar 1", "sofreu alteração", 1, 2, null, null);
	*/
    DECLARE vId INTEGER; 
        vIdStatusRecurso INTEGER;
        vIdTipoRecurso INTEGER;
        vIdUsuarioAlteracao INTEGER;

    BEGIN

        vId := seguranca.descriptografar(pId)::INTEGER;
        vIdStatusRecurso := seguranca.descriptografar(pIdStatusRecurso)::INTEGER;
        vIdTipoRecurso := seguranca.descriptografar(pIdTipoRecurso)::INTEGER;
        vIdUsuarioAlteracao := seguranca.descriptografar(pIdUsuarioAlteracao)::INTEGER;

        UPDATE principal.recurso SET
            codigoPatrimonio = pCodigoPatrimonio,
            nome = pNome,
            descricao = pDescricao,
            idStatusRecurso = vIdStatusRecurso,
            idTipoRecurso = vIdTipoRecurso,
            motivo = pMotivo,
            dataMotivo = pDataMotivo,
            idUsuarioAlteracao = vIdUsuarioAlteracao,
            dataAlteracao = pDataAlteracao
        WHERE id = vId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'deletarRecurso');
CREATE OR REPLACE FUNCTION principal.deletarRecurso(
    pId VARCHAR
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: deletar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.deletarRecurso('1');
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := seguranca.descriptografar(pId)::INTEGER;
        DELETE FROM principal.recurso WHERE id = vId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'selecionarStatusRecurso');
CREATE OR REPLACE FUNCTION principal.selecionarStatusRecurso()

    RETURNS TABLE(
        id VARCHAR,
        nome principal.statusRecurso.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcao.sql
		Objetivo..........: Selecionar status dos recursos
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.selecionarStatusRecurso();
	*/

    BEGIN

        RETURN QUERY
            SELECT seguranca.criptografar(sr.id) as "id",
                    sr.nome 
            FROM principal.statusRecurso sr;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'selecionarTipoRecurso');
CREATE OR REPLACE FUNCTION principal.selecionarTipoRecurso()

    RETURNS TABLE(
        id VARCHAR,
        nome principal.tipoRecurso.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: tipoRecurso.sql
		Objetivo..........: Selecionar tipos de recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.selecionarTipoRecurso();
	*/

    BEGIN

        RETURN QUERY
            SELECT seguranca.criptografar(tr.id) as "id",
                    tr.nome
            FROM principal.tipoRecurso tr;

    END;
$$
LANGUAGE plpgsql;