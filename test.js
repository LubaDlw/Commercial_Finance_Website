// Fetch population growth data from the World Bank API
const url = 'https://api.worldbank.org/v2/country/ZAF/indicator/SP.POP.GROW?format=json';

d3.json(url).then(data => {
    const populationData = data[1]
        .map(d => ({
            year: d.date,
            value: d.value
        }))
        .filter(d => d.value !== null && d.year >= 2000); // Filter out null values and only keep data from 2000 onwards

    // Set dimensions and margins for the graph
    const margin = {top: 20, right: 30, bottom: 60, left: 60},
          width = 800 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#population-chart")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set x and y scales
    const x = d3.scaleBand()
        .domain(populationData.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(populationData, d => d.value)])
        .nice() // rounds the y-axis ticks
        .range([height, 0]);

    // Add x and y axes
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(10));

    // Add axis labels
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 15)
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("Population Growth (%)");

    //  tooltip to make graph interactive
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Create bars
    svg.selectAll(".bar")
        .data(populationData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .on("mouseover", (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(`Year: ${d.year}<br>Population Growth: ${d.value}%`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
})
.catch(error => console.error('Error fetching the data:', error));

// Toggle Navigation Menu
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('show'); // Toggle visibility
});
