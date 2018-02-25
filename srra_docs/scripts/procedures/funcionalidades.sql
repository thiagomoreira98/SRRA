SELECT seguranca.excluirFuncao('seguranca', 'selecionarFuncionalidade');
CREATE OR REPLACE FUNCTION seguranca.selecionarFuncionalidade()

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.funcionalidade.nome%TYPE
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: funcionalidade.sql
		Objetivo..........: Selecionar funcionalidades do sistema
		Autor.............: Thiago Moreira
		Data..............: 05/01/2018
		Ex................: 
			SELECT * FROM seguranca.selecionarFuncionalidade();
	*/

    BEGIN

        RETURN QUERY
			SELECT  Seguranca.Criptografar(f.id) AS "id",
                    f.nome
            FROM seguranca.funcionalidade f;

    END;
$$
LANGUAGE plpgsql;