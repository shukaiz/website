$(function() {
    d3.csv("students-new.csv").then(function(data) {
        console.log(data);
        visualize(data);
    });
});
var visualize = function(data) {
    var margin = {
        top: 100,
        right: 1000,
        bottom: 50,
        left: 350
    }
      , width = 2000 - margin.left - margin.right
      , height = 1500 - margin.top - margin.bottom;
    var svg = d3.select("#chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("width", width + margin.left + margin.right)
      .style("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);
    var y = d3.scaleLinear()
      .domain([0, 2200])
      .range([height, 0]);
    var engrScale = d3.scaleLinear()
      .domain([35, 1300])
      .range([height, 0]);
    var lasScale = d3.scaleLinear()
      .domain([0, 1700])
      .range([height, 0]);
    var acesScale = d3.scaleLinear()
      .domain([25, 700])
      .range([height, 0]);
    var businessScale = d3.scaleLinear()
      .domain([500, 2200])
      .range([height, 0]);
    var mediaScale = d3.scaleLinear()
      .domain([0, 630])
      .range([height, 0]);
    var las2Scale = d3.scaleLinear()
      .domain([0, 160])
      .range([height, 0]);

    var slopegraph = svg.selectAll("major")
      .data(data).enter()
      .append("g")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);
      ;

      function mouseout(d) {
        var current = d3.select(this);
        if(current.attr("visibility")!="visible"){
          current.selectAll(".slope-line").style("opacity", 0.3);
          current.selectAll(".left-circles").style("opacity", 0.3);
          current.selectAll(".right-circles").style("opacity", 0.3);
          current.selectAll(".left-labels").style("opacity", 0.0);
          current.selectAll(".right-lables").style("opacity", 0.0);
        }

      }

      function mouseover(d) {
        var current = d3.select(this);
        if(current.attr("visibility")!="visible"){
          current.selectAll(".slope-line").style("opacity", 1);
          current.selectAll(".left-circles").style("opacity", 1);
          current.selectAll(".left-labels").style("opacity", 1);
          current.selectAll(".right-circles").style("opacity", 1);
          current.selectAll(".right-lables").style("opacity", 1);
          current.style("cursor", "pointer");
        }

      }
    slopegraph.append("line")
      .attr("class", "slope-line")
      .attr("stroke-width", 5)

      .style("opacity", function(d) {
      if (d["college"] == "LAS" && d["max_total"]>200)
          return .3
      return 0;
      })
      .attr("visibility",function(d){
        if(d["college"]== "LAS" && d["max_total"]>200){
          return "visible";
        }
        return "hidden";
      })
    .attr("x1", function(d) {
        return 2;
    }).attr("y1", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["min_total"]);
        if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["min_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["min_total"]);
        if (d["college"] == "LAS" && ["max_total"]>200)
            return lasScale(d["min_total"]);
        if (d["college"] == "Business")
            return businessScale(d["min_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["min_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["min_total"]);
        return y(d["min_total"]);
    }).attr("x2", function(d) {
        return 598

    }).attr("y2", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["max_total"]);
        if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["max_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["max_total"]);
        if (d["college"] == "Business")
            return businessScale(d["max_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["max_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["max_total"]);
        return y(d["max_total"]);
    }).attr("stroke", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
          return "red";
        else if (d["college"] == "LAS")
          return "purple";
        if (d["college"] == "Engineering")
            return "Navy";
        if (d["college"] == "ACES")
            return "Orange";
        if (d["college"] == "Business")
            return "ForestGreen";
        if (d["college"] == "Fine and Applied Arts")
            return "LightSkyBlue";
        return "black";
    }).attr("id", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return "las";
        else if (d["college"] == "LAS")
            return "las2";
        if (d["college"] == "Engineering")
            return "engineering";
        if (d["college"] == "ACES")
            return "ACES";
        if (d["college"] == "Business")
            return "business";
        if (d["college"] == "Fine and Applied Arts")
            return "faa";
        return 0;
    });


    slopegraph.append("circle").attr("class", "left-circles").attr("r", 2).attr("cx", 0)
    .style("opacity", function(d) {
      if (d["college"] == "LAS" && d["max_total"]>200)
          return .3
      return 0;
      })
      .attr("visibility",function(d){
        if(d["college"]== "LAS" && d["max_total"]>200){
          return "visible";
        }
        return "hidden";
    })
    .attr("cy", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["min_total"]);
        if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["min_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["min_total"]);
        if (d["college"] == "LAS" && ["max_total"]>200)
            return lasScale(d["min_total"]);
        if (d["college"] == "Business")
            return businessScale(d["min_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["min_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["min_total"]);
        return y(d["min_total"]);
    })
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2).attr("id", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return "las";
        else if (d["college"] == "LAS")
            return "las2";
        if (d["college"] == "Engineering")
            return "engineering";
        if (d["college"] == "ACES")
            return "ACES";
        if (d["college"] == "Business")
            return "business";
        if (d["college"] == "Fine and Applied Arts")
            return "faa";
        return 0;
    });




    slopegraph.append("circle")
      .attr("class", "right-circles")
      .attr("r", 2).attr("cx", 600)
      .style("opacity", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return .3
        return 0;
        })
        .attr("visibility",function(d){
          if(d["college"]== "LAS" && d["max_total"]>200){
            return "visible";
          }
          return "hidden";
      }).attr("cy", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["max_total"]);
        if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["max_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["max_total"]);

        if (d["college"] == "Business")
            return businessScale(d["max_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["max_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["max_total"]);
        return y(d["max_total"]);
    }).attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2).attr("id", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return "las";
        else if (d["college"] == "LAS")
            return "las2";
        if (d["college"] == "Engineering")
            return "engineering";
        if (d["college"] == "ACES")
            return "ACES";
        if (d["college"] == "Business")
            return "business";
        if (d["college"] == "Fine and Applied Arts")
            return "faa";
        return 0;
    });


    slopegraph.append("text")
      .attr("class", "left-labels")
      .attr("x", 0)
      .style("opacity", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return .0
        return 0;
        })
        .attr("visibility",function(d){
          if(d["college"]== "LAS" && d["max_total"]>200){
            return "visible";
          }
          return "hidden";
        }).attr("y", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["min_total"]);
        if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["min_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["min_total"]);
        if (d["college"] == "Business")
            return businessScale(d["min_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["min_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["min_total"]);
        return y(d["min_total"]);
    }).attr("id", function(d) {
        if (d["college"] == "LAS" && d["max_total"]>200)
            return "laslabel";
        else if (d["college"] == "LAS")
            return "las2label";

        if (d["college"] == "Engineering")
            return "engineeringlabel";
        if (d["college"] == "ACES")
            return "ACESlabel";
        if (d["college"] == "Business")
            return "businesslabel";
        if (d["college"] == "Fine and Applied Arts")
            return "faalabel";
        return 0;
    }).attr("dx", -10).attr("dy", 3).attr("font-size", 20).attr("text-anchor", "end").text(d=>d["major"] + " (" + d["min_total"] + ")");



    slopegraph.append("text").attr("class", "right-lables").attr("x", 600)
    .style("opacity", function(d) {
     if (d["college"] == "LAS" && d["max_total"]>200)
          return .0
      return 0;
      })
      .attr("visibility",function(d){
        if(d["college"]== "LAS" && d["max_total"]>200){
          return "visible";
        }
        return "hidden";
      })
    .attr("y", function(d) {
        if (d["college"] == "Engineering")
            return engrScale(d["max_total"]);
     if (d["college"] == "LAS" && d["max_total"]>200)
            return lasScale(d["max_total"]);
        else if (d["college"] == "LAS")
            return las2Scale(d["max_total"]);
        if (d["college"] == "Business")
            return businessScale(d["max_total"]);
        if (d["college"] == "ACES")
            return acesScale(d["max_total"]);
        if (d["college"] == "Fine and Applied Arts")
            return mediaScale(d["max_total"]);
        return y(d["max_total"]);
    })
    .attr("dx", 10).attr("dy", 3).attr("font-size", 20).text(d=>d["major"] + " (" + d["max_total"] + ")").attr("id", function(d) {
       if (d["college"] == "LAS" && d["max_total"]>200)
            return "laslabel";
        else if (d["college"] == "LAS")
            return "las2label";
        if (d["college"] == "Engineering")
            return "engineeringlabel";
        if (d["college"] == "ACES")
            return "ACESlabel";
        if (d["college"] == "Business")
            return "businesslabel";
        if (d["college"] == "Fine and Applied Arts")
            return "faalabel";
        return 0;
    });


    svg.append("text").attr("x", width+450).attr("font-weight", 200).attr("y",  210).attr("text-anchor", "middle").style("font-size", "20px")	.on("click", function(){
  	// Determine if current line is visible

    d3.selectAll("#las").style("opacity", .3);
    d3.selectAll("#las2").style("opacity", 0);
    d3.selectAll("#engineering").style("opacity",0);
    d3.selectAll("#business").style("opacity", 0);
    d3.selectAll("#faa").style("opacity", 0);
    d3.selectAll("#ACES").style("opacity",0);
    d3.select("#title").text("Liberal Arts and Sciences (max enrollment>160)")
    d3.selectAll("#las").attr("visibility","visible");
    d3.selectAll("#las2").attr("visibility","hidden");
    d3.selectAll("#engineering").attr("visibility","hidden");
    d3.selectAll("#business").attr("visibility","hidden");
    d3.selectAll("#faa").attr("visibility","hidden");
    d3.selectAll("#ACES").attr("visibility","hidden");
  	// Update whether or not the elements are active
    d3.selectAll("#las2label").attr("visibility","hidden");
    d3.selectAll("#laslabel").attr("visibility","visible");
    d3.selectAll("#engineeringlabel").attr("visibility","hidden");
    d3.selectAll("#businesslabel").attr("visibility","hidden");
    d3.selectAll("#faalabel").attr("visibility","hidden");
    d3.selectAll("#ACESlabel").attr("visibility","hidden");
  	}).on("mouseover", function(){
        var current = d3.select(this);
        current.attr("font-weight", 600);
        current.style("cursor", "pointer");
    })
    .on("mouseout", function(){
        var current = d3.select(this);
        current.attr("font-weight", 200);
    }).text("Liberal Arts and Sciences (max enrollment>160)");

    svg.append("text").attr("x", width+450).attr("font-weight", 200).attr("y", 240).attr("text-anchor", "middle").style("font-size", "20px")	.on("click", function(){

    // Hide or show the elements
    d3.selectAll("#las2").style("opacity", .3);
    d3.selectAll("#las").style("opacity", 0);
    d3.selectAll("#engineering").style("opacity",0);
    d3.selectAll("#business").style("opacity", 0);
    d3.selectAll("#faa").style("opacity", 0);
    d3.selectAll("#ACES").style("opacity",0);
    d3.select("#title").text("Liberal Arts and Sciences (max enrollment<160)")
    d3.selectAll("#las").attr("visibility","hidden");
    d3.selectAll("#las2").attr("visibility","visible");
    d3.selectAll("#engineering").attr("visibility","hidden");
    d3.selectAll("#business").attr("visibility","hidden");
    d3.selectAll("#faa").attr("visibility","hidden");
    d3.selectAll("#ACES").attr("visibility","hidden");
    // Update whether or not the elements are active


    d3.selectAll("#laslabel").attr("visibility","hidden");
    d3.selectAll("#las2label").attr("visibility","visible");
    d3.selectAll("#engineeringlabel").attr("visibility","hidden");
    d3.selectAll("#businesslabel").attr("visibility","hidden");
    d3.selectAll("#faalabel").attr("visibility","hidden");
    d3.selectAll("#ACESlabel").attr("visibility","hidden");
  }).on("mouseover", function(){
      var current = d3.select(this);
      current.style("cursor", "pointer");
      current.attr("font-weight", 600);
  })
  .on("mouseout", function(){
      var current = d3.select(this);
      current.attr("font-weight", 200);
  }).text("Liberal Arts and Sciences (max enrollment<160)");


    svg.append("text").attr("x", width+450).attr("font-weight", 200).attr("y", 270).attr("text-anchor", "middle").style("font-size", "20px").text("Engineering").on("click", function(){
  	// Determine if current line is visible
    d3.selectAll("#las").style("opacity", 0);
    d3.selectAll("#las2").style("opacity", 0);
    d3.selectAll("#engineering").style("opacity",.3);
    d3.selectAll("#business").style("opacity", 0);
    d3.selectAll("#faa").style("opacity", 0);
    d3.selectAll("#ACES").style("opacity",0);
    d3.select("#title").text("Engineering")
    d3.selectAll("#las").attr("visibility","hidden");
    d3.selectAll("#las2").attr("visibility","hidden");
    d3.selectAll("#engineering").attr("visibility","visible");
    d3.selectAll("#business").attr("visibility","hidden");
    d3.selectAll("#faa").attr("visibility","hidden");
    d3.selectAll("#ACES").attr("visibility","hidden");

    d3.selectAll("#laslabel").attr("visibility","hidden");
    d3.selectAll("#las2label").attr("visibility","hidden");
    d3.selectAll("#engineeringlabel").attr("visibility","visible");
    d3.selectAll("#businesslabel").attr("visibility","hidden");
    d3.selectAll("#faalabel").attr("visibility","hidden");
    d3.selectAll("#ACESlabel").attr("visibility","hidden");
  	}).on("mouseover", function(){
        var current = d3.select(this);
        current.attr("font-weight", 600);
        current.style("cursor", "pointer");
    })
    .on("mouseout", function(){
        var current = d3.select(this);
        current.attr("font-weight", 200);
    });
    svg.append("text").attr("font-weight", 200).attr("x", width+450).attr("y", 300).attr("text-anchor", "middle").style("font-size", "20px").text("Agr, Consumer, & Env Sciences")
    .on("click", function(){

      d3.selectAll("#las").style("opacity", 0);
      d3.selectAll("#las2").style("opacity", 0);
      d3.selectAll("#engineering").style("opacity",0);
      d3.selectAll("#business").style("opacity", 0);
      d3.selectAll("#faa").style("opacity", 0);
      d3.selectAll("#ACES").style("opacity", .3);
      d3.selectAll("#las").attr("visibility","hidden");
      d3.selectAll("#las2").attr("visibility","hidden");
      d3.selectAll("#engineering").attr("visibility","hidden");
      d3.selectAll("#business").attr("visibility","hidden");
      d3.selectAll("#faa").attr("visibility","hidden");
      d3.selectAll("#ACES").attr("visibility","visible");
      d3.select("#title").text("Agr, Consumer, & Env Sciences")

      d3.selectAll("#laslabel").attr("visibility","hidden");
      d3.selectAll("#las2label").attr("visibility","hidden");
      d3.selectAll("#engineeringlabel").attr("visibility","hidden");
      d3.selectAll("#businesslabel").attr("visibility","hidden");
      d3.selectAll("#faalabel").attr("visibility","hidden");
      d3.selectAll("#ACESlabel").attr("visibility","visible");
  	}).on("mouseover", function(){
        var current = d3.select(this);
        current.attr("font-weight", 600);
        current.style("cursor", "pointer");
    })
    .on("mouseout", function(){
        var current = d3.select(this);
        current.attr("font-weight", 200);
    });



    svg.append("text").attr("font-weight",200).attr("x",width+450).attr("y", 330).attr("text-anchor", "middle").style("font-size", "20px")
    .on("click", function(){
  	// Determine if current line is visible
        d3.selectAll("#las").style("opacity", 0);
        d3.selectAll("#las2").style("opacity", 0);
        d3.selectAll("#engineering").style("opacity",0);
        d3.selectAll("#business").style("opacity", .3);
        d3.selectAll("#faa").style("opacity", 0);
        d3.selectAll("#ACES").style("opacity",0);
        d3.select("#title").text("Business");

        d3.selectAll("#las").attr("visibility","hidden");
        d3.selectAll("#las2").attr("visibility","hidden");
        d3.selectAll("#engineering").attr("visibility","hidden");
        d3.selectAll("#business").attr("visibility","visible");
        d3.selectAll("#faa").attr("visibility","hidden");
        d3.selectAll("#ACES").attr("visibility","hidden");

        d3.selectAll("#laslabel").attr("visibility","hidden");
        d3.selectAll("#las2label").attr("visibility","hidden");
        d3.selectAll("#engineeringlabel").attr("visibility","hidden");
        d3.selectAll("#businesslabel").attr("visibility","visible");
        d3.selectAll("#faalabel").attr("visibility","hidden");
        d3.selectAll("#ACESlabel").attr("visibility","hidden");

  	})
    .on("mouseover", function(){
        var current = d3.select(this);
        current.attr("font-weight", 600);
        current.style("cursor", "pointer");
    })
    .on("mouseout", function(){
        var current = d3.select(this);
        current.attr("font-weight", 200);
    }).text("Business")


    svg.append("text").attr("x", width+450).attr("font-weight", 200).attr("y", 360).attr("text-anchor", "middle").style("font-size", "20px").text("Fine and Applied Arts").on("click", function(){
  	// Determine if current line is visible

    d3.selectAll("#las").style("opacity", 0);
    d3.selectAll("#las2").style("opacity", 0);
    d3.selectAll("#engineering").style("opacity",0);
    d3.selectAll("#business").style("opacity", 0);
    d3.selectAll("#faa").style("opacity", .3);
    d3.selectAll("#ACES").style("opacity",0);
    d3.select("#title").text(("Fine and Applied Arts"))
    d3.selectAll("#las").attr("visibility","hidden");
    d3.selectAll("#las2").attr("visibility","hidden");
    d3.selectAll("#engineering").attr("visibility","hidden");
    d3.selectAll("#business").attr("visibility","hidden");
    d3.selectAll("#faa").attr("visibility","visible");
    d3.selectAll("#ACES").attr("visibility","hidden");

    d3.selectAll("#laslabel").attr("visibility","hidden");
    d3.selectAll("#las2label").attr("visibility","hidden");
    d3.selectAll("#engineeringlabel").attr("visibility","hidden");
    d3.selectAll("#businesslabel").attr("visibility","hidden");
    d3.selectAll("#faalabel").attr("visibility","visible");
    d3.selectAll("#ACESlabel").attr("visibility","hidden");
  }).on("mouseover", function(){
      var current = d3.select(this);
      current.attr("font-weight", 600);
      current.style("cursor", "pointer");
  })
  .on("mouseout", function(){
      var current = d3.select(this);
      current.attr("font-weight", 200);
  })

  svg.append("text").attr("x", width+450).attr("font-weight", 300).attr("y", 120).attr("text-anchor", "Middle").style("font-size", "20px").text("Click Buttons Underneath")


  svg.append("text").attr("x", width+450).attr("font-weight", 300).attr("y", 150).attr("text-anchor", "Middle").style("font-size", "20px").text("To Choose Which College's Data To Display:")

  var lineGenerator = d3.line();
  svg.append("line")
    .attr("class", "slope-line")
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("y1", 175)
    .attr("y2", 175)
    .attr("x1", width+225)
    .attr("x2", width+675)
    .style("opacity",.3);
  var lineGenerator = d3.line();
  svg.append("line")
    .attr("class", "slope-line")
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("y1", 175)
    .attr("y2", 385)
    .attr("x1", width+225)
    .attr("x2", width+225)
    .style("opacity",.3);

  var lineGenerator = d3.line();
  svg.append("line")
    .attr("class", "slope-line")
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("y1", 385)
    .attr("y2", 385)
    .attr("x1", width+225)
    .attr("x2", width+675)
    .style("opacity",.3);

  var lineGenerator = d3.line();
  svg.append("line")
    .attr("class", "slope-line")
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("y1", 175)
    .attr("y2", 385)
    .attr("x1", width+675)
    .attr("x2", width+675)
    .style("opacity",.3);



  svg.append("text").attr("x", 300).attr("font-weight", 700).attr("y", -20).attr("text-anchor", "middle").style("font-size", "32px").text("Liberal Arts and Sciences (max enrollment>160)").attr("id", "title");

  var y_axisLAS1 = d3.axisLeft().scale(lasScale)
  var y_axisLAS2 = d3.axisLeft().scale(las2Scale)
  var y_axisEngr = d3.axisLeft().scale(engrScale)
  var y_axisBusiness = d3.axisLeft().scale(businessScale)
  var y_axisACES = d3.axisLeft().scale(acesScale)
  var y_axisFAA = d3.axisLeft().scale(mediaScale)


  svg.append("g")
    .attr("opacity", .3)
    .attr("id","las")
    .style("font-size", "20px")
    .call(y_axisLAS1);

  svg.append("g")
    .attr("opacity", .0)
    .attr("id","las2")
    .style("font-size", "20px")
    .call(y_axisLAS2);

  svg.append("g")
    .attr("opacity", .0)
    .attr("id","engineering")
    .style("font-size", "20px")
    .call(y_axisEngr);

  svg.append("g")
    .attr("opacity", .0)
    .attr("id","business")
    .style("font-size", "20px")
    .call(y_axisBusiness);

  svg.append("g")
    .attr("opacity", .0)
    .attr("id","ACES")
    .style("font-size", "20px")
    .call(y_axisACES);
  svg.append("g")
    .attr("opacity", .0)
    .attr("id","faa")
    .style("font-size", "20px")
    .call(y_axisFAA);

    var y_axisLAS1r = d3.axisRight().scale(lasScale)
    var y_axisLAS2r = d3.axisRight().scale(las2Scale)
    var y_axisEngrr = d3.axisRight().scale(engrScale)
    var y_axisBusinessr = d3.axisRight().scale(businessScale)
    var y_axisACESr = d3.axisRight().scale(acesScale)
    var y_axisFAAr = d3.axisRight().scale(mediaScale)


    svg.append("g")
      .attr("opacity", .3)
      .attr("id","las")
      .attr("transform", "translate(" + 600 + " ,0)")
      .style("font-size", "20px")
      .call(y_axisLAS1r);

    svg.append("g")
      .attr("opacity", .0)
      .attr("id","las2")
      .style("font-size", "20px")
      .attr("transform", "translate(" + 600 + " ,0)")
      .call(y_axisLAS2r);

    svg.append("g")
      .attr("opacity", .0)
      .attr("id","engineering")
      .style("font-size", "20px")
      .attr("transform", "translate(" + 600 + " ,0)")
      .call(y_axisEngrr);

    svg.append("g")
      .attr("opacity", .0)
      .attr("id","business")
      .attr("transform", "translate(" + 600 + " ,0)")
      .style("font-size", "20px")
      .call(y_axisBusinessr);

    svg.append("g")
      .attr("opacity", .0)
      .attr("id","ACES")
      .style("font-size", "20px")
      .attr("transform", "translate(" + 600 + " ,0)")
      .call(y_axisACESr);

    svg.append("g")
      .attr("opacity", .0)
      .attr("transform", "translate(" + 600 + " ,0)")
      .attr("id","faa")
      .style("font-size", "20px")
      .call(y_axisFAAr);



};
