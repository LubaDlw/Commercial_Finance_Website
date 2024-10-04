// Sample data representing the GDP distribution by sector (in billion USD)
const gdpData = [
    { sector: 'Agriculture', value: 30 },
    { sector: 'Industry', value: 60 },
    { sector: 'Services', value: 110 }
];

// Set dimensions for the pie chart
const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

// Create an SVG element
const svg = d3.select("#pie-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create a pie function
const pie = d3.pie().value(d => d.value);

// Create an arc generator
const arc = d3.arc()
    .innerRadius(0) // Inner radius for pie chart (0 for a full pie)
    .outerRadius(radius);

// Create the pie chart
const arcs = pie(gdpData);

// Create tooltip
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Create the pie chart
svg.selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("stroke", "#fff")
    .attr("stroke-width", "2px")
    .on("mouseover", function (event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`${d.data.sector}: $${d.data.value}B`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });

// Add labels to the pie chart
svg.selectAll("text")
    .data(arcs)
    .enter()
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => `${d.data.sector}: ${d.data.value}B`);


   