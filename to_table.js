const fs = require('fs');

const _ = JSON.parse(fs.readFileSync(__dirname + '/output.json', 'utf-8'));
var r = {};

Object.entries(_).forEach(([date, depots]) => {
    let item_date = date.split(' (')[0];
    let item_devblog = date.split(' (')[1].substring(0, date.split(' (')[1].length - 1);

    Object.entries(depots).forEach(([depotId, manifest]) => {
        if(!r[depotId]) r[depotId] = "# " + depotId + "\n\n| Девблог | Дата | Манифест |\n| - | - | - |\n";
        r[depotId] += `| ${item_devblog} | ${item_date} | ${manifest} |\n`;
    });
});

Object.entries(r).forEach(([depotId, val]) => {
    fs.writeFileSync(depotId + '.md', val, 'utf-8');
});