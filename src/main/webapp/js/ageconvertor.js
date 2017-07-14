// set the dimensions of the canvas
let margin = {top: 20, right:0, bottom: 100, left: 200},
width = 1500 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;
// set the ranges
let x = d3.scale.ordinal().rangeRoundBands([0, width], .20);
let y = d3.scale.linear().range([height, 0]);
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
d3.json("../output/ageconvertor.json", function(error, data) {
  data.forEach(function(d) {
    d.Age = d.Age;
    d.Population = +d.Population;
  });
// scale the range of the data
x.domain(data.map(function(d) { return d.Age; }));
y.domain([0, d3.max(data, function(d) { return d.Population; })]);
// add axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", "-.55em")
.attr("transform", "rotate(-90)" );
svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 5)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Population");
// Add bar chart
svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.transition().duration(500)
.delay(function(d,i) { return i * 300;})
.attr("x", function(d) { return x(d.Age); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.Population); })
.attr("height", function(d) { return height - y(d.Population); });
});
