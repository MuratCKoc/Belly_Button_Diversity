// d3 bindings to html
var options = d3.select("#select")
var selector = d3.select("#selDataset");
var demographics = d3.select("#demographics");


// Main function
function chart_it() {
    populate_options();
    //var otu_id = options.node().value
}

function init() {
    d3.json("samples.json").then((data) =>  {
        var Names = data.names;
        Names.forEach((sample) => {
            selector.append("option").text(sample).property("value",sample);
        });
        console.log(Names);
    });
};

// Populate the OTU options
//function populate_options() {
//}

// Sort the data by OTU


// Init function
//function populate_(otu_ids) {
//d3.json("samples.json").then((data)=> {
//    var sampleNameArray = data.names;
//
//    console.log(data)
//});
//}

// Event listener
options.on("change", init());
