
// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  d3.csv("football.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});

var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 50, right: 50, bottom: 50, left: 150 },
     width = 960 - margin.left - margin.right,
     height = 2500 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Visualization Code:

  var scoreScale = d3.scaleLinear().domain([0, 100]).range([0, 25]);

  var firstSeason = d3.min(data.map(function(d){return d['Season']}));
  var lastSeason = d3.max(data.map(function(d){return d['Season']}));

  var x = d3.scaleLinear()
    .domain([firstSeason - 2, lastSeason])
    .range([0, width]);

  var y = d3.scalePoint()
    .domain(data.map(function(d){return d['Opponent']}))
    .range([10, height]);

  var xAxis = d3.axisTop().scale(x);
  var yAxis = d3.axisLeft().scale(y);

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  svg.selectAll("body")
     .data(data)
     .enter()
     .append("circle")
     .attr("r", function (d, i) {
       return scoreScale(Math.abs(d["IlliniScore"] - d["OpponentScore"]));
     })
     .attr("cx", function (d, i) {
       return x(d["Season"]);
     })
     .attr("cy", function (d, i) {
       return y(d["Opponent"]);
     })
     .attr("fill", function (d, i) {
       if (d['Result'] == 'L') return "blue";
       return "DarkOrange";
     })
     .attr("stroke", "black");

  svg.append("text")
     .attr("x", (width / 2))
     .attr("y", 0 - (margin.top / 2))
     .attr("text-anchor", "middle")
     .style("font-size", "20px")
     .text("120 Years of Fighting Illini by Score Difference");

  svg.append("text")
     .attr("x", (width - 30))
     .attr("y", 0 - (margin.top / 2))
     .attr("text-anchor", "middle")
     .style("font-size", "12px")
     .text("Kevin Zhang");
};
