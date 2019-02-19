

$(document).ready(function() {

    //Form validation



    $('.js-form').submit(function(e) {
        e.preventDefault();

        var form = $(this),
            requiredFields = form.find('.js-required-field'),
            statusElem = form.find('.js-form-status');

        requiredFields.each(function(i, item) {
            var text = $(item).val();

            if (text === '') {
                $(item).addClass('error');
            }else {
                $(item).removeClass('error');
            }
        });


        if (form.find('.error').length > 0) {
            statusElem.addClass('is-show');
        }else {
            statusElem.removeClass('is-show');
            swal("Ваше сообщение отправлено!", "...и еще какой-то текст");
            form.find('input,textarea').val('');
        }
    });


    // Yandex Maps

    if (typeof ymaps !== "undefined") {
        ymaps.ready(init);

        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [56.834717, 60.791888],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 13,
                controls: []
            });

            var myPlacemark = new ymaps.Placemark([56.834717, 60.791888], {
                iconCaption: 'Технопарк Университетский',
                iconCaptionMaxWidth: '500'
            }, {
                preset: 'islands#redIcon',

            });

            // Размещение геообъекта на карте.
            myMap.geoObjects.add(myPlacemark);

            myMap.behaviors.disable(['scrollZoom']);

        }
    } //end yandex maps



    // Header clone

    if (($("body").width() > 991) && ($("body").height() > 650)) {

        var headerClone = $(".header").clone().addClass("fixed-header");
        $('.header').before(headerClone);

        var topHeaderClone = $('.fixed-header');

        topHeaderClone.children('.header__top-line').remove();

        $(window).scroll(function () {

            // var percent = $(document).scrollTop() / (($(document).height() - $(window).height()) / 100);

            if ($(window).scrollTop() > 600) {
                $(".fixed-header").addClass("is-show");
                $(".footer__up").fadeIn();

            } else {
                $(".fixed-header").removeClass("is-show");
                $(".footer__up").fadeOut();

            }
        })
    } //end header clone





    $(".gamburger").on("click", function(e) {
        $(this).toggleClass("open");
        $(".header-menu__row").slideToggle();
    });

    $(".header-menu__search").on("click", function(e) {
        $(this).addClass("header-menu__search_active");
        $(".header-menu__close-search").show();
        if ($(".gamburger").is(':hidden')) {
            $(".header-menu__item").hide();
        } else {
            $(".gamburger").hide();
            $(".gamburger").removeClass('open');
            $(".header-menu__row").slideUp();
        }
    });

    var closedSearch = function() {
        $(".header-menu__search").removeClass("header-menu__search_active");
        $(".header-menu__close-search").hide();
        $(".header-menu__item").show();
        if ($(window).width() <= '991'){
            $(".gamburger").show();
        }
    }

    $(".header-menu__close-search").on("click", function(e) {
        closedSearch();
    });

    $(document).mouseup(function (e) {
        var container = $(".header-menu__search");
        if (container.has(e.target).length === 0) {
            closedSearch();
        }
    });

    var marginLeftContainer = parseFloat($(".header__big-container").css("margin-left"));

    $(".header-menu__link").hover (function(e) {
        $(".header-menu__drop-level").css("margin-left", "-" + marginLeftContainer + "px");
        $(".header-menu__drop-level").css("margin-right", "-" + marginLeftContainer + "px");
    });

    $(".banner__slider-nav").css("margin-right", marginLeftContainer + 15);

    var headerHeight = $('.header').height();
    $('.banner__slide').css('padding-top', headerHeight + 70);
    if ($(window).width() <= '991'){
        $('.banner__slide').css('padding-top', headerHeight + 10);
    }

    var navItems = $('.banner__nav-item');

    navItems.on('click', function(e) {
        var indexSlide = $(this).index();
        $('.slider-for').slick('slickGoTo', indexSlide,  false);
    });
    var parallaxMirror;
    $( document ).ready(function() {

        parallaxMirror = $('.parallax-mirror');
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnFocus: false,
            pauseOnHover: false
        });

        parallaxMirror.fadeOut(0);

        $(parallaxMirror[navItems.length - 1]).fadeIn(300);
        $('.slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            navItems.removeClass('banner__nav-item_active');
            $(navItems[nextSlide]).addClass('banner__nav-item_active');
            parallaxMirror.css('zIndex', '-100')
            parallaxMirror.fadeOut(300);
            $(parallaxMirror[navItems.length - nextSlide - 1]).css('zIndex', '-50');
            $(parallaxMirror[navItems.length - nextSlide - 1]).fadeIn(300);
        });

        $('.js-partners-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            dots: true,
            pauseOnFocus: false,
            pauseOnHover: false,
            prevArrow: '.js-partner-prev',
            nextArrow: '.js-partner-next',
            responsive: [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  }
                }
            ]
        });

        if ($(window).width() > 600) {
            $("#sticky").stick_in_parent({});
        }

        // Sliders

        $('.js-photogallery-main-slider').each(function( index ) {
            var slider = $(this),
                slidesLength = slider.find('.photogallery__slide').length;

            slider.attr('data-slider', index);

            slider.closest('.js-photogallery-slider').find('.js-photogallery-prev').attr('data-slider', index);
            slider.closest('.js-photogallery-slider').find('.js-photogallery-next').attr('data-slider', index);

            slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                infinite: true,
                // autoplay: true,
                // autoplaySpeed: 4000,
                prevArrow: '.js-photogallery-prev[data-slider="'+index+'"]',
                nextArrow: '.js-photogallery-next[data-slider="'+index+'"]',
                pauseOnFocus: false,
                pauseOnHover: false,
                asNavFor: '.js-photogallery-thumb-slider[data-slider="'+index+'"]',
            });


            var allSlideItem = slider.closest('.js-photogallery-slider').find('.js-slider-all');
            allSlideItem.text(slidesLength);

            slider.on('afterChange', function(event, slick, currentSlide) {
                var currentSlideItem = slider.closest('.js-photogallery-slider').find('.js-slider-current');

                console.log(currentSlideItem);

                currentSlideItem.text(+currentSlide + 1);
            })


        });




        $('.js-photogallery-thumb-slider').each(function( index ) {
            $(this).attr('data-slider', index);

            $(this).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: '.js-photogallery-main-slider[data-slider="'+index+'"]',
                focusOnSelect: true,
                responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      }
                    },
                ]
            });
        });


        $('.js-gallery-sm-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            prevArrow: '.js-gallery-sm-prev',
            nextArrow: '.js-gallery-sm-next',
            margin: 20,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                    breakpoint: 360,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  },
            ]
        });

        //end sliders


        // Function for scrolling tabs on mobile

        scrollWidth();

        function scrollWidth() {
            $('.js-scroll-parent').each(function(i, item) {
                var parent = $(item),
                    width = parent.innerWidth(),
                    scrollWidth = parent[0].scrollWidth,
                    arrow = parent.find('.js-scroll-arrow');

                if (scrollWidth > width &&  (scrollWidth - width) > 50) {
                    arrow.addClass('is-show');
                    parent.addClass('scroll-nowrap');
                }

                arrow.click(function() {
                    if (parent.hasClass('js-scroll-container')) content = parent;
                    else content = parent.find('.js-scroll-container');



                    content.animate({ scrollLeft: 200 }, 500);
                    arrow.hide();
                });
            });
        }


        // Tabs functional
        $('.js-tab-trigger').click(function() {
            var id = $(this).attr('data-tab'),
                content = $('.js-tab-content[data-tab="'+ id +'"]');

            $('.js-tab-trigger.is-active').removeClass('is-active');
            $(this).addClass('is-active');

            $('.js-tab-content.is-show').removeClass('is-show');
            content.addClass('is-show');
         });


        // For valid custom select styling
        setTimeout(function() {
            $('.page-filters select').styler({
                selectSmartPositioning: false
            });
        }, 100)



        // $('input[type="tel"]').keyup(function(event) {
        //     mask(event, 'input[type="tel"]')
        // });


        mask(event, 'input[type="tel"]')

    }); // end document onload


    // Dropdown function. Hide and show block at click
    $('.js-dropdown-trigger').click(function() {

        var parent = $(this).closest('.js-dropdown-block'),
            arrow = parent.find('.js-dropdown-arrow'),
            target = parent.find('.js-dropdown-target'),
            slideup = parent.find('.js-dropdown-slideup');

        target.slideToggle(0);
        arrow.toggleClass('reverse');

        slideup.click(function() {
            target.slideUp(0);
            arrow.removeClass('reverse');
        });
    });


    $('.about-work__header').on('click', function(e) {
        scrollHeight = $(window).height();
        $('html, body').animate({ scrollTop: scrollHeight - 30}, 500);
    });

    $('.footer-top__title').on('click', function(e) {
        $(".headlines").slideToggle();
        $(this).toggleClass('footer-top__title_close');
    });

    var workItem = $(".tabs-progress__tab-link");

    $(".tabs-progress__tab-link--active .tabs-progress__tab-content").show();

    workItem.on('click', function(e) {

        workItem.removeClass("tabs-progress__tab-link--active");
        $(this).addClass("tabs-progress__tab-link--active");

        var indexItem = $(this).parent().index();

        $('.tabs-progress__tab-content').fadeOut(400);
        $(".tabs-progress__progress-line").width((20 * (indexItem)) + "%");

        $(this).children('.tabs-progress__tab-content').fadeIn(400);
    });

    var workItem2 = $(".about-work__tab-link");
    $(".about-work__tab-link_active .about-work__tab-content").show();
    workItem2.on('click', function(e) {

        workItem2.removeClass("about-work__tab-link_active");
        $(this).addClass("about-work__tab-link_active");
        var indexItem = $(this).parent().index();
        $('.about-work__tab-content').fadeOut(400);
        $(".about-work__progress-line").width((20 * (indexItem)) + "%");
        $(this).children('.about-work__tab-content').fadeIn(400);
        console.log($(this).children('.about-work__tab-content'))
    });


    $(".footer__up").on('click', function() {
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 600);
        return false;
    });

    $('#video-modal').on('show.bs.modal', function (e) {
        $('#video-modal iframe').attr('src', $('#video-modal iframe').data('src'));
        })
        $('#video-modal').on('hidden.bs.modal', function (e) {
        $('#video-modal iframe').attr('data-src', $('#video-modal iframe').attr('src'));
        $('#video-modal iframe').attr('src', "");
    });

    if (document.fonts) {
        document.fonts.load("bold 16px Lato", "b").then(function() {

            $("body").css("opacity", "1").addClass("body-ready");
        });
    }

})


$(window).load(function() {
    $("body").css("opacity", "1");
});

//превращает кнопку в лоадер
function addLoaderInBtn(e) {
    $(e).css("color", "transparent").html($(e).html() + "<div class='loader'>" +
        "<span></span>" +
        "<span></span>" +
        "<span></span>" +
        "</div>");
}
function removeLoaderInBtn(e) {
    $(e).css("color", "").find(".loader").fadeOut(function() {
        $(e).find(".loader").remove();
    });
}
//делает высоту элементов одинаковой
function setHeight($e) {
    var h = 0;
    function a($e) {
        $($e).each(function(e) {
            if ($(this).outerHeight(true) > h) {
                h = $(this).outerHeight(true);
            }
        });
        $($e).outerHeight(h);
    }
    a($e);
    $(window).resize(function () {
        a($e);
    });
}