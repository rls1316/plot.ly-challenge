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

        // Set default value and build charts
        var defaultname = samplesname[0];

        //Charts(defaultname);
       // MetaData(defaultname);
    });
}

// Call function for dropdown start
init();

// Set function for Charts
