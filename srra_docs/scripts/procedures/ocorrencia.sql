SELECT seguranca.excluirFuncao('principal', 'selecionarOcorrencia');
CREATE OR REPLACE FUNCTION principal.selecionarOcorrencia(
    pIdRecurso VARCHAR,
    pIdUsuario VARCHAR,
    pIdStatus VARCHAR,
    pDataInicio principal.ocorrencia.data%TYPE,
    pDataFim principal.ocorrencia.data%TYPE,
    pPagina INTEGER,
    pQuantidade INTEGER
)

    RETURNS TABLE(
        "registros" JSON,
        "totalRegistros" INTEGER
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Selecionar ocorrencias
		Autor.............: Thiago Moreira
		Data..............: 08/04/2018
		Ex................: 
			SELECT * FROM principal.selecionarOcorrencia(null, null, null, null, null, '1', '10');
	*/

    DECLARE vIdRecurso INTEGER;
        vIdUsuario INTEGER;
        vIdStatus INTEGER;
        vRegistros JSON;
		vTotalRegistros INTEGER;

    BEGIN

        vIdRecurso := seguranca.descriptografar(pIdRecurso)::INTEGER;
        vIdUsuario := seguranca.descriptografar(pIdUsuario)::INTEGER;
        vIdStatusOcorrencia := seguranca.descriptografar(pIdStatusOcorrencia)::INTEGER;

        vRegistros := json_agg(regs) FROM (
            SELECT  o.id,
                    so.nome as "status",
                    o.data,
                    r.nome AS "recurso"
            FROM principal.ocorrencia o
                INNER JOIN principal.recurso r
                    ON o.idRecurso = r.id
                INNER JOIN principal.statusOcorrencia so
                    ON o.idStatusOcorrencia = so.id
            WHERE (pIdRecurso IS NULL OR o.idRecurso = vIdRecurso)
                AND (pIdUsuario IS NULL OR o.idUsuario = vIdUsuario)
		        AND (pDataInicio IS NULL OR o.data >= pDataInicio)
                AND (pDataFim IS NULL OR o.data <= pDataFim)
            
            ORDER BY o.data
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM principal.ocorrencia o
                INNER JOIN principal.recurso r
                    ON o.idRecurso = r.id
                INNER JOIN principal.statusOcorrencia so
                    ON o.idStatusOcorrencia = so.id
            WHERE (pIdRecurso IS NULL OR o.idRecurso = vIdRecurso)
                AND (pIdUsuario IS NULL OR o.idUsuario = vIdUsuario)
		        AND (pDataInicio IS NULL OR o.data >= pDataInicio)
                AND (pDataFim IS NULL OR o.data <= pDataFim)
		);

        RETURN QUERY
			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'buscarOcorrencia');
CREATE OR REPLACE FUNCTION principal.buscarOcorrencia(
    pId principal.ocorrencia.id%TYPE
)

    RETURNS TABLE(
        "id" principal.ocorrencia.id%TYPE,
        "recurso" principal.ocorrencia.idRecurso%TYPE,
        "usuario" principal.ocorrencia.idUsuario%TYPE,
        "detalhes" principal.ocorrencia.detalhes%TYPE,
        "data" principal.ocorrencia.data%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Buscar uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM principal.buscarOcorrencia('1');
	*/

    BEGIN

        RETURN QUERY

			SELECT  o.id,
                    o.idRecurso,
                    o.idUsuario,
                    o.detalhes,
                    o.data
            FROM principal.ocorrencia o
            WHERE o.id = pId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'inserirOcorrencia');
CREATE OR REPLACE FUNCTION principal.inserirOcorrencia(
    pIdRecurso principal.ocorrencia.idRecurso%TYPE,
    pidUsuario principal.ocorrencia.idUsuario%TYPE,
    pDetalhes principal.ocorrencia.detalhes%TYPE,
    pData principal.ocorrencia.data%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Inserir uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM principal.inserirOcorrencia(1, 1, "alguma ocorrencia", "2018-01-15");
	*/

    BEGIN

        INSERT INTO principal.ocorrencia (
            idRecurso,
            idUsuario,
            detalhes,
            data
        )
        VALUES (
            pIdRecurso,
            pidUsuario,
            pDetalhes,
            pData
        );

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('principal', 'alterarOcorrencia');
CREATE OR REPLACE FUNCTION principal.alterarOcorrencia(
    pId principal.ocorrencia.id%TYPE,
    pIdRecurso principal.ocorrencia.idRecurso%TYPE,
    pidUsuario principal.ocorrencia.idUsuario%TYPE,
    pDetalhes principal.ocorrencia.detalhes%TYPE,
    pData principal.ocorrencia.data%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Alterar uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM principal.alterarRecurso(1, 1, 1, "alguma alteração de ocorrencia", "2018-01-15");
	*/

    BEGIN

        UPDATE principal.ocorrencia SET
            idRecurso = pIdRecurso,
            idUsuario = pidUsuario,
            detalhes = pDetalhes,
            data = pData
        WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------

SELECT seguranca.excluirFuncao('principal', 'selecionarStatusOcorrencia');
CREATE OR REPLACE FUNCTION principal.selecionarStatusOcorrencia()

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" principal.statusOcorrencia.nome%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Selecionar status das ocorrencias
		Autor.............: Thiago Moreira
		Data..............: 11/04/2018
		Ex................:
			SELECT * FROM principal.selecionarStatusOcorrencia();
	*/

    BEGIN

        RETURN QUERY
            SELECT seguranca.criptografar(s.id) as "id",
                    s.nome
            FROM principal.statusOcorrencia as s;

    END;
$$
LANGUAGE plpgsql;