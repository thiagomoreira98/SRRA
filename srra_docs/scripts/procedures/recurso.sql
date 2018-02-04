SELECT seguranca.excluirFuncao('public', 'selecionarRecurso');
CREATE OR REPLACE FUNCTION public.selecionarRecurso(
    pNome public.recurso.nome%TYPE,
    pCodigoPatrimonio public.recurso.codigoPatrimonio%TYPE,
    pIdStatusRecurso public.recurso.idStatusRecurso%TYPE,
    pIdTipoRecurso public.recurso.idTipoRecurso%TYPE,
    pPagina INTEGER,
    pQuantidade INTEGER
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
			SELECT * FROM public.selecionarRecurso(null, null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;

    BEGIN

        vRegistros := json_agg(regs) FROM (
            SELECT  r.id,
                    r.codigoPatrimonio AS "codigoPatrimonio",
                    r.nome,
                    tr.nome AS "tipo",
                    sr.nome AS "status"
            FROM public.recurso r
                INNER JOIN public.statusRecurso sr
                    ON r.idStatusRecurso = sr.id
                INNER JOIN public.tipoRecurso tr
                    ON r.idTipoRecurso = tr.id
            WHERE (pNome IS NULL OR r.nome ILIKE '%' || pNome || '%')
                AND (pCodigoPatrimonio IS NULL OR r.codigoPatrimonio = pCodigoPatrimonio)
		AND (pIdTipoRecurso IS NULL OR tr.id = pIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR sr.id = pIdStatusRecurso)
            
            ORDER BY r.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM public.recurso r
                INNER JOIN public.statusRecurso sr
                    ON r.idStatusRecurso = sr.id
                INNER JOIN public.tipoRecurso tr
                    ON r.idTipoRecurso = tr.id
            WHERE (pNome IS NULL OR r.nome ILIKE '%' || pNome || '%')
                AND (pCodigoPatrimonio IS NULL OR r.codigoPatrimonio = pCodigoPatrimonio)
		AND (pIdTipoRecurso IS NULL OR tr.id = pIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR sr.id = pIdStatusRecurso)
		);

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'buscarRecurso');
CREATE OR REPLACE FUNCTION public.buscarRecurso(
    pId public.recurso.id%TYPE
)

    RETURNS TABLE(
        "id" public.recurso.id%TYPE,
        "codigoPatrimonio" public.recurso.codigoPatrimonio%TYPE,
        "nome" public.recurso.nome%TYPE,
        "descricao" public.recurso.descricao%TYPE,
        "status" public.recurso.idStatusRecurso%TYPE,
        "tipo" public.recurso.idTipoRecurso%TYPE,
        "dataMotivo" public.recurso.dataMotivo%TYPE,
        "motivo" public.recurso.motivo%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Buscar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.buscarRecurso('1');
	*/

    BEGIN

        RETURN QUERY

			SELECT  r.id,
                    r.codigoPatrimonio,
                    r.nome,
                    r.descricao,
                    r.idStatusRecurso,
                    r.idTipoRecurso,
                    r.dataMotivo,
                    r.motivo
            FROM public.recurso r
            WHERE r.id = pId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'inserirRecurso');
CREATE OR REPLACE FUNCTION public.inserirRecurso(
    pCodigoPatrimonio public.recurso.codigoPatrimonio%TYPE,
    pNome public.recurso.nome%TYPE,
    pDescricao public.recurso.descricao%TYPE,
    pIdStatusRecurso public.recurso.idStatusRecurso%TYPE,
    pIdTipoRecurso public.recurso.idTipoRecurso%TYPE,
    pMotivo public.recurso.motivo%TYPE,
    pDataMotivo public.recurso.dataMotivo%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Inserir um recurso
		Autor.............: Thiago Moreira
		Data..............: 07/01/2018
		Ex................: 
			SELECT * FROM public.inserirRecurso(1, "recurso 1", "não contem extras", 1, 2, null, null);
	*/

    BEGIN

        INSERT INTO public.recurso (
            codigoPatrimonio,
            nome,
            descricao,
            idStatusRecurso,
            idTipoRecurso,
            motivo,
            dataMotivo
        )
        VALUES (
            pCodigoPatrimonio,
            pNome,
            pDescricao,
            pIdStatusRecurso,
            pIdTipoRecurso,
            pMotivo,
            pDataMotivo
        );

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'alterarRecurso');
CREATE OR REPLACE FUNCTION public.alterarRecurso(
    pId public.recurso.id%TYPE,
    pCodigoPatrimonio public.recurso.codigoPatrimonio%TYPE,
    pNome public.recurso.nome%TYPE,
    pDescricao public.recurso.descricao%TYPE,
    pIdStatusRecurso public.recurso.idStatusRecurso%TYPE,
    pIdTipoRecurso public.recurso.idTipoRecurso%TYPE,
    pMotivo public.recurso.motivo%TYPE,
    pDataMotivo public.recurso.dataMotivo%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Alterar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.alterarRecurso(1, "recurso alterar 1", "sofreu alteração", 1, 2, null, null);
	*/

    BEGIN

        UPDATE public.recurso SET
            codigoPatrimonio = pCodigoPatrimonio,
            nome = pNome,
            descricao = pDescricao,
            idStatusRecurso = pIdStatusRecurso,
            idTipoRecurso = pIdTipoRecurso,
            motivo = pMotivo,
            dataMotivo = pDataMotivo
        WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'deletarRecurso');
CREATE OR REPLACE FUNCTION public.deletarRecurso(
    pId public.recurso.id%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: deletar um recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.deletarRecurso('1');
	*/

    BEGIN

        DELETE FROM public.recurso WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------