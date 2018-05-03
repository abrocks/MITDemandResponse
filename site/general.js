var CURRENTTIME = '2018-05-01 01:20';

MITDATA.sort(function (a, b) {
    return a.date - b.date || a.time - b.time;
});

$( function() {
    // Initialize date-pickers
    $( "#startDate" ).datepicker({dateFormat: "mm/dd/yy"});
    $( "#endDate" ).datepicker({dateFormat: "mm/dd/yy"});
} );

// Map data to object array
    var ENERGYDAT = ALLDATA.map(t=>{
        var v = {
            date: t[1],
            hourEnding: t[2],
            locationID: t[3],
            locationName: t[4],
            locationType: t[5],
            marginalPrice: t[6],
            energyComponent: t[7],
            congestionComponent: t[8],
            marginalLossComponent: t[9]
        };
        return v;
    });

// LIVESTREAM object ***********************************
    // Default as playing
    LIVESTREAM.playing = false;
    // LIVESTREAM object properties
    LIVESTREAM.t = CURRENTTIME;
    LIVESTREAM.viewPeriod = 2;
    $("#currentTime").html(LIVESTREAM.t);
    LIVESTREAM.mPerTick = 5;
    LIVESTREAM.toggleOn = function(){
        if(this.playing){
            console.log('Stop');
            $('#playbtn').html(`<i class="fas fa-play"></i>`);
        }else{
            console.log('Start');
            $('#playbtn').html(`<i class="fas fa-pause"></i>`);
        }
        this.playing = !this.playing;
    };

    // Start the timer
    doTick();

// TICK FUNCTION *****************************************
    function doTick(){
        setTimeout(function(){
            if(LIVESTREAM.playing){
                addTime();
                let startDate = moment(LIVESTREAM.t).subtract(LIVESTREAM.viewPeriod, 'days').subtract(2, 'years').format('MM/DD') + '/2016';
                let endDate = moment(LIVESTREAM.t).format('MM/DD') + '/2016';
                let mit = getUsageFromRange(startDate, endDate);
                let neiso = getDataFromRange(startDate, endDate);
                drawChart(mit, neiso);
                $("#currentTime").html(LIVESTREAM.t);
            }
            doTick();
        }, 3000);
    }

    function addTime(){
        LIVESTREAM.t = moment(LIVESTREAM.t).add(LIVESTREAM.mPerTick, 'minutes').format('YYYY-MM-DD HH:mm');
        $("#currentTime").html(LIVESTREAM.t);
    }

// Charts **********************
//need for Google Charts 
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.load('current', {packages: ['corechart', 'bar']});

function run(){
    // Data from ne-iso
    console.log(getDataFromRange());
    // Data from MIT's usage
    console.log(getUsageFromRange());
    updateBidPrice();
    updateBidAmount();
    google.charts.setOnLoadCallback(drawISONEPRices); 
    google.charts.setOnLoadCallback(drawProfitability);
}

// Function to get data within time range
function getDataFromRange(startDate, endDate){
    // Set default values
    startDate   = startDate || $('#startDate').val();
    endDate     = endDate || $('#endDate').val();
    // Filter data
    return ENERGYDAT.filter(o => o.date >= startDate && o.date <= endDate);
}

// Function to get data within time range
function getUsageFromRange(startDate, endDate){
    // Set default values
    startDate   = startDate || $('#startDate').val();
    endDate     = endDate || $('#endDate').val();
    // Filter data
    return MITDATA.filter(o => o.date >= startDate && o.date <= endDate);
}

function drawChart(mit, iso){
    var data = [];
    var labels = [];
    // MIT usage
        mit.forEach((line)=>{
            data.push(line['usage']);
            let dstr = line.date + ' ' + line.time;
            let timeline = moment(dstr, "MM/DD/YYYY HH:mm");
            labels.push(timeline);
        });
        // console.log(data);
        // console.log(labels[0]);
        // console.log(labels[labels.length-1]);
    // ISO NE
    var ctx = document.getElementById('drawPricesChart_Div').getContext('2d');
    ctx.canvas.width = 1000;
    ctx.canvas.height = 600;
    var cfg = {
        type: 'bar',
        animation: false,
        data: {
            labels: labels,
            datasets: [{
                label: 'Price / Usage Chart',
                data: data,
                type: 'scatter',
                pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2,
                backgroundColor: 'rgba(255,0,0,1)',
                borderColor: 'rgba(255,0,0,1)'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'series',
                    ticks: {
                        source: 'labels'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Closing price ($)'
                    }
                }]
            }
        }
    };
    var chart = new Chart(ctx, cfg);
}

//console.log(ENERGYDAT[0]);
// function drawISONEPRices() {
//     console.log('dafljfdlgdf');
//     var intermediate = getDataFromRange();
//     var PriceBidGraphableArray = [];
//     intermediate.forEach(function(element){
//         PriceBidGraphableArray.push([element[1], element[6], BidPrice]);
//     });
//
//     PriceBidGraphableArray.unshift(['Time', 'DAM LMP', "Bid Price"]);
//     var gdata = google.visualization.arrayToDataTable(PriceBidGraphableArray);
//     var options = {
//         title: 'ISO-NE Price versus Bid Price',
//         vAxis: { title: 'LMP ($/MWh)' },
//         hAxis: { title: 'Time (Month/Day/Year/Hour)' },
//         seriesType: 'line',
//         series: { 1: { type: 'line' } }
//     }
//     var chart = new google.visualization.ComboChart(document.getElementById('drawISONEPRicesChart_Div'));
//     chart.draw(gdata, options);
// }
//
// function drawProfitability(){
//     var intermediateISO = getDataFromRange();
//     var intermediateMITUse = getUsageFromRange(); 
//     var data = new google.visualization.arrayToDataTable([
//         ['Day','Profitability'],
//         //the results [time, profitability] , each row indivudalt
//     ]); 
//     var options = {
//         title: 'Motivation Level Throughout the Day',
//         hAxis: {
//           title: 'Time of Day',
//           format: 'h:mm a',
//                 },
//         vAxis: {
//             title: '',
//         }
//     }
//     var chart = new google.visualization.ColumnChart(document.getElementById('drawProfitability-Div'));
//     chart.draw(data, options);
// }

    //for graph 3, citation https://canvasjs.com/jquery-charts/resizable-chart/
