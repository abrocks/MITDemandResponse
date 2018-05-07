let fs = require('fs');

fs.readFile('2016hourly.txt', 'utf8', function (err,data) {
   let dat = data.split(/\r?\n/);
   //let headers = dat[0].split('\t');
   fs.unlink(`temps.js`);
   fs.appendFileSync(`temps.js`, `var HourlyData = [\n`);
   dat = dat.map(o => {
       let ret = {date: '', hr: '', temp: 0};
       let line = o.split('\s+');
       ret.date = o.substr(6, 8);
       ret.hr = o.substr(15, 4);
       ret.temp = parseFloat(o.substr(67, 6));       
       ret.temp = ret.temp * 9 / 5 + 32;
       ret.temp = Number(ret.temp.toFixed(1));
       console.log(ret.temp);
       return ret;
   });

   dat.forEach((line)=>{
       fs.appendFileSync(`temps.js`, `${JSON.stringify(line)},\n`);
   });

   fs.appendFileSync(`temps.js`, `]\n`);
   console.log('Done!');
});

