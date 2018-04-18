let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
const w = 550;
const h = 250;
const barPadding = 1;

let xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

let yScale = d3.scaleLinear()
	.domain([0, d3.max(dataset)])
	.range([0, h]);

const svg = d3.select('#sketch_7')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return xScale(i);
  })
  .attr('y', function(d) {
     return h - yScale(d);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function(d) {
     return yScale(d);
  })
  .attr('fill', function(d) {
    return 'rgb(66, ' + Math.round(d * 10)+ ', 220)';
  });

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, i) {
     return xScale(i) + xScale.bandwidth() / 2;
  })
  .attr("y", function(d) {
     return h - yScale(d) + 14;
  })
  .attr('font-family', 'monospace')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');

d3.select('button')
  .on('click', function() {
     dataset = [ 11, 15, 3, 19, 13, 6, 8, 14, 21, 12, 24, 11, 15, 9, 17, 21, 16, 18, 22, 24 ];

     svg.selectAll('rect')
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i * 100
      })
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('y', function(d){
        return h - yScale(d);
      })
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('fill', function(d) {
        return 'rgb(66, ' + Math.round(d * 10)+ ', 220)';
      });

      svg.selectAll('text')
        .data(dataset)
        .transition()
        .delay(function(d, i) {
          return i * 100
        })
        .duration(1000)
        .ease(d3.easeLinear)
        .text(function(d){
          return d;
        })
        .attr("x", function(d, i) {
           return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
           return h - yScale(d) + 14;
        });
  });
