

    // var MakeReducedArray = function(rArry){ 
    //     //the PlaceHolderDate is screwing things up 
    //     var tryCycleReduceGraph = [];
    //     var PlaceHolderDate = '00/00/0000';
    //     var HourSum = 0;

    //     rArry.forEach(function(element){ 
    //         var SOS = []; 
    //         if(element.date !== PlaceHolderDate){ 
    //             SOS.push(PlaceHolderDate);
    //             SOS.push(HourSum);
    //             tryCycleReduceGraph.push(SOS); 
    //             PlaceHolderDate= element.date; 
    //             HourSum = element.profit; 
    //         }else if(element.date === PlaceHolderDate){
    //             HourSum += element.profit }     
    //     }, 
    //     //dont know why this return isn't working 
    //     tryCycleReduceGraph;   
    // }  
    // var GraphArray2 = MakeReducedArray(joinedArray);  
    //GraphArray2.unshift(['Day', 'Profit']); 

    var graphArray = joinedArray.reduce(function(accum, current){
            if (current.date in accum) {
            accum[current.date] += current.profit
                                            }
            else{
            accum[current.date] = current.profit      
    }
    return accum;
        },[]); 
        
    // var graphArray = joinedArray.forEach(function(element){
    //     var outputObject = [];
    //     //get an array of objects 
    //     }); 
        console.log('this is the reduced array'); 
        console.log(GraphArray2); 
        var data = new google.visualization.DataTable(GraphArray2);