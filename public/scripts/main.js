const sketchNames = ['Bar Chart', 'Scatter Plot', 'Linear Scale', 'Square Root Scale', 'Time Scale', 'Axes', 'Randomized Data Scatterplot', 'Randomized Data Bar Chart'];


for (let i = 0; i < sketchNames.length; i++) {
    let sketchDiv = document.createElement('div');
    sketchDiv.id = 'sketch_' + i + '';
    sketchDiv.className = 'two columns';

    let sketchTitle = document.createElement('a');
    sketchTitle.className = 'title'
    sketchTitle.innerHTML = sketchNames[i];
    sketchTitle.href = '/sketch_' + i + '';
    sketchDiv.appendChild(sketchTitle);

    document.getElementById('sketches').appendChild(sketchDiv);
}
