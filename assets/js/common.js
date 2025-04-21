//移除加载动画
var checker = setInterval(() =>{
    let box = document.getElementById('loading');
    if(box){
        box.style.display = 'none';
        clearInterval(checker)
    }
}, 1000)
// setTimeout( , ); // 👈️ time in milliseconds


//添加浏览器标题恶搞
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/assets/img/favicon.png");
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/assets/img/favicon.png");
        document.title = '(ฅ>ω<*ฅ) 噫又好啦 ~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});