let fs = require('fs');
let dt = require('./mitUse');

let d = dt.datMit();

fs.appendFileSync(`mitUse_sm.js`, `var ALLDATA = [\n`);
d.forEach((line)=>{
    if(line.date<'06/01/2016'){
        fs.appendFileSync(`mitUse_sm.js`, `${JSON.stringify(line)},\n`);
        //fs.appendFileSync(`mitUse_sm.js`, `${`["` + line.join(`","`) + `"],`},\n`);
    }
});
fs.appendFileSync(`mitUse_sm.js`, `]\n`);



















// let d = dt.datAll();
// fs.appendFileSync(`datAll_sm.js`, `var ALLDATA = [\n`);
// d.forEach((line)=>{
//     if(line[1]<'06/01/2016'){
//         //console.log(`["` + line.join(`","`) + `"],`);
//         fs.appendFileSync(`datAll_sm.js`, `${`["` + line.join(`","`) + `"],`},\n`);
//     }
// });
// fs.appendFileSync(`datAll_sm.js`, `]\n`);
// fs.readFile('CRNH0203-2016-RI_Kingston_1_NW.txt', 'utf8', function (err,data) {
//     let dat = data.split(/\r?\n/);
//     //let headers = dat[0].split('\t');
//     // fs.unlink(`temps.js`);
//     // fs.appendFileSync(`temps.js`, `var MITDATA = [\n`);
//     dat = dat.map(o => {
//         let ret = {hr: '', date: '', temp: 0};
//         //let line = o.split('\t');
//         ret.date = o.substr(7, 8);
//         console.log(o.substr(67, 8));
//         //ret.hr = line[2];
//         //ret.temp = line[2];
//         return ret;
//     });
//
//     // dat.forEach((line)=>{
//     //     fs.appendFileSync(`temps.js`, `${JSON.stringify(line)},\n`);
//     // });
//     //
//     // fs.appendFileSync(`temps.js`, `]\n`);
//     console.log('Done!');
// });