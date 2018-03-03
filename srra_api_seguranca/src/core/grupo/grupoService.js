module.exports = {
    gerenciarFuncionalidades
}

function gerenciarFuncionalidades(funcionalidades) {
    for (let i = 0; i < funcionalidades.length; i++) {
        if (!funcionalidades[i].active) {
            funcionalidades.splice(i, 1);
            i--;
        }
    }
}