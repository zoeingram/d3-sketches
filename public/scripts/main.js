const sketchNames = ['Bar Chart', 'Scatter Plot', 'Linear Scales'];


for (let i = 0; i < sketchNames.length; i++) {
    let sketchDiv = document.createElement('div');
    sketchDiv.id = 'sketch_' + i + '';
    sketchDiv.className = 'four columns';

    let sketchTitle = document.createElement('a');
    sketchTitle.innerHTML = sketchNames[i];
    sketchTitle.href = '/sketches/sketch_' + i + '';
    sketchDiv.appendChild(sketchTitle);
    document.getElementById('sketches').appendChild(sketchDiv);
}
