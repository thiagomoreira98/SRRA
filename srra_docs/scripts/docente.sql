SELECT seguranca.excluirFuncao('public', 'selecionarDocente');
CREATE OR REPLACE FUNCTION public.selecionarDocente(
    pNome public.docente.nome%TYPE,
    pMatricula public.docente.matricula%TYPE,
    pCpf public.docente.cpf%TYPE,
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
		Arquivo Fonte.....: docente.sql
		Objetivo..........: Selecionar Docentes
		Autor.............: Thiago Moreira
		Data..............: 05/01/2018
		Ex................: 
			SELECT * FROM public.selecionarDocente(null, null, null, '1', '10');
	*/

    DECLARE vRegistros JSON;
		vTotalRegistros INTEGER;
        vPaginas REAL;

    BEGIN

        vRegistros := json_agg(regs) FROM (
            SELECT  d.id,
                    d.nome,
                    d.matricula,
                    d.cpf,
                    f.nome AS "funcao"
            FROM public.docente d
                INNER JOIN public.funcao f
                    ON d."idFuncao" = f.id
            WHERE (pNome IS NULL OR d.nome ILIKE '%' || pNome || '%')
				AND (pMatricula IS NULL OR d.matricula = pMatricula)
                AND (pCpf IS NULL OR d.cpf = pCpf)
            
            ORDER BY d.nome
            LIMIT pQuantidade OFFSET ((pPagina - 1) * pQuantidade)
        ) regs;

        vTotalRegistros := (
			SELECT COUNT(*) 
			FROM public.docente AS d
                INNER JOIN public.funcao AS f
                    ON d."idFuncao" = f.id
            WHERE (pNome IS NULL OR d.nome ILIKE '%' || pNome || '%')
				AND (pMatricula IS NULL OR d.matricula = pMatricula)
                AND (pCpf IS NULL OR d.cpf = pCpf)
		);

        vPaginas := vTotalRegistros / pQuantidade;

        RETURN QUERY

			SELECT vRegistros AS registros,
				vTotalRegistros AS totalRegistros,
                vPaginas AS paginas;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'buscarDocente');
CREATE OR REPLACE FUNCTION public.buscarDocente(
    pId public.docente.id%TYPE
)

    RETURNS TABLE(
        "id" public.docente.id%TYPE,
        "nome" public.docente.nome%TYPE,
        "cpf" public.docente.cpf%TYPE,
        "matricula" public.docente.matricula%TYPE,
        "funcao" public.docente."idFuncao"%TYPE,
        "email" public.docente.email%TYPE,
        "senha" public.docente.senha%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: docente.sql
		Objetivo..........: Buscar um docente
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.buscarDocente('1');
	*/

    BEGIN

        RETURN QUERY

			SELECT  d.id,
                    d.nome,
                    d.cpf,
                    d.matricula,
                    d."idFuncao" AS "funcao",
                    d.email,
                    d.senha
            FROM public.docente d
            WHERE d.id = pId;

    END;
$$
LANGUAGE plpgsql;

-----------------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('public', 'inserirDocente');
CREATE OR REPLACE FUNCTION public.inserirDocente(
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
		Objetivo..........: Inserir um docente
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.inserirDocente("teste docente 1", 12345678901, 1234, 1, "teste@docente.com", "1234");
	*/

    BEGIN

        INSERT INTO public.docente (
            nome,
            cpf,
            matricula,
            "idFuncao",
            email,
            senha
        )
        VALUES (
            pNome,
            pCpf,
            pMatricula,
            pIdFuncao,
            pEmail,
            pSenha
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