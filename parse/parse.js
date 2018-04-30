let fs = require('fs');

fs.readFile('chw_stm_kw_CY2016_3.txt', 'utf8', function (err,data) {
    let dat = data.split(/\r?\n/);
    let headers = dat[0].split('\t');
    fs.unlink(`mitUse.js`);
    fs.appendFileSync(`mitUse.js`, `var MITDATA = [\n`);
    dat = dat.map(o => {
        let ret = {usage: 0, date: ''};
        let line = o.split('\t');
        ret.usage = parseFloat(line[3]);
        ret.date = line[1];
        ret.time = line[2];
        return ret;
    });

    dat.forEach((line)=>{
        fs.appendFileSync(`mitUse.js`, `${JSON.stringify(line)},\n`);
    });

    fs.appendFileSync(`mitUse.js`, `]\n`);
    console.log('Done!');
});