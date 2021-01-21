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