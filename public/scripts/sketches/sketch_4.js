
const w = 500;
const h = 300;
const padding = 40;
const svg = d3.select('#sketch_4')
  .append('svg')
  .attr('width', w)
  .attr('height', h);


let dataset, xScale, yScale;
let parseTime = d3.timeParse("%m/%d/%y");
let formatTime = d3.timeFormat("%b %e");

let rowConverter = function(d) {
  return {
    Date: parseTime(d.Date),
    Amount: parseInt(d.Amount)
  };
}

d3.csv("../data/time_scale_data.csv", rowConverter, function(data) {
  dataset = data;

  xScale = d3.scaleTime()
    .domain([
      d3.min(dataset, function(d) { return d.Date; }),
      d3.max(dataset, function(d) { return d.Date; }),
    ])
    .range([padding, w - padding]);

    yScale = d3.scaleLinear()
     .domain([
      d3.min(dataset, function(d) { return d.Amount; }),
      d3.max(dataset, function(d) { return d.Amount; })
    ])
     .range([h - padding, padding]);

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", function(d) {
          return xScale(d.Date);
       })
       .attr("cy", function(d) {
          return yScale(d.Amount);
       })
       .attr("r", 5)
       .attr('fill', function(d) {
         return 'rgb(66, ' + Math.round(d.Amount * 2) + ', 220)';
       });

     svg.selectAll('text')
       .data(dataset)
       .enter()
       .append('text')
       .text(function(d){
         return formatTime(d.Date);
       })
       .attr('x', function(d){
         return xScale(d.Date) + 12;
       })
       .attr('y', function(d){
         return yScale(d.Amount) -3;
       })
       .attr('font-family', 'monospace')
       .attr('font-size', '8px')
       .attr('fill', 'gray');

});
