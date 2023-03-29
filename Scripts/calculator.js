
function range(v,theta,g){
    // Need to pass theta in radians
    return Math.pow(v,2) * Math.sin(2*theta) /g;
}

function get_simple_range(){
    
    let angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
    let vi = parseFloat(document.getElementById('vi').value);
    
    let g = parseFloat(document.getElementById('g').value);
    document.getElementById('range').value = range(vi,angle,g);
}

document.getElementById('rangebutton').addEventListener("click", get_simple_range);

// Return a random number betwwen -1 and 1 up to the 10^-3
function get_random_number(){
    let value = Math.floor(Math.random()* 1001) / 1000;
    let check = Math.random()
    if (check === 1){
        value *= -1
    }
    return value
}
function std(values, mean){
    let k = 0;
    for (let i = 0; i < values.length; i++){
        k += Math.pow((values[i]-mean),2)
    }
    return Math.sqrt(k/values.length)

}

function get_simple_range_with_un(){
    let theta_o = parseFloat(document.getElementById('angle2').value) * Math.PI / 180;
    let theta_un =  parseFloat(document.getElementById('angle_un').value) * Math.PI / 180;

    let v_o = parseFloat(document.getElementById('vi2').value);
    let v_un = parseFloat(document.getElementById('vi_un').value);

    let g = parseFloat(document.getElementById('g2').value);

    let range_values = [];
    let uncerty = 0;

    for (let i = 0; i < 5000; i++){
        let v = v_o + v_un * get_random_number();
        let theta = theta_o + theta_un* get_random_number();
        //console.log(v)
        //console.log(theta)
        range_values = range_values.concat(range(v,theta, g));
    }
   // console.log(range_values)
    let mean = range_values.reduce((acc, curr)=>{
        return acc + curr
      }, 0) / range_values.length;
    //console.log(range_values.length);
    //console.log(range_values.reduce((sum,i) =>  sum + i));
    uncerty = std(range_values,mean);

    document.getElementById("range_un").value = mean;
    document.getElementById("un").value = uncerty;

}

document.getElementById("rangebutton_with_un").addEventListener("click", get_simple_range_with_un);