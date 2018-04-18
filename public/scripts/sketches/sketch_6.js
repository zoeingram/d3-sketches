const w = 500;
const h = 300;
const padding = 30;
const svg = d3.select('#sketch_6')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

let dataset = [];
let dataPoints = 50;
let xRange = Math.random() * 1000;
let yRange = Math.random() * 1000;

for(let i = 0; i < dataPoints; i++) {
  let value1 = Math.floor(Math.random() * xRange);
  let value2 = Math.floor(Math.random() * yRange);
  dataset.push([value1, value2]);
}


let xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[0]; })])
  .range([padding, w - padding * 2]);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  .range([h - padding, padding]);

let aScale = d3.scaleSqrt()
  .domain([0, d3.max(dataset, function(d) { return d[1]; })])
  .range([0, 10]);

let xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(5);

let yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5)

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
   		return xScale(d[0]);
   })
   .attr("cy", function(d) {
   		return yScale(d[1]);
   })
   .attr("r", function(d) {
   		return aScale(d[1]);
   })
   .attr('fill', function(d) {
     return 'rgb(66, ' + Math.round(d[1])+ ', 220)';
   });


svg.append("g")
	.attr("id", "axisOne")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xAxis);

svg.append("g")
	.attr("id", "axisTwo")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);
