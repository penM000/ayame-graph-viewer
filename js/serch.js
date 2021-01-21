function checkFocus(){
    var active_id = document.activeElement.id;
    var attention = document.getElementById("attention");
    if(active_id == "fullname_mode" || active_id == "metatitle_mode"){
        if(attention.classList.contains("display_off")){
            attention.classList.remove("display_off");
            attention.classList.add("display_on");
        }
    }
    else{
        if(attention.classList.contains("display_on")){
            attention.classList.remove("display_on");
            attention.classList.add("display_off");
        }
    }
}
setInterval(checkFocus, 300);

var mode_change_btn = document.getElementById("mode_change");
var mode_change = function(){
    var fullname = document.getElementById("fullname_mode");
    var metatitle = document.getElementById("metatitle_mode");

    fullname.classList.toggle("display_none");
    metatitle.classList.toggle("display_none");
}

mode_change_btn.onclick = mode_change;