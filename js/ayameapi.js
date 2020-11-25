

jQuery(function(){
    jQuery('#metatitle').autocomplete({
        source: function( req, res ) {
            jQuery.ajax({
                url: "https://ayameapi.yukkuriikouze.com/get_metatitle_search?limit=10&metatitle=" + encodeURIComponent(req.term),
                dataType: "json",
                success: function( data ) {
                    res(data);
                }
            });
        },
        autoFocus: true,
        delay: 100,
    });
});

function get_id_from_metatitle(metatitle){
    console.log('https://ayameapi.yukkuriikouze.com/get_id_from_metatitle?metatitle='+encodeURIComponent(metatitle))
    return fetch('https://ayameapi.yukkuriikouze.com/get_id_from_metatitle?metatitle='+encodeURIComponent(metatitle), {
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
function graph_drawing2() {
    var pageid = document.getElementById("pageid").value;
    var start_date = document.getElementById("start_date").value;
    var stop_date = document.getElementById("stop_date").value;
    if (isNaN(pageid)){
        wait_get_rate_from_fullname(pageid,start_date,stop_date);
    }else{
        wait_get_rate_from_id(pageid,start_date,stop_date);
    }
}

function graph_drawing(){
    const waitAsynchronousFunc = (async() => {
        var metatitle = document.getElementById("metatitle").value;
        var start_date = document.getElementById("start_date").value;
        var stop_date = document.getElementById("stop_date").value;
        const pageid = await get_id_from_metatitle(metatitle);
        console.log(pageid["id"]);
        wait_get_rate_from_id(pageid["id"],start_date,stop_date);
    })();

}



var GLOBAL_GRAPH ;




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