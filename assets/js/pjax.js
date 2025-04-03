//<script src="https://cdn.cbd.int/pjax@0.2.8/pjax.min.js"></script>

////let pjaxSelectors = ["head > title","#config-diff","#body-wrap","#rightside-config-hide","#rightside-config-show",".js-pjax"];
(function() {
    let enable = localStorage.getItem("enable-pjax");
    if(eval(enable) === false) return;
    
    Fluid.utils.createScript('/assets/js/DPlayer.min.js')
    var box = document.getElementById('loading');
    
    var pjaxSelectors = ["head > title", "#web_bg", ".header-inner", "#container", ".pjax-reload"]

    var pjax = new Pjax({
        elements: 'a:not([target="_blank"])',
        selectors: pjaxSelectors,
        cacheBust: false,
        analytics: false,
        scrollRestoration: false
    })

    document.addEventListener('pjax:send', function () {
        box.style.display = 'flex'
    })

    document.addEventListener('pjax:complete', function () {
        //console.log("pjax complete")
        Fluid.events.registerScrollTopArrowEvent();
        Fluid.events.registerImageLoadedEvent();
        if($(".scroll-down-bar").length > 0){
            Fluid.events.registerScrollDownArrowEvent();
        }
    //   window.refreshFn()
        box.style.display = 'none';
        //Fluid.boot.registerEvents();
        document.querySelectorAll('script[data-pjax]').forEach(item => {
            const newScript = document.createElement('script')
            const content = item.text || item.textContent || item.innerHTML || ""
            Array.from(item.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
            newScript.appendChild(document.createTextNode(content))
            item.parentNode.replaceChild(newScript, item)
        })
    })

    document.addEventListener('pjax:error', e => {
        if (e.request.status === 404) {
            pjax.loadUrl('/404.html')
        }
    })

    document.addEventListener('pjax:success', e => {
        // console.log("pjax sucess")
        if($(".mermaid").length > 0){
            let i = setInterval(function(){
                if("mermaid" in window){
                    mermaid.init()
                    clearInterval(i)
                }
            }, 1000)
        }        
    })
})();