SELECT seguranca.excluirFuncao('public', 'selecionarTipoRecurso');
CREATE OR REPLACE FUNCTION public.selecionarTipoRecurso()

    RETURNS TABLE(
        id public.tipoRecurso.id%TYPE,
        nome public.tipoRecurso.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: tipoRecurso.sql
		Objetivo..........: Selecionar tipos de recurso
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.selecionarTipoRecurso();
	*/

    BEGIN

        RETURN QUERY
            SELECT * FROM public.tipoRecurso;

    END;
$$
LANGUAGE plpgsql;