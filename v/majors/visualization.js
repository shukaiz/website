/*
TODO:
Scaling?
Overlap/clean data
Interactivity
Coloring
Titles/keys
*/


// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
  d3.csv("students-new.csv").then(function(data) {
    // Write the data to the console for debugging:
    console.log(data);

    // Call our visualize function:
    visualize(data);
  });
});

var visualize = function(data) {
  // Boilerplate:
  var margin = { top: 50, right: 50, bottom: 50, left: 200 },
     width = 4200 - margin.left - margin.right,
     height = 1500 - margin.top - margin.bottom;

  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Visualization Code:
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, 2200])
    .range([height, 0])

  var engrScale = d3.scaleLinear()
    .domain([35, 1300])
    .range([height, 0])

  var lasScale = d3.scaleLinear()
    .domain([0, 1700])
    .range([height, 0])

  var acesScale = d3.scaleLinear()
    .domain([25, 700])
    .range([height, 0])

  var businessScale = d3.scaleLinear()
    .domain([500, 2200])
    .range([height, 0])

  var mediaScale = d3.scaleLinear()
    .domain([0, 630])
    .range([height, 0])

    //Interactive part
  function mouseout(d) {
    var current = d3.select(this);
    current.selectAll(".slope-line").attr("opacity", 0.3);
    current.selectAll(".left-circles").attr("opacity", 0.3);
    current.selectAll(".right-circles").attr("opacity", 0.3);
    current.selectAll(".left-labels").attr("opacity", 0.3);
    current.selectAll(".right-lables").attr("opacity", 0.3);
  }

  function mouseover(d) {
    var current = d3.select(this);
    current.selectAll(".slope-line").attr("opacity", 1);
    current.selectAll(".left-circles").attr("opacity", 1);
    current.selectAll(".right-circles").attr("opacity", 1);
    current.selectAll(".left-labels").attr("opacity", 1);
    current.selectAll(".right-lables").attr("opacity", 1);
  }

  //Initialize one slopegraph variable for everything
  var slopegraph = svg.selectAll("major")
    .data(data)
    .enter()
    .append("g")
     .on("mouseover", mouseover)
     .on("mouseout", mouseout);

  //lines
   slopegraph.append("line")
    .attr("class", "slope-line")
    .attr("stroke-width", 3)
    .attr("opacity", 0.3)
    .attr("x1", function(d) {
      if (d["college"] == "LAS") return 2;
      if (d["college"] == "Engineering") return 802;
      if (d["college"] == "ACES") return 1602;
      if (d["college"] == "Business") return 2402;
      if (d["college"] == "Fine and Applied Arts") return 3202;
      return 0;
    })
    .attr("y1", function(d) {
      if (d["college"] == "Engineering") return engrScale(d["min_total"]);
      if (d["college"] == "LAS") return lasScale(d["min_total"]);
      if (d["college"] == "Business") return businessScale(d["min_total"]);
      if (d["college"] == "ACES") return acesScale(d["min_total"]);
      if (d["college"] == "Fine and Applied Arts") return mediaScale(d["min_total"]);
      return y(d["min_total"]);
    })
    .attr("x2", function(d) {
      if (d["college"] == "LAS") return 398;
      if (d["college"] == "Engineering") return 1198;
      if (d["college"] == "ACES") return 1998;
      if (d["college"] == "Business") return 2798;
      if (d["college"] == "Fine and Applied Arts") return 3598;
      return 0;
    })
    .attr("y2", function(d) {
      if (d["college"] == "Engineering") return engrScale(d["max_total"]);
      if (d["college"] == "LAS") return lasScale(d["max_total"]);
      if (d["college"] == "Business") return businessScale(d["max_total"]);
      if (d["college"] == "ACES") return acesScale(d["max_total"]);
      if (d["college"] == "Fine and Applied Arts") return mediaScale(d["max_total"]);
      return y(d["max_total"]);
    })
    .attr("stroke", function(d) {
      if (d["college"] == "LAS") return "red";
      if (d["college"] == "Engineering") return "SteelBlue";
      if (d["college"] == "ACES") return "orange";
      if (d["college"] == "Business") return "LimeGreen";
      if (d["college"] == "Fine and Applied Arts") return "LightSkyBlue";
      return "black";
    })

    //left circles
    slopegraph.append("circle")
      .attr("class", "left-circles")
      .attr("opacity", 0.3)
      .attr("r", 2)
      .attr("cx", function(d) {
        if (d["college"] == "LAS") return 0;
        if (d["college"] == "Engineering") return 800;
        if (d["college"] == "ACES") return 1600;
        if (d["college"] == "Business") return 2400;
        if (d["college"] == "Fine and Applied Arts") return 3200;
        return 0;
      })
      .attr("cy", function(d) {
        if (d["college"] == "Engineering") return engrScale(d["min_total"]);
        if (d["college"] == "LAS") return lasScale(d["min_total"]);
        if (d["college"] == "Business") return businessScale(d["min_total"]);
        if (d["college"] == "ACES") return acesScale(d["min_total"]);
        if (d["college"] == "Fine and Applied Arts") return mediaScale(d["min_total"]);
        return y(d["min_total"]);
      })
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    //right circles
    slopegraph.append("circle")
      .attr("class", "right-circles")
      .attr("opacity", 0.3)
      .attr("r", 2)
      .attr("cx", function(d) {
        if (d["college"] == "LAS") return 400;
        if (d["college"] == "Engineering") return 1200;
        if (d["college"] == "ACES") return 2000;
        if (d["college"] == "Business") return 2800;
        if (d["college"] == "Fine and Applied Arts") return 3600;
        return 0;
      })
      .attr("cy", function(d) {
        if (d["college"] == "Engineering") return engrScale(d["max_total"]);
        if (d["college"] == "LAS") return lasScale(d["max_total"]);
        if (d["college"] == "Business") return businessScale(d["max_total"]);
        if (d["college"] == "ACES") return acesScale(d["max_total"]);
        if (d["college"] == "Fine and Applied Arts") return mediaScale(d["max_total"]);
        return y(d["max_total"]);
      })
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

      //left labels
    slopegraph.append("text")
      .attr("class", "left-labels")
      .attr("opacity", 0.3)
      .attr("x", function(d) {
        if (d["college"] == "LAS") return 0;
        if (d["college"] == "Engineering") return 800;
        if (d["college"] == "ACES") return 1600;
        if (d["college"] == "Business") return 2400;
        if (d["college"] == "Fine and Applied Arts") return 3200;
        return 0;
      })
      .attr("y", function(d) {
        if (d["college"] == "Engineering") return engrScale(d["min_total"]);
        if (d["college"] == "LAS") return lasScale(d["min_total"]);
        if (d["college"] == "Business") return businessScale(d["min_total"]);
        if (d["college"] == "ACES") return acesScale(d["min_total"]);
        if (d["college"] == "Fine and Applied Arts") return mediaScale(d["min_total"]);
        return y(d["min_total"]);
      })
      .attr("dx", -10)
      .attr("dy", 3)
      .attr("font-size", 9)
      .attr("text-anchor", "end")
      .text(d => d["major"] + " (" + d["min_total"] + ")");

      //right labels
    slopegraph.append("text")
      .attr("class", "right-lables")
      .attr("opacity", 0.3)
      .attr("x", function(d) {
        if (d["college"] == "LAS") return 400;
        if (d["college"] == "Engineering") return 1200;
        if (d["college"] == "ACES") return 2000;
        if (d["college"] == "Business") return 2800;
        if (d["college"] == "Fine and Applied Arts") return 3600;
        return 0;
      })
      .attr("y", function(d) {
        if (d["college"] == "Engineering") return engrScale(d["max_total"]);
        if (d["college"] == "LAS") return lasScale(d["max_total"]);
        if (d["college"] == "Business") return businessScale(d["max_total"]);
        if (d["college"] == "ACES") return acesScale(d["max_total"]);
        if (d["college"] == "Fine and Applied Arts") return mediaScale(d["max_total"]);
        return y(d["max_total"]);
      })
      .attr("dx", 10)
      .attr("dy", 3)
      .attr("font-size", 9)
      .text(d => d["major"] + " (" + d["max_total"] + ")");

    svg.append("text")
       .attr("x", 200)
       .attr("y", height + 30)
       .attr("text-anchor", "middle")
       .style("font-size", "20px")
       .text("Liberal Arts and Sciences");

   svg.append("text")
      .attr("x", 1010)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Engineering");

      svg.append("text")
         .attr("x", 1800)
         .attr("y", height + 30)
         .attr("text-anchor", "middle")
         .style("font-size", "20px")
         .text("Agr, Consumer, & Env Sciences");

         svg.append("text")
            .attr("x", 2630)
            .attr("y", height + 30)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .text("Business");

            svg.append("text")
               .attr("x", 3410)
               .attr("y", height + 30)
               .attr("text-anchor", "middle")
               .style("font-size", "20px")
               .text("Fine and Applied Arts");

};
