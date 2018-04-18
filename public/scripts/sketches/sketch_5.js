const w = 500;
const h = 300;
const padding = 30;
const svg = d3.select('#sketch_5')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

let dataset = [
  						[5, 20], [480, 90], [250, 50], [100, 33],
              [330, 95],[410, 12], [475, 44], [25, 67],
              [85, 21], [220, 88], [600, 150]
				      ];

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
  .tickValues([0, 50, 100, 250, 450, 600]);

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
     return 'rgb(66, ' + Math.round(d[1])+ 2 + ', 220)';
   });

svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
   		return d[0] + "," + d[1];
   })
   .attr("x", function(d) {
   		return xScale(d[0]);
   })
   .attr("y", function(d) {
   		return yScale(d[1]);
   })
   .attr('font-family', 'monospace')
   .attr('font-size', '11px')
   .attr('fill', 'gray');

svg.append("g")
	.attr("id", "axisOne")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(xAxis);

svg.append("g")
	.attr("id", "axisTwo")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);
