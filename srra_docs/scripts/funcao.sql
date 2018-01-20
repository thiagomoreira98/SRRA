SELECT seguranca.excluirFuncao('public', 'selecionarFuncao');
CREATE OR REPLACE FUNCTION public.selecionarFuncao()

    RETURNS TABLE(
        id public.funcao.id%TYPE,
        nome public.funcao.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcao.sql
		Objetivo..........: Selecionar Funções
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.selecionarFuncao();
	*/

    BEGIN

        RETURN QUERY
            SELECT * FROM public.funcao;

    END;
$$
LANGUAGE plpgsql;