
let svg = d3.select("svg"),
    width = + svg.attr("width"),
    height = + svg.attr("height"),
    color =  d3.scaleOrdinal() // Define ordinal scale for colors per specific node
      .domain(['a', 'b', 'c'])
      .range(['#4296dc', '#42fadc', '#42c8dc']);


let a = {id: "a"},
    b = {id: "b"},
    c = {id: "c"},
    nodes = [a, b, c],
    links = [];

let simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#c7cbcc").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart();

d3.timeout(function() {
  links.push({source: a, target: b}); //  a-b
  links.push({source: b, target: c}); //  b-c
  links.push({source: c, target: a}); //  c-a
  restart();
}, 1000);

d3.interval(function() {
  nodes.pop(); // remove c
  links.pop(); // remove c-a
  links.pop(); // remove b-c
  restart();
}, 2000, d3.now());

d3.interval(function() {
  nodes.push(c); // Re-add c
  links.push({source: b, target: c}); // re add b-c
  links.push({source: c, target: a}); // re add c-a
  restart();
}, 2000, d3.now() + 1000);

function restart() {

  // apply the  update pattern to the nodes
  node = node.data(nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter().append("circle").attr("fill", function(d) { return color(d.id); }).attr("r", 8).merge(node);
  // Apply the update pattern to the links
  link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  link.exit().remove();
  link = link.enter().append("line").merge(link);

  // update + restart the simulation
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}
