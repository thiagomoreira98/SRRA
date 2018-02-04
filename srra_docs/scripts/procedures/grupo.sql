SELECT seguranca.excluirFuncao('seguranca', 'selecionarGrupo');
CREATE OR REPLACE FUNCTION seguranca.selecionarGrupo()

    RETURNS TABLE(
        id VARCHAR,
        nome seguranca.grupo.nome%TYPE
    ) AS $$

    /*
		Documentação
		Arquivo Fonte.....: grupo.sql
		Objetivo..........: Selecionar Funções
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.selecionarGrupo();
	*/

    BEGIN

        RETURN QUERY
            SELECT  Seguranca.Criptografar(g.id) AS "id",
                    g.nome
            FROM seguranca.grupo g;

    END;
$$
LANGUAGE plpgsql;