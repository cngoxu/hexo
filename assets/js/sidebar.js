// $(document).ready(
function initSidebar() {
    
    //通过这个判断是否文章页面
    function test(){
        if(location.pathname.startsWith("/posts/")){
            return true;
        }
        return false;
    }
    
    pjaxReloadSidebar = function () {
        if(test() != true) return;

        var $navToc = $('.sidebar-nav-bulletin')
        var $navOv = $('.sidebar-nav-author')
        var $tocWrap = $('.sidebar-bulletin')
        var $overview = $('.sidebar-author')

        $navToc.on('click', function (e) {
        e.stopPropagation()
        if ($(this).hasClass('current')) {
            return
        }
        $navToc.addClass('current')
        $navOv.removeClass('current')
        $tocWrap.css('display', 'block')
        $overview.css('display', 'none')
        })
        $navOv.on('click', function (e) {
        e.stopPropagation()
        if ($(this).hasClass('current')) {
            return
        }
        $navOv.addClass('current')
        $navToc.removeClass('current')
        $tocWrap.css('display', 'none')
        $overview.css('display', 'block')
        })


        var $navTag = $('.sidebar-nav-tag')
        var $navRelated = $('.sidebar-nav-related')
        var $navLatest = $('.sidebar-nav-latest')
        var $tagCloud = $('.sidebar-tag')
        var $relatedPost = $('.sidebar-related')
        var $latestPost = $('.sidebar-latest')

        $navTag.on('click', function (e) {
        e.stopPropagation()
        if ($(this).hasClass('current')) {
            return
        }
        $navTag.addClass('current')
        $navRelated.removeClass('current')
        $navLatest.removeClass('current')
        $tagCloud.css('display', 'block')
        $relatedPost.css('display', 'none')
        $latestPost.css('display', 'none')
        })
        $navRelated.on('click', function (e) {
        e.stopPropagation()
        if ($(this).hasClass('current')) {
            return
        }
        $navRelated.addClass('current')
        $navTag.removeClass('current')
        $navLatest.removeClass('current')
        $relatedPost.css('display', 'block')
        $tagCloud.css('display', 'none')
        $latestPost.css('display', 'none')
        })
        $navLatest.on('click', function (e) {
            e.stopPropagation()
            if ($(this).hasClass('current')) {
            return
            }
            $navLatest.addClass('current')
            $navTag.removeClass('current')
            $navRelated.removeClass('current')
            $latestPost.css('display', 'block')
            $tagCloud.css('display', 'none')
            $relatedPost.css('display', 'none')
        })
    }

    pjaxReloadSidebar()

    function readProgress () {
        if(test() != true) return;
        var postScrollTop;
        try{
            postScrollTop = $('.post-content')[0].getBoundingClientRect().top * -1 + $(window).height()/2
        }catch(err){
            return;
        }
         
        var postReadingHeight = $('.post-content')[0].getBoundingClientRect().height
        var percent = parseInt((postScrollTop / postReadingHeight) * 100)
        percent = percent > 100 ? 100 : percent < 0 ? 0 : percent
        //console.log(percent)
        
        $('.sidebar-reading-info__num').text(percent)
    }
    

    $(window).on(
        'scroll',
        function () {
            readProgress()
        }
    )
}
initSidebar()
// })
