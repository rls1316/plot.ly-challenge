// Set function for dropdown start
function init() {

    // Use d3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Read sample data json with D3
    d3.json("./data/samples.json").then((samplesdata) => {
        var samplesname = samplesdata.names;
        console.log(samplesdata);

        // Assign the value of the dropdown menu option to a variable
        samplesname.forEach((sampleitem) => {
            dropdownMenu.append("option")
            .text(sampleitem)
            .property("value", sampleitem);
        })

        // Set default value
        var defaultname = samplesname[0];

        // Chart defaults
        Charts(defaultname);
        MetaData(defaultname);
    });
};

// Call function for dropdown start
init();

// Set function for Charts (bar and bubble)
function Charts(sampleitem) {

    // Variables to hold array and filter for selected sample
    d3.json("./data/samples.json").then((samplesdata) => {
        var dataitems = samplesdata.samples;
        var arrayresult = dataitems.filter(sampleobj => sampleobj.id == sampleitem);

        // Set default value 
        var filteredresult = arrayresult[0];
        console.log(filteredresult);

        // Gather horizontal bar chart and bubble chart
        var otuID = filteredresult.otu_ids;
        var otuLabels = filteredresult.otu_labels;
        var samplevalues = filteredresult.sample_values;

        // Set bar chart 
        var barchart = [{
            x: samplevalues.slice(0,10).reverse(),
            y: otuID.slice(0,10).map((id) => "OTU" + id).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barlayout = {
            title: 'Top 10 Bacteria Cultures Found',
            font:{
                family: 'Raleway, sans-serif',
            }
        };

        Plotly.newPlot("bar", barchart, barlayout)

        // Set bubble chart
        var bubblechart = [{
            x: otuID,
            y: samplevalues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: samplevalues,
                color: otuID,
                colorscale: 'YlGnBu'
            }
        }];

        var bubblelayout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: {title: "OTU ID"},
            font:{
                family: 'Raleway, sans-serif',
            }
        };

        Plotly.newPlot("bubble", bubblechart, bubblelayout);
    });
};

// Set function for metadata
function MetaData(sampleitem) {

    // Variables to hold array and filter for selected sample
    d3.json("./data/samples.json").then((samplesdata) => {
        var samplesmeta = samplesdata.metadata;
        var arrayresult = samplesmeta.filter(sampleobj => sampleobj.id == sampleitem);

        // Set default value 
        var filteredresult = arrayresult[0];
        console.log(filteredresult);   
        
        // Use d3 to select id from index file
        var demoinfodisplay = d3.select("#sample-metadata");
        demoinfodisplay.html("");

        // Oject entries and for each to iterate thru keys and values
        Object.entries(filteredresult).forEach(([key, value]) => {
            demoinfodisplay.append("h5")
            .text(`${key}: ${value}`);
        })

    });
};

// Set function to change chart info when new id selected
function optionChanged(SelectedID) {
    Charts(SelectedID);
    MetaData(SelectedID);
};