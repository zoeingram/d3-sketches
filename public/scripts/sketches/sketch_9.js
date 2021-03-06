let svg = d3.select('svg'),
    width = + svg.attr('width'),
    height = + svg.attr('height'),
    color;
let nodes = [],
    links = [];
let i = 0;

let source;
let colorsArray = [];

d3.json('../../data/friendList1.json', function(data) {
  source = data;
  update(source);
});

function update(source) {
  let friendsList = source.friends.data;
  let userId = source.id;
  let userName = source.name;
   for (let i = 0; i < friendsList.length; i++) {
     nodes[i] = friendsList[i];
   }

   nodes.unshift({name: userName, id: userId});
   generateColors()

   let simulation = d3.forceSimulation(nodes)
       .force('charge', d3.forceManyBody().strength(-500))
       .force('link', d3.forceLink(links).distance(200))
       .force('x', d3.forceX())
       .force('y', d3.forceY())
       .alphaTarget(1)
       .on('tick', ticked);

       color =  d3.scaleOrdinal() // Define ordinal scale for colors per specific node
         .domain(nodes)
         .range(colorsArray);


     let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'),
         link = g.append('g').attr('stroke', '#c7cbcc').attr('stroke-width', 1.5).selectAll('.link'),
         node = g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node');
         name = g.append('g').attr('font-family', 'monospace').attr('font-size', '11px').attr('fill', 'gray')
    restart();

    d3.timeout(function() {
      for (i = 0; i < nodes.length; i++) {
        links.push({source: nodes[0], target: nodes[i]}); // my node to my first friend's node
      }
      restart();
    }, 1000);


    function generateColors() {
      let g = 100;
      let colorGen;

      for (let j = 0; j < nodes.length; j++) {
        colorGen = rgbToHex(100, g, 220);
        colorsArray.push(colorGen);
        j++;
        g+=10;
      }
    }


    function restart() {

      node = node.data(nodes, function(d) { return d.id });

      node.exit().remove();
      node = node.enter().append('circle').attr('fill', function(d) { return color(d.id)}).attr('r', 8).merge(node)

      link = link.data(links, function(d) { return d.source.id + '-' + d.target.id });
      link = link.enter().append('line').merge(link);

      name = node.data(nodes, function(d) {return d.name});
      name = node.enter().append('text').merge(node);
      simulation.nodes(nodes);
      simulation.force('link').links(links);
      simulation.alpha(1).restart();

    }


    function ticked() {
      node.attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('name', function(d) { return d.name})

      link.attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });
    }

} // end update

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
