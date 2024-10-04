// URL for South Africa's GDP data from World Bank
const url = "https://api.worldbank.org/v2/country/ZAF/indicator/NY.GDP.MKTP.CD?format=json&date=2000:2021";



// Fetching GDP data
d3.json(url).then(data => {
    // Extracting the relevant data
    const gdpData = data[1].map(d => ({
        year: +d.date,  // Convert year string to number
        gdp: d.value / 1e9 // Convert GDP to billions by dividing by 1 billion (1e9)
    })).filter(d => d.gdp !== null); // Filter out null values

    // Set dimensions and margins for the graph
    const margin = { top: 20, right: 30, bottom: 50, left: 120 }, // Increase bottom for X-axis label
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Append SVG object to the body
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the scales
    const x = d3.scaleLinear()
        .domain(d3.extent(gdpData, d => d.year))  // using d3.extent ensures the range fits the data
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(gdpData, d => d.gdp)]) // Values in billions
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(gdpData.length).tickFormat(d3.format("d"))); // Format years as integers

    // Add X axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)  // Center horizontally
        .attr("y", height + margin.bottom - 10)  // Position just below the X-axis
        .text("Year")
        .attr("font-size", "14px");

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d => d + "B")); // Add "B" to indicate billions

    // Add Y axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")  // Rotate the text vertically
        .attr("x", -height / 2)  // Center vertically
        .attr("y", -margin.left + 40)  // Position left of the Y-axis
        .text("GDP Amount in Billions (USD)")  // Update label to reflect billions
        .attr("font-size", "14px");

    // Add the line
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.gdp));

    svg.append("path")
        .datum(gdpData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    // Create a tooltip div that is initially hidden
    const tooltip = d3.select("#tooltip");

    // Add points for each year
    svg.selectAll("dot")
        .data(gdpData)
        .enter().append("circle")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.gdp))
        .attr("r", 5)
        .attr("fill", "red")
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)  // Show tooltip
                .html(`Year: ${d.year}<br>GDP: ${d3.format(",.2f")(d.gdp)} billion USD`); // Format GDP in billions
        })
        .on("mousemove", (event) => {
            tooltip
                .style("left", (event.pageX + 10) + "px")  // Move tooltip to follow mouse
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);  // Hide tooltip
        });
});
