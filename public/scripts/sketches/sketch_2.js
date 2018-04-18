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
                [ 220, 88 ],
                [ 600, 150 ]
               ];
const w = 500;
const h = 300;
const padding = 20;

const xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
      return d[0];
    }
  )])
  .range([padding, w - padding * 2]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
      return d[1];
    }
  )])
  .range([h - padding, padding]);

  const rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {
        return d[1];
      }
    )])
    .range([2, 5]);


  const svg = d3.select('#sketch_2')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return xScale(d[0]);
    })
    .attr('cy', function(d) {
      return yScale(d[1]);
    })
    .attr('r', function(d) {
      return rScale(d[1]) * 2;
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
      return xScale(d[0]) ;
    })
    .attr('y', function(d){
      return yScale(d[1]);
    })
    .attr('font-family', 'monospace')
    .attr('font-size', '11px')
    .attr('fill', 'gray')
    .attr('text-anchor', 'middle');
