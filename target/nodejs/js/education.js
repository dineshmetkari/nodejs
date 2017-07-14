// set the dimensions of the canvas
let margin = {top: 20, right: 20, bottom: 500, left: 200},
width = 1500 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom;


// set the ranges
let x = d3.scale.ordinal().rangeRoundBands([0, width], .20);

let y = d3.scale.linear().rangeRound([height, 0]);

// define the axis
let xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")


let yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(10);


// add the SVG element
let svg = d3.select("body").append("svg")

.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("../output/Education.json", function(error, data) {

  data.forEach(function(d) {
    d.Education_catogories = d.Education_catogories;
    d.Total_population = +d.Total_population;
  });

// scale the range of the data
x.domain(data.map(function(d) { return d.Education_catogories; }));
y.domain([0, d3.max(data, function(d) { return d.Total_population; })]);

// add axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.10em")
.attr("dy", "-.55em")
.attr("transform", "rotate(-90)" );


svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 8)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Literacy");
// Add bar chart
svg.selectAll("bar")
.data(data)
.enter().append("rect")
.transition().duration(1500)
.delay(function(d,i) { return i * 400;})
.attr("class", "bar")
.attr("x", function(d) { return x(d.Education_catogories); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.Total_population); })
.attr("height", function(d) { return height - y(d.Total_population); });


});
