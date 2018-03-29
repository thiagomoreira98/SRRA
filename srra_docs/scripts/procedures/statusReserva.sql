SELECT seguranca.excluirFuncao('principal', 'selecionarStatusReserva');
CREATE OR REPLACE FUNCTION principal.selecionarStatusReserva()

    RETURNS TABLE(
        id principal.statusReserva.id%TYPE,
        nome principal.statusReserva.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcao.sql
		Objetivo..........: Selecionar status das reservas
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM principal.selecionarStatusReserva();
	*/

    BEGIN

        RETURN QUERY
            SELECT * FROM principal.statusReserva;

    END;
$$
LANGUAGE plpgsql;