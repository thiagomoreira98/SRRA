SELECT seguranca.excluirFuncao('public', 'selecionarStatusRecurso');
CREATE OR REPLACE FUNCTION public.selecionarStatusRecurso()

    RETURNS TABLE(
        id public."statusRecurso".id%TYPE,
        nome public."statusRecurso".nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcao.sql
		Objetivo..........: Selecionar status dos recursos
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.selecionarStatusRecurso();
	*/

    BEGIN

        RETURN QUERY
            SELECT * FROM public."statusRecurso";

    END;
$$
LANGUAGE plpgsql;