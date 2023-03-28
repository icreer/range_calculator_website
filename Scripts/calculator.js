
function get_simple_range(){
    
    let angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
    let vi = parseFloat(document.getElementById('vi').value);
    
    let g = parseFloat(document.getElementById('g').value);
    let range = Math.pow(vi,2) * Math.sin(2*angle) / g;
    document.getElementById('range').value = range;
}

document.getElementById('rangebutton').addEventListener("click", get_simple_range);