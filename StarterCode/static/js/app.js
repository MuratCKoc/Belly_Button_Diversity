// d3 bindings to html
var options = d3.select("#select")
var selector = d3.select("#selDataset");
var demographics = d3.select("#demographics");


function init() {
    // Populate the dropdown
    d3.json("samples.json").then((data) =>  {
        var Names = data.names;
        Names.forEach((sample) => {
            selector.append("option").text(sample).property("value",sample);
        })
        console.log(Names);

        // Use the first sample to init the charts
        const initialSample = Names[0];
        build_Charts(initialSample);
    });
};

function build_Charts(initialSample) {
    d3.json("samples.json").then((data) => {
        var dataSample = data.samples;
        var chartObj = dataSample.filter(sampleObj => sampleObj.id == initialSample);
        var result = chartObj[0];
        // Assign otu values
        var bubble_trace = {
            x: chartObj[0].otu_ids,
            y: chartObj[0].sample_values,
            text: chartObj[0].otu_labels,
            mode: 'markers',
            marker: {
                color: data.otu_ids,
                size: data.sample_values
            }
        };
        var trace1 = [bubble_trace];
        var layout = {
            title: "OTU ID",
            height: 500,
            widht: 1024
        };
        Plotly.newPlot("bubble",trace1, layout, {responsive: true})
    })
}

// Event listener
options.on("change", init());
