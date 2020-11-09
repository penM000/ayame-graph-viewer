var GLOBAL_GRAPH ;
function graph_drawing() {
    var pageid = document.getElementById("pageid").value;
    var start_date = document.getElementById("start_date").value;
    var stop_date = document.getElementById("stop_date").value;
    if (isNaN(pageid)){
        wait_get_rate_from_fullname(pageid,start_date,stop_date);
    }else{
        wait_get_rate_from_id(pageid,start_date,stop_date);
    }
}



function get_rate_from_id(id,start,stop){
    console.log('https://ayameapi.yukkuriikouze.com/get_rate_from_id_during_the_period?_id='+id+'&start='+start+'&stop='+stop)
    return fetch('https://ayameapi.yukkuriikouze.com/get_rate_from_id_during_the_period?_id='+id+'&start='+start+'&stop='+stop, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json;
    })
    .catch(e => {
        console.error(e);
    });
}

function get_rate_from_fullname(id,start,stop){
    console.log('https://ayameapi.yukkuriikouze.com/get_rate_from_fullname_during_the_period?fullname='+id+'&start='+start+'&stop='+stop)
    return fetch('https://ayameapi.yukkuriikouze.com/get_rate_from_fullname_during_the_period?fullname='+id+'&start='+start+'&stop='+stop, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        return json;
    })
    .catch(e => {
        console.error(e);
    });
}

function wait_get_rate_from_id(id,start,stop){
    const waitAsynchronousFunc = (async() => {
        const result = await get_rate_from_id(id,start,stop);

        var datelabels=[];
        var ratedata=[];
        Object.keys(result).forEach(function (key) {
            ratedata.unshift(result[key]["rating"]);
            datelabels.unshift(key);
        });
        console.log(datelabels);
        console.log(ratedata);
        make_graf(id,ratedata,datelabels)
    })();
}

function wait_get_rate_from_fullname(id,start,stop){
    const waitAsynchronousFunc = (async() => {
        const result = await get_rate_from_fullname(id,start,stop);

        var datelabels=[];
        var ratedata=[];
        Object.keys(result).forEach(function (key) {
            ratedata.unshift(result[key]["rating"]);
            datelabels.unshift(key);
        });
        console.log(datelabels);
        console.log(ratedata);
        make_graf(id,ratedata,datelabels)
    })();
}
function make_graf(label,data,dates){
    try{
        GLOBAL_GRAPH.destroy();
    }
    catch(e){
        
    }
     // X軸に使う日付
    let labels = dates;
    // Y軸に使う何かしらの数値
    let values = data;

    let config = {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                fill: false,
                lineTension: 0,
                borderColor: 'rgba(0, 0, 255, 0.5)',
                data: values
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }]
            }
        }
    };
    var canvas = document.getElementById('stage');
    var chart = new Chart(canvas, config);
    GLOBAL_GRAPH =chart;
    return chart;
}