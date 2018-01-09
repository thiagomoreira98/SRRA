SELECT seguranca.excluirFuncao('public', 'selecionarRecurso');
CREATE OR REPLACE FUNCTION public.selecionarRecurso(
    pNome public.recurso.nome%TYPE,
    pIdStatusRecurso public.recurso."idStatusRecurso"%TYPE,
    pIdTipoRecurso public.recurso."idTipoRecurso"%TYPE,
    pPagina SMALLINT,
    pQuantidade SMALLINT
)

    RETURNS TABLE(
        "registros" JSON,
        "totalRegistros" INTEGER,
        "paginas" REAL
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Selecionar recursos
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.selecionarRecurso(null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;
        vPaginas REAL;

    BEGIN

        vRegistros := json_agg(regs) FROM (
            SELECT  r.id,
                    r.nome,
                    s.nome,
                    tr.nome,
            FROM public.recurso r
                INNER JOIN public."statusRecurso" s
                    ON r."idStatusRecurso" = s.id
                INNER JOIN public."tipoRecurso" tr
                    ON r."idTipoRecurso" = tr.id
            WHERE (pNome IS NULL OR d.nome ILIKE '%' || pNome || '%')
				AND (pIdTipoRecurso IS NULL OR tr.id = pIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR s.id = pIdStatusRecurso)
            
            ORDER BY d.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
            FROM public.recurso r
                INNER JOIN public."statusRecurso" s
                    ON r."idStatusRecurso" = s.id
                INNER JOIN public."tipoRecurso" tr
                    ON r."idTipoRecurso" = tr.id
            WHERE (pNome IS NULL OR d.nome ILIKE '%' || pNome || '%')
				AND (pIdTipoRecurso IS NULL OR tr.id = pIdTipoRecurso)
                AND (pIdStatusRecurso IS NULL OR s.id = pIdStatusRecurso)
		);

        vPaginas := (vTotalRegistros / pQuantidade);

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros,
                vPaginas AS paginas;

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
        "nome" public.recurso.nome%TYPE,
        "descricao" public.recurso.descricao%TYPE,
        "statusRecurso" public.recurso."idStatusRecurso"%TYPE,
        "tipoRecurso" public.recurso."idTipoRecurso"%TYPE,
        "dataMotivo" public.recurso."dataMotivo"%TYPE,
        "motivo" public.recurso.motivo%TYPE,
        "itens" JSON
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
                    r.nome,
                    r.descricao,
                    r."idStatusRecurso" AS "statusRecurso",
                    r."idTipoRecurso" AS "tipoRecurso",
                    r.dataMotivo,
                    r.motivo,
                    -- r.itens
            FROM public.recurso r
            WHERE r.id = pId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'inserirRecurso');
CREATE OR REPLACE FUNCTION public.inserirRecurso(
    pNome public.recurso.nome%TYPE,
    pDescricao public.recurso.cpf%TYPE,
    pIdStatusRecurso public.recurso."idStatusRecurso"%TYPE,
    pIdTipoRecurso public.recurso."idTipoRecurso"%TYPE,
    pmotivo public.recurso.motivo%TYPE,
    pDataMotivo public.recurso."dataMotivo"%TYPE,
    pItens JSON
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: recurso.sql
		Objetivo..........: Inserir um recurso
		Autor.............: Thiago Moreira
		Data..............: 07/01/2018
		Ex................: 
			SELECT * FROM public.inserirRecurso("teste recurso 1", "descricao recurso 1", 1, 2, "algum motivo", "07/01/2018", "[{ "nome": "item 1", "ativo": true }, { "nome": "item 2", "ativo": true }]");
	*/

    DECLARE 
        vId INTEGER;

    BEGIN

        INSERT INTO public.docente (
            nome,
            descricao,
            "idStatusRecurso",
            "idTipoRecurso",
            motivo,
            "dataMotivo"
        )
        VALUES (
            pNome,
            pDescricao,
            pIdStatusRecurso,
            pIdTipoRecurso,
            pMotivo,
            pDataMotivo
        )

        RETURNING id INTO vId;

        INSERT INTO public.item (idRecurso, nome, ativo)
            SELECT
                vId,
                "nome",
                "ativo"
            FROM json_to_recordset(pItens)
            AS itens_json(
                "nome" VARCHAR,
                "ativo" BOOLEAN
            );

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'alterarDocente');
CREATE OR REPLACE FUNCTION public.alterarDocente(
    pId public.docente.id%TYPE,
    pNome public.docente.nome%TYPE,
    pCpf public.docente.cpf%TYPE,
    pMatricula public.docente.matricula%TYPE,
    pIdFuncao public.docente."idFuncao"%TYPE,
    pEmail public.docente.email%TYPE,
    pSenha public.docente.senha%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: docente.sql
		Objetivo..........: Alterar um docente
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.alterarDocente(1, "teste docente 1", 12345678901, 1234, 1, "teste@docente.com", "1234");
	*/

    BEGIN

        UPDATE public.docente SET
            nome = pNome,
            cpf = pCpf,
            matricula = pMatricula,
            "idFuncao" = pIdFuncao,
            email = pEmail,
            senha = pSenha
        WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'deletarDocente');
CREATE OR REPLACE FUNCTION public.deletarDocente(
    pId public.docente.id%TYPE
)

    RETURNS VOID AS $$

    /*
		Documentação
		Arquivo Fonte.....: docente.sql
		Objetivo..........: deletar um docente
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.deletarDocente(1);
	*/

    BEGIN

        DELETE FROM public.docente
        WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------