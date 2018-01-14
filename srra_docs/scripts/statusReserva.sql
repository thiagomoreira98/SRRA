SELECT seguranca.excluirFuncao('public', 'selecionarStatusReserva');
CREATE OR REPLACE FUNCTION public.selecionarStatusReserva()

    RETURNS TABLE(
        id public.statusReserva.id%TYPE,
        nome public.statusReserva.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcao.sql
		Objetivo..........: Selecionar status das reservas
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM public.selecionarStatusReserva();
	*/

    BEGIN

        RETURN QUERY
            SELECT * FROM public.statusReserva;

    END;
$$
LANGUAGE plpgsql;