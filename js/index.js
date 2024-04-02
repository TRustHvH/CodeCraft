document.addEventListener('DOMContentLoaded', () => {
    
    /*********Cursor*********/
    const follow_cursor = () => { // объявляем функцию followCursor
        const el = document.querySelector('.follow-cursor') // ищем элемент, который будет следовать за курсором
        /*window.addEventListener("scroll", () =>{
            el.style.top = window.scrollY + "px"
        })*/
        window.addEventListener('mousemove',(e) => { // при движении курсора
            const target = e.target // определяем, где находится курсор
            const elements = [
                'a',
                'p',
                'img',
                'li',
                '.case-variable',
                '.cases-text-anim',
                '.divline',
                'input',
                'label',
                'span',
                'h1',
                '.form-title',
                'textarea',
                '.popup-menu a'
            ]
            if (!target) return
            if (target.closest(elements)) { // если курсор наведён на ссылку
                el.classList.add('follow-cursor_active') // элементу добавляем активный класс
            } else { // иначе
                el.classList.remove('follow-cursor_active') // удаляем активный класс
            }
            if (target.closest('footer')){
                el.classList.add('follow-cursor-footer')
                if (target.closest(elements)) { // если курсор наведён на ссылку
                    el.classList.add('follow-cursor-footer_active') // элементу добавляем активный класс
                } else { // иначе
                    el.classList.remove('follow-cursor-footer_active') // удаляем активный класс
                }
            }
            else{
                el.classList.remove('follow-cursor-footer')
            }
            if(target.closest(".popup-menu")){
                el.classList.add("follow-cursor-header")
                if (target.closest(elements)) { // если курсор наведён на ссылку
                    el.classList.add('follow-cursor-header_active') // элементу добавляем активный класс
                } else { // иначе
                    el.classList.remove('follow-cursor-header_active') // удаляем активный класс
                }
            }
            else{
                el.classList.remove("follow-cursor-header")
            }
            el.style.left = e.pageX + 'px' // задаём элементу позиционирование слева
            el.style.top = e.pageY + 'px' // задаём элементу позиционирование сверху
        })
    }
    follow_cursor()


    /*********Elements class animations*********/
    
    function animateElements(elements, className) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const element = entry.target;

                if (entry.isIntersecting) {
                    element.classList.add(className);
                }
            });
        });

        elements.forEach((element) => observer.observe(element));
    }

    animateElements(document.querySelectorAll('.word'), "word-anim");
    animateElements(document.querySelectorAll('.company'), "comp-anim")
    animateElements(document.querySelectorAll(".form-title"), "form-titled")
    animateElements(document.querySelectorAll(".case"), "comp-anim")


    /*********Navigation menu*********/
    
    const popup = document.getElementById("popup-menu")
    const popup_open = document.getElementsByClassName("popup-opening")
    Array.from(popup_open).forEach(item => {
        item.addEventListener("click", () => {
            if (!popup.classList.contains("popup-open")) {
                popup.style.display = "flex"
                popup.classList.add("popup-open");
            } else {
                popup.style.display = "flex"
                popup.classList.remove("popup-open");
                popup.classList.add("popup-close");
                setTimeout(function () {
                    popup.style.display = "none"
                    popup.classList.remove("popup-close");
                }, 200)
            }
        });
    });


    /*********Symbol counter for textarea*********/
    
    let textarea = document.getElementById("tb1");
    let char_count = document.getElementById("counter");

    textarea.addEventListener("input", function() {
        char_count.textContent = textarea.value.length;
    });
})


/*********Smooth scroll*********/

SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 800,
    // Размер шага в пикселях
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Поддержка тачпада
    touchpadSupport: true,
})


/*********Start animation*********/

let current = $(window).scrollTop();
let total = $(window).height() - current;
let curr_position = -247.5;
let track_length = 300;
$(window).scroll(function (event) {
    if ($(window).scrollTop() >= 800/* && $(window).scrollTop() < 1400*/) {
        $("header").addClass("header-bg");
    } else {
        $("header").removeClass("header-bg");
    }
    if(window.innerWidth < 1280) return;
    $(".krutilka, .container, .start").css('transition', 'all 0.1s ease');
    current = $(window).scrollTop();
    let new_position = track_length * (current / total);
    let animation = current * 0.124 + 'vw'; // Используем vw для адаптивной анимации
    let new_size = 1438 - current * (580 / $(document).height()) * 10; // Изменение размера krutilka
    let new_blur = current * (8 / $(document).height()) * 8.5; // Изменение уровня размытия
    // Конвертация значения top из px в vw
    let top_in_vw = (curr_position + new_position * 4.90) / $(window).width() * 100;

    if ($(window).scrollTop() <= 800) {
        $(".krutilka").css({top: top_in_vw + 'vw', width: new_size + 'px', height: new_size + 'px', filter: "blur(" + (8 - new_blur) + "px)", transform: "translateX(calc(" + animation + "/5)"});
        $(".container").css({transform: "translateX(-100%) translateX(" + animation + ")"});
        $(".start").css({transform: "translateX(0%) translateX(" + animation + ")"});
    }
});