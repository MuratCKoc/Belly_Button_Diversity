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

        //Prepare chart data 
        var dataSample = data.samples;
        var chartObj = dataSample.filter(sampleObj => sampleObj.id == initialSample);
        var currentSample = chartObj[0];

        // Bubble Chart
        var bubble_trace = {
            x: currentSample.otu_ids,
            y: currentSample.sample_values,
            text: currentSample.otu_labels,
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

        // Sort results for bar chart
        var samplesArr = [];

        //var forL = currentSample.sample_values.len
        for (var i=0; i < currentSample.sample_values.length; i++) {
            var sDict = {}

            sDict.otu_id = currentSample.otu_ids[i]

            sDict.value = currentSample.sample_values[i]

            sDict.label = currentSample.otu_labels[i]
            samplesArr.push(sDict);
        }

        console.log(samplesArr);

        // Bar Chart
        var bar_trace = [{
            type: "bar",
            y: sortedResults,
            x: currentSample.sample_values.slice(0,10).reverse(),
            hovertext: currentSample.otu_labels.slice(0,10).reverse(),
            marker: {color:"#2b7a73"},
            orientation: "h",
            name: "Belly Flora"
        }]
        Plotly.newPlot("bar", bar_trace, {responsive:true})

    })
}

// Event listener
options.on("change", init());
