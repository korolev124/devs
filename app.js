const fs = require('fs');

var result = {};
var depots = {};
var devblogs = JSON.parse(fs.readFileSync(__dirname + '/result.json', 'utf-8'));

const getDepot = (depotId) => {
    depots[depotId] = JSON.parse(fs.readFileSync(__dirname + '/' + depotId + '.json', 'utf-8'));
};

const depotsList = [252494, 252495, 258551, 258554];

depotsList.forEach(d => getDepot(d));

devblogs.forEach(item => {
    depotsList.forEach(d => {
        depots[d].forEach(i => {
            let _ = item.date + ' (' +  item.devblog + ')';

            if(!result[_]) result[_] = {};

            if(i.branch == 'release' || i.branch == 'public') {
                if(i.date.startsWith(item.date)) {
                    result[_][d] = i.manifestId;
                }
            }
        });
    });
});

fs.writeFileSync(__dirname + '/output.json', JSON.stringify(result), 'utf-8');