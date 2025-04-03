const cardss = document.querySelectorAll('.index-card')
if (cardss.length) {
    document.querySelector('.row').setAttribute('style', 'overflow: hidden;')
    const coefficient = document.documentElement.clientWidth > 768 ? .5 : .3
    const origin = document.documentElement.clientHeight - cardss[0].getBoundingClientRect().height * coefficient

    function throttle(fn, wait) {
        let timer = null;
        return function () {
        const context = this;
        const args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
            fn.apply(context, args);
            timer = null;
            }, wait)
        }
        }
    }

    function handle() {
        cardss.forEach(card => {
        card.setAttribute('style', `--state: ${(card.getBoundingClientRect().top - origin) < 0 ? 1 : 0};`)
        })
        //console.log(1)
    }

    document.addEventListener("scroll", throttle(handle, 100));
}