SELECT seguranca.excluirFuncao('public', 'selecionarOcorrencia');
CREATE OR REPLACE FUNCTION public.selecionarOcorrencia(
    pIdRecurso public.ocorrencia.idRecurso%TYPE,
    pIdDocente public.ocorrencia.idDocente%TYPE,
    pDataInicio public.ocorrencia.data%TYPE,
    pDataFim public.ocorrencia.data%TYPE,
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
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM public.selecionarOcorrencia(null, null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;

    BEGIN

        vRegistros := json_agg(regs) FROM (
            SELECT  o.id,
                    r.nome AS "recurso",
                    d.nome AS "docente",
                    o.data,
                    o.detalhes
            FROM public.ocorrencia o
                INNER JOIN public.recurso r
                    ON o.idRecurso = r.id
                INNER JOIN public.docente d
                    ON o.idDocente = o.id
            WHERE (pIdRecurso IS NULL OR o.idRecurso = pIdRecurso)
                AND (pIdDocente IS NULL OR o.idDocente = pIdDocente)
		        AND (pDataInicio IS NULL OR o.data >= pDataInicio)
                AND (pDataFim IS NULL OR o.data <= pDataFim)
            
            ORDER BY o.data
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM public.ocorrencia o
                INNER JOIN public.recurso r
                    ON o.idRecurso = r.id
                INNER JOIN public.docente d
                    ON o.idDocente = o.id
            WHERE (pIdRecurso IS NULL OR o.idRecurso = pIdRecurso)
                AND (pIdDocente IS NULL OR o.idDocente = pIdDocente)
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
SELECT seguranca.excluirFuncao('public', 'buscarOcorrencia');
CREATE OR REPLACE FUNCTION public.buscarOcorrencia(
    pId public.ocorrencia.id%TYPE
)

    RETURNS TABLE(
        "id" public.ocorrencia.id%TYPE,
        "recurso" public.ocorrencia.idRecurso%TYPE,
        "docente" public.ocorrencia.idDocente%TYPE,
        "detalhes" public.ocorrencia.detalhes%TYPE,
        "data" public.ocorrencia.data%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Buscar uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM public.buscarOcorrencia('1');
	*/

    BEGIN

        RETURN QUERY

			SELECT  o.id,
                    o.idRecurso,
                    o.idDocente,
                    o.detalhes,
                    o.data
            FROM public.ocorrencia o
            WHERE o.id = pId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'inserirOcorrencia');
CREATE OR REPLACE FUNCTION public.inserirOcorrencia(
    pIdRecurso public.ocorrencia.idRecurso%TYPE,
    pIdDocente public.ocorrencia.idDocente%TYPE,
    pDetalhes public.ocorrencia.detalhes%TYPE,
    pData public.ocorrencia.data%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Inserir uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM public.inserirOcorrencia(1, 1, "alguma ocorrencia", "2018-01-15");
	*/

    BEGIN

        INSERT INTO public.ocorrencia (
            idRecurso,
            idDocente,
            detalhes,
            data
        )
        VALUES (
            pIdRecurso,
            pIdDocente,
            pDetalhes,
            pData
        );

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'alterarOcorrencia');
CREATE OR REPLACE FUNCTION public.alterarOcorrencia(
    pId public.ocorrencia.id%TYPE,
    pIdRecurso public.ocorrencia.idRecurso%TYPE,
    pIdDocente public.ocorrencia.idDocente%TYPE,
    pDetalhes public.ocorrencia.detalhes%TYPE,
    pData public.ocorrencia.data%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: Alterar uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 15/01/2018
		Ex................: 
			SELECT * FROM public.alterarRecurso(1, 1, 1, "alguma alteração de ocorrencia", "2018-01-15");
	*/

    BEGIN

        UPDATE public.ocorrencia SET
            idRecurso = pIdRecurso,
            idDcoente = pIdDocente,
            detalhes = pDetalhes,
            data = pData
        WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'deletarOcorrencia');
CREATE OR REPLACE FUNCTION public.deletarOcorrencia(
    pId public.ocorrencia.id%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: ocorrencia.sql
		Objetivo..........: deletar uma ocorrencia
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.deletarOcorrencia('1');
	*/

    BEGIN

        DELETE FROM public.ocorrencia WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------