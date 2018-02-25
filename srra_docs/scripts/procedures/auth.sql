SELECT seguranca.excluirFuncao('seguranca', 'buscarDadosUsuario');
CREATE OR REPLACE FUNCTION seguranca.buscarDadosUsuario(
    pEmail seguranca.usuario.email%TYPE
)

    RETURNS TABLE(
        "id" VARCHAR,
        "nome" seguranca.usuario.nome%TYPE
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
                    u.nome
            FROM seguranca.usuario u
            WHERE u.email ILIKE pEmail;

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
        "usuario" JSON,
        "opcoesMenu" JSON,
        "funcionalidades" JSON
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

			SELECT  json_build_object(
                        'id', seguranca.criptografar(u.id),
                        'nome', u.nome,
                        'idGrupo', seguranca.criptografar(u.idGrupo)
                    ) as "usuario",
                    (
                        SELECT json_Agg(o) FROM (
                            SELECT seguranca.criptografar(o.id) AS "id",
                                    o.nome,
                                    o.url,
                                    o.idMae AS "idMae"
                            FROM seguranca.opcaoMenu as o
				                INNER JOIN seguranca.opcaoMenuGrupo as og
					                ON og.idopcaoMenu = o.id
                        ) o
                    ) as "opcoesMenu",
                    (
                        SELECT json_Agg(o) FROM (
                            SELECT seguranca.criptografar(f.id) AS "id",
                                    f.nome
                            FROM seguranca.funcionalidade as f
				                INNER JOIN seguranca.grupoFuncionalidade as gf
					                ON gf.idfuncionalidade = f.id
                        ) o
                    ) as "funcionalidades"
            FROM seguranca.usuario u
            WHERE u.id = vId AND u.senha ILIKE pSenha;

    END;
$$
LANGUAGE plpgsql;