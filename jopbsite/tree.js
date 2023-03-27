// Sample data
const data = {
  "name": "Skills",
  "children": [
    { "name": "JavaScript", "value": 100 },
    { "name": "Python", "value": 80 },
    { "name": "Java", "value": 60 },
    { "name": "C#", "value": 50 },
    { "name": "PHP", "value": 40 },
    { "name": "C++", "value": 30 },
    { "name": "Ruby", "value": 20 },
    { "name": "Swift", "value": 10 }
  ]
};

// Set dimensions and create the treemap layout
const width = 960;
const height = 600;
const treemapLayout = d3.treemap().size([width, height]).padding(1);

// Create a hierarchy from the data
const root = d3.hierarchy(data).sum(d => d.value);
treemapLayout(root);

// Select the SVG element and create groups for each data node
const svg = d3.select("#treemap");
const cell = svg.selectAll("g")
  .data(root.leaves())
  .enter().append("g")
  .attr("transform", d => `translate(${d.x0},${d.y0})`);

// Append a rectangle for each node and set the color, size, and border
cell.append("rect")
  .attr("width", d => d.x1 - d.x0)
  .attr("height", d => d.y1 - d.y0)
  .attr("fill", d => d3.interpolateRainbow(Math.random()))
  .attr("stroke", "#fff");

// Add the skill name as text to each rectangle
cell.append("text")
  .attr("x", 5)
  .attr("y", 15)
  .text(d => d.data.name)
  .attr("font-size", "12px")
  .attr("fill", "#fff");
