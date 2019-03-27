function buildTable(results){

	var markup = "<table class='table'>";
	var data = results.data;
	var cost = new Array();
    var dates = new Array();
	for(i=1;i<data.length;i++){
        
		markup+= "<tr><td>";
		var row = data[i];
        //console.log("Hello India          ")
		var cells = row.join(",").split(",");
        //console.log(cells[8]);
		
        
		for(j=0;j<cells.length;j++){
			//markup+= "td";
            //markup+= cells[j];
            if(j==1){
                markup+=cells[j];
                markup+="</td>"
                dates[i-1]=cells[j];
            }
            if(cells[j]=="KGS")
            {
                markup+="<td>"
			     markup+= cells[j+2];
                cost[i-1]=cells[j+2];
            }
			//markup+= "</td>";
		}
        
        
		markup+= "</td></tr>";
	}
    
	markup+= "</table>";
	//console.log(cost);
	
	$("#app").html(markup);
    var cost_export = [12525, 301590, 246993.07, 10922.55, 83450, 11744.04, 747.29, 57560, 1100, 31556, 14533, 20922.3, 130, 4660.17, 15326.35, 504, 130, 19250.06, 29, 20922.3];
    var quantity_export = [900, 14400, 7920, 720, 2700, 720, 84000, 1800, 50, 1440, 540, 15940.8, 5, 200, 360, 21, 5, 360, 1, 15940.8];
    var quantity_import = [14483.04, 8274.24, 14567.28, 1385.28, 48, 0.5, 100, 20, 20, 181, 50, 50, 24, 24, 10, 1, 200, 0.5, 25, 662 ];
    localStorage.setItem("Cost",cost);
    localStorage.setItem("Dates",dates);
    localStorage.setItem("Cost_Export",cost_export);
    localStorage.setItem("Quantity_Export",quantity_export);
    localStorage.setItem("Quantity_Import",quantity_import);

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