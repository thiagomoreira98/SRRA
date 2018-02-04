SELECT seguranca.excluirFuncao('seguranca', 'buscarDadosUsuario');
CREATE OR REPLACE FUNCTION seguranca.buscarDadosUsuario(
    pEmail seguranca.usuario.email%TYPE
)

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.usuario.nome%TYPE,
        "idGrupo" VARCHAR
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: auth.sql
		Objetivo..........: Buscar um usuario
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.buscarDadosUsuario('1');
	*/

    BEGIN

        RETURN QUERY

			SELECT  Seguranca.Criptografar(u.id) AS "id",
                    u.nome,
                    Seguranca.Criptografar(u.idGrupo) AS "grupo"
            FROM seguranca.usuario u
            WHERE u.email LIKE pEmail;

    END;
$$
LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------
SELECT seguranca.excluirFuncao('seguranca', 'fazerLogin');
CREATE OR REPLACE FUNCTION seguranca.fazerLogin(
    pId VARCHAR,
    pSenha seguranca.usuario.senha%TYPE
)

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.usuario.nome%TYPE,
        "funcao" VARCHAR
    )AS $$

    /*
		Documentação
		Arquivo Fonte.....: auth.sql
		Objetivo..........: efetuar login
		Autor.............: Thiago Moreira
		Data..............: 06/01/2018
		Ex................: 
			SELECT * FROM seguranca.fazerLogin('1');
	*/

    DECLARE vId INTEGER;

    BEGIN

        vId := Seguranca.Descriptografar(pId)::INTEGER;

        RETURN QUERY

			SELECT  Seguranca.Criptografar(u.id) AS "id",
                    u.nome,
                    Seguranca.Criptografar(u.idGrupo) AS "idGrupo"
            FROM seguranca.usuario u
            WHERE u.id = vId AND u.senha LIKE pSenha;

    END;
$$
LANGUAGE plpgsql;