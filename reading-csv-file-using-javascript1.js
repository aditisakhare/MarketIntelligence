function buildTable(results){

	var markup = "<table class='table'>";
	var data = results.data;
	var dates_mcx = new Array();
    var open = new Array();
    var high = new Array();
    var low = new Array();
    var close = new Array();
	for(i=1;i<data.length;i++){
        
		markup+= "<tr>";
		var row = data[i];
       
		var cells = row.join(",").split(",");
        
        
		for(j=0;j<cells.length;j++){
			markup+= "<td>";
            markup+= cells[j];
			markup+= "</td>";
        }
        
        
		markup+= "</tr>";
        dates_mcx[i] = cells[0];
        open[i] = cells[1];
        high[i] = cells[2];
        low[i] = cells[3];
        close[i] = cells[4];
	}
    
	markup+= "</table>";
	//console.log(cost);
	
	$("#app").html(markup);
    
    localStorage.setItem("Dates_mcx",dates_mcx);
    localStorage.setItem("open",open);
    localStorage.setItem("high",high);
    localStorage.setItem("low",low);
    localStorage.setItem("close",close);

}


$(document).ready(function(){
		$('#submit').on("click",function(e){
			e.preventDefault();
			if (!$('#files')[0].files.length){
				alert("Please choose at least one file to read the data.");
			}
		
			$('#files').parse({
				config: {
					delimiter: "auto",
					complete: buildTable,
				},
				before: function(file, inputElem)
				{
					//console.log("Parsing file...", file);
				},
				error: function(err, file)
				{
					console.log("ERROR:", err, file);
				},
				complete: function()
				{
					//console.log("Done with all files");
				}
			});
		});
});