const dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
const w = 500;
const h = 120;
const barPadding = 1;

const svg = d3.select('#sketch_0')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return i * (w/dataset.length - barPadding);
  })
  .attr('y', function(d) {
    return h - (d * 4);
  })
  .attr('width', 20)
  .attr('height', function(d) {
    return d * 4;
  })
  .attr('fill', function(d) {
    return 'rgb(0, 0, ' + Math.round(d * 8) + ')';
  });

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return d;
  })
  .attr('x', function(d, i) {
    return i * (w/dataset.length - barPadding) +10 ;
  })
  .attr('y', function(d) {
    return h - (d * 4) + 14;
  })
  .attr('font-family', 'monospace')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');
