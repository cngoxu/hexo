/* global CONFIG */

(function() {
    function setCheckState(id, value){
        if(eval(value) === false){
            $(id).prop("checked", false);
        }else{
            $(id).prop("checked", true);
        }
    }
    var modal = jQuery('#modalSetting');
    modal.on('show.bs.modal', function() {
        let enable = localStorage.getItem("enable-pjax");
        setCheckState('#switch-pjax', enable)
        let play = localStorage.getItem("autoplay");
        setCheckState('#switch-play', play);
    });
    modal.on('hidden.bs.modal', function() {
        
    });

    $(document).ready(function(){
        let play = localStorage.getItem("autoplay");
        if(eval(play) === false) return;
        var interval = setInterval(function(){
            let aplayer = $(".aplayer-button")
            if(aplayer.length > 0){
                aplayer.click()
                clearInterval(interval)
            }
        }, 1000)
    })

})();
