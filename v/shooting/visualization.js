
// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  d3.csv("shootings.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});


var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 100, right: 50, bottom: 50, left: 75 },
     width = 1500 - margin.left - margin.right,
     height = 650 - margin.top - margin.bottom;
   var div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Visualization Code:
  var xscale = d3.scaleBand()
    .range([25, width])
    .domain(data.map(d => d.abbr))
    .padding(.2)

  var yscale = d3.scaleLinear()
    .domain([0, 500])
    .range([height, 0]);

  var axisVariable = d3.axisBottom()
    .scale(xscale)
    //.tickFormat(d3.format("04d"));

  var axisOther = d3.axisLeft()
    .scale(yscale);

  svg.append("g")
    .call( axisVariable )
    .attr("transform", "translate(0," + height + ")");

svg.append("text").attr("x", 600).attr("font-weight", 700).attr("y", 0).attr("text-anchor", "middle").style("font-size", "32px").text("Frequency of Shootings 2013-2018");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+15)
    .attr("x", -(height / 2))
    .style("text-anchor", "middle")
    .text("Normalized Shootings");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+30)
    .attr("x", -(height / 2))
    .style("text-anchor", "middle")
    .text("(per 100k people)");

  svg.append("g")
    .call(axisOther);
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function (d, i) {
         return d["state"] + " Population: " + d["pop"] + "";
      });

      //political affiliation colors
      var A_states = ["CA", "NJ", "CT", "MD", "MA", "NY", "HI"];
      var B_states = ["IL", "RI", "WA", "DE"];
      var C_states = ["PA", "MN", "OR", "CO", "IA", "MI", "WI", "FL", "NE"]
      var D_states = ["VT", "VA", "OH", "NC", "NV", "IN", "TN", "UT"]

      function colorPicker(v) {
        if (A_states.includes(v)) {
          return "#0000ff";
        } else if (B_states.includes(v)){
          return "#6600ff"
        } else if (C_states.includes(v)){
          return "#ff00ff"
        } else if (D_states.includes(v)){
          return "#ff0098"
        } else {
          return "#ff0000"
        }
      }

//     var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
// var plus = "";
// return d.["pop"] + ": " + d["pop"] + "<br>" +
// "Avg. GPA: " + d["state"] + "<br>" +
// "Avg. Students:" + numberWithCommas((d["pop"] / 2).toFixed(0) + " /year");
// });
svg.call(tip);
  svg.selectAll()
     .data(data)
     .enter()
     .append("rect")
     .attr("x", d => xscale(d.abbr))
     .attr("y", d => yscale(d.normalized))
     .attr("width", xscale.bandwidth())
     .attr("height", d => height - yscale(d.normalized))
     .attr("fill", d => d3.hsl(0+(470-d.normalized)/470*100, 1, .5))
     .attr("fill-opacity", .8)
     .on("mouseover", function(d) {
             div.transition()
                 .duration(200)
                 .style("opacity", .9);
             div	.html("State: " + d.state + "<br/>"+"Population: " + d.pop + "<br/>"+"Shootings: " + d.size + "<br/>"+
           "Normalized: " +  d.normalized + "<br/>")
                 .style("left", (d3.event.pageX-40) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
                 var current = d3.select(this);
                 current.attr("fill", d => colorPicker(d.abbr));
             })
         .on("mouseout", function(d) {
             div.transition()
                 .duration(500)
                 .style("opacity", 0);
                 var current = d3.select(this);
                 current.attr("fill", d => d3.hsl(0+(470-d.normalized)/470*100, 1, .5));
         })
};
