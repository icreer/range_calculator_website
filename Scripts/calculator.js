
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

function get_range_air_drag(){
    let theta0 = parseFloat(document.getElementById('angle3').value) * Math.PI / 180;
    let theta_un =  parseFloat(document.getElementById('angle_un3').value) * Math.PI / 180;

    let v0 = parseFloat(document.getElementById('vi3').value);
    let v_un = parseFloat(document.getElementById('vi_un3').value);

    let g = parseFloat(document.getElementById('g3').value);

    let y0 = parseFloat(document.getElementById("y").value);
    let y0_un = parseFloat(document.getElementById('y_un').value);

    let C0 = parseFloat(document.getElementById('C').value);
    let C_um = parseFloat(document.getElementById("C_un").value);

    let m0 = parseFloat(document.getElementById('mass').value);
    let m_un = parseFloat(document.getElementById("mass_un").value);

    let d0 = parseFloat(document.getElementById("d").value);
    let d_un = parseFloat(document.getElementById("d_un").value);

    let p0 = parseFloat(document.getElementById('p').value);
    let p_un = parseFloat(document.getElementById("p_un").value);

    let range_value = [];
    console.log("Test");
    for (let i = 0; i < 500; i++){
        let theta = theta0 + theta_un * get_random_number();
        let v = v0 + v_un * get_random_number();
        let y = y0 + y0_un * get_random_number();
        let C = C0 + C_um * get_random_number();
        let m = m0 + m_un * get_random_number();
        let d = d0  + d_un * get_random_number();
        let p = p0 + p_un * get_random_number();
        
        let x = 0;
        let vx = v* Math.cos(theta);
        let ax = 0;

        let vy = v * Math.sin(theta);
        let ay = 0;
        let r = d/2;

        let A = Math.PI * Math.pow(r,2);

        let dt = 0.001;
        let count = 0;

        //console.log("working");

        while (y > 0 && count < 1000){
           ax = -0.5 * p * A * C *(Math.pow(vx,2)) / m;
           vx += ax * dt;
           x += vx * dt;

           if (Math.abs(vy) == vy){
            ay =  -g - (0.5 * p * A * C *(Math.pow(vy,2))) / m; 
            //console.log(ay);
           }
           else{
            ay =  g - (0.5 * p * A * C *(Math.pow(vy,2))) / m;
            //console.log(ay);
           }
           vy += ay*dt;
           y += vy*dt;
           //console.log(y);
           count += 1;
        }
        if(count == 100000){
            //x = 0;
            console.log("no");
        }
        range_value = range_value.concat(x);

    }
    //console.log(range_value);

    let mean = range_value.reduce((acc, curr)=>{
        return acc + curr
      }, 0) / range_value.length;

    let uncerty = std(range_value,mean);
    
    console.log(mean);
    console.log(uncerty); 
    document.getElementById('range_drag').value = mean;
    document.getElementById('un_drag').value = uncerty;
    
}

document.getElementById("rangebutton_with_drag").addEventListener("click", get_range_air_drag);