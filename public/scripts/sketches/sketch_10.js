let svg = d3.select('svg'),
    width = + svg.attr('width'),
    height = + svg.attr('height'),
    color;
let nodes = [],
    links = [];

let source;
let colorsArray = [];
let parsedData = [];

d3.queue(2) // set concurrency of request
  .defer(d3.json, "../../data/friendList1.json")
  .defer(d3.json, "../../data/friendList2.json")
  .awaitAll(ready);

function ready(error, results) {
  if (error) throw error;

  for(let i = 0; i < results.length; i++) {
    let userNode = {
      id: results[i].id,
      name: results[i].name,
      type: 'user'
    }
    cleanData(results[i], userNode)
  }
  generateDiagrams(parsedData)
}



function generateDiagrams(parsedData) {
  update(parsedData)
}

function cleanData(source, userNode) {
  let currentData = [];
  let friendsList = source.friends.data;
  for (let i = 0; i < friendsList.length; i++) { // Push all friend nodes after
    currentData.push({
      id: source.friends.data[i].id,
      name: source.friends.data[i].name,
      type: 'friend'
    });
  }
  currentData.unshift(userNode);
  for (let i = 0; i < currentData.length; i++) { // assign all friend nodes to be sourced from the user
    currentData[i].source = userNode.name;
    currentData[i].target = currentData[i].name;
  }
  parsedData.push(currentData);
  parsedData = [].concat.apply([], parsedData);
}



function update(parsedData) {
   nodes = parsedData
   generateColors();

   let simulation = d3.forceSimulation(nodes)
       .force('charge', d3.forceManyBody())
       .force('link', d3.forceLink(links).distance(300))
       .force('x', d3.forceX())
       .force('y', d3.forceY())
       .alphaTarget(1)
       .on('tick', ticked);

       color =  d3.scaleOrdinal() // Define ordinal scale for colors per specific node
         .domain(nodes)
         .range(colorsArray);


     let g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'),
         link = g.append('g').attr('stroke', '#000').attr('stroke-width', 0.1).selectAll('.link'),
         node = g.append('g').selectAll('.node');
         name = g.append('g').attr('font-family', 'monospace').attr('font-size', '11px').attr('fill', 'gray')
    restart();

    d3.timeout(function() {
      let sourceNode;
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].type == 'user') {
          sourceNode = nodes[i];
        }
        links.push({source: sourceNode, target: nodes[i]}); // my node to my first friend's node
      }
      restart();
    }, 1000);


    function restart() {
      node = node.data(nodes, function(d) { return d.id });
      node.exit().remove();
      node = node.enter().append('circle').attr('fill', function(d) { return color(d.id)}).attr('r', 3).merge(node)

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

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
