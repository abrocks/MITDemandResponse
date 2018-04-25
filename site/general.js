

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

function run(){
    // Data from ne-iso
    console.log(getDataFromRange());
    // Data from MIT's usage
    console.log(getUsageFromRange());
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
//console.log(ENERGYDAT[0]);