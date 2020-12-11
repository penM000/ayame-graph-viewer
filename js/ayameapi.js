jQuery(document).ready(function() {
    var date = new Date();
    document.getElementById("stop_date").value = date_to_str(date) ;
    date.setMonth(date.getMonth() - 6);
    document.getElementById("start_date").value = date_to_str(date);
    moment.locale("ja");
    // 〜処理〜
});


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
    jQuery('#fullname').autocomplete({
        source: function( req, res ) {
            jQuery.ajax({
                url: "https://ayameapi.yukkuriikouze.com/get_fullname_search?limit=10&fullname=" + encodeURIComponent(req.term),
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
function date_to_str(date){
    return date.getFullYear() + "-" 
        + ( "0" + ( date.getMonth() + 1) ).slice(-2) + "-"
        + ( "0" + ( date.getDate() ) ).slice(-2) ;
}

function get_id_from_key(mainkey,key){
    console.log("https://ayameapi.yukkuriikouze.com/get_id_from_"+mainkey+"?"+mainkey+"="+encodeURIComponent(key))
    return fetch("https://ayameapi.yukkuriikouze.com/get_id_from_"+mainkey+"?"+mainkey+"="+encodeURIComponent(key), {
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
function get_json_from_id(id){
    console.log("https://ayameapi.yukkuriikouze.com/get_latest_data_from_id?_id="+encodeURIComponent(id))
    return fetch("https://ayameapi.yukkuriikouze.com/get_latest_data_from_id?_id="+encodeURIComponent(id), {
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
        make_graf(id,ratedata,datelabels);
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

function graph_drawing(mainkey){
    const waitAsynchronousFunc = (async() => {
        var key = document.getElementById(mainkey).value;
        var start_date = document.getElementById("start_date").value;
        var stop_date = document.getElementById("stop_date").value;
        const pageid = await get_id_from_key(mainkey,key);
        console.log(pageid["id"]);
        wait_get_rate_from_id(pageid["id"],start_date,stop_date);
        var json = await get_json_from_id(pageid["id"]);
        console.log(json["tags"]);
        document.getElementById('json-viewer').innerHTML="タグ:"+json["tags"];
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
                        unit: 'day',
                        displayFormats: {
                            day: 'MM/DD'
                        }
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

