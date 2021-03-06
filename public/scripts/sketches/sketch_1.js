const dataset = [
                [ 5, 20 ],
                [ 480, 90 ],
                [ 250, 50 ],
                [ 100, 33 ],
                [ 330, 95 ],
                [ 410, 12 ],
                [ 475, 44 ],
                [ 25, 67 ],
                [ 85, 21 ],
                [ 220, 88 ]
               ];
const w = 600;
const h = 300;

const svg = d3.select('#sketch_1')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d[0] + 30;
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .attr('r', function(d) {
    return Math.sqrt(h - d[1] - 50);
  })
  .attr('fill', function(d) {
    return 'rgb(66, ' + Math.round(d[0]) + ', 220)';
  });

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d){
    return d[0] + ',' + d[1];
  })
  .attr('x', function(d){
    return d[0] + 70;
  })
  .attr('y', function(d){
    return d[1];
  })
  .attr('font-family', 'monospace')
  .attr('font-size', '11px')
  .attr('fill', 'gray')
  .attr('text-anchor', 'middle');
