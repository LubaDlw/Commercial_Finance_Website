// List of selected African countries for the visualization
const countries = ["Nigeria", "Ethiopia", "Egypt, Arab Rep.", "South Africa", "Kenya"];

// Function to fetch data from the World Bank API
async function fetchData() {
    const gdpPromises = countries.map(country =>
        fetch(`https://api.worldbank.org/v2/country/${countryCode(country)}/indicator/NY.GDP.PCAP.CD?format=json&date=2021`)
            .then(response => response.json())
            .then(data => ({ country, gdpPerCapita: data[1][0].value }))
    );

    const lifeExpectancyPromises = countries.map(country =>
        fetch(`https://api.worldbank.org/v2/country/${countryCode(country)}/indicator/SP.DYN.LE00.IN?format=json&date=2021`)
            .then(response => response.json())
            .then(data => ({ country, lifeExpectancy: data[1][0].value }))
    );

    const gdpData = await Promise.all(gdpPromises);
    const lifeExpectancyData = await Promise.all(lifeExpectancyPromises);

    // Merge GDP and life expectancy data
    return gdpData.map(gdpEntry => ({
        country: gdpEntry.country,
        gdpPerCapita: gdpEntry.gdpPerCapita,
        lifeExpectancy: lifeExpectancyData.find(lifeEntry => lifeEntry.country === gdpEntry.country).lifeExpectancy
    }));
}

// Map country names to World Bank country codes
function countryCode(countryName) {
    const codes = {
        "Nigeria": "NGA",
        "Ethiopia": "ETH",
        "Egypt, Arab Rep.": "EGY",
        "South Africa": "ZAF",
        "Kenya": "KEN"
    };
    return codes[countryName];
}

// Function to create the scatter plot
function createScatterPlot(data) {
    const margin = { top: 40, right: 20, bottom: 60, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define x and y scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.gdpPerCapita) * 1.1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.lifeExpectancy) - 5, d3.max(data, d => d.lifeExpectancy) + 5])
        .range([height, 0]);

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d => `$${d / 1000}K`));

    // Add y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Create infoBox div (initially hidden)
    const infoBox = d3.select("body").append("div")
        .attr("class", "infoBox")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "#fff")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("visibility", "hidden");

    // Plot points for each country
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", d => x(d.gdpPerCapita))
        .attr("cy", d => y(d.lifeExpectancy))
        .attr("r", 8)
        .attr("fill", d => d3.schemeCategory10[countries.indexOf(d.country)])
        .on("mouseover", (event, d) => {
            infoBox.style("visibility", "visible")
                .html(`<strong>${d.country}</strong><br>
                      GDP per Capita: $${d.gdpPerCapita.toLocaleString()}<br>
                      Life Expectancy: ${d.lifeExpectancy} years`);
        })
        .on("mousemove", (event) => {
            infoBox.style("top", `${event.pageY - 10}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", () => {
            infoBox.style("visibility", "hidden");
        });

    // Add labels for each point
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => x(d.gdpPerCapita) + 10)
        .attr("y", d => y(d.lifeExpectancy))
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(d => d.country);

    // Add axis labels
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("GDP per Capita (USD)");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .text("Life Expectancy (Years)");
}



// Fetch data and create scatter plot
fetchData().then(data => {
    createScatterPlot(data);
});
