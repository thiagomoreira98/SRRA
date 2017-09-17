const fs = require('fs');

module.exports = init;

    /*init('default path', ['filter']);*/
    init('./src/core', ['Route.js']); // Encontra todos routes.js dentro de 'core'


function init(defaultPaths, filters) {
    let listFiles = [];
    filters = filters || [];
    execute(defaultPaths, '', listFiles, filters)
    return listFiles;
}

async function execute(path, name, list, find) {
    if (fs.lstatSync(`${path}${name ? '/' : ''}${name}`).isDirectory()) {
        let files = fs.readdirSync(`${path}${name ? '/' : ''}${name}`);

        for (let i = 0; i < files.length; i++) {
            execute(`${path}/${name}`, files[i], list, find);
        }
        return;
    }

    find.map(x => {
        if (name.indexOf(x) != -1) {
            list.push({
                filter: x,
                route: `${path}/${name}`,
                filename: name
            });
        }
    })
}