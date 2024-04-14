/*Preloader */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM is ready!");

    window.addEventListener('load', function () {
        console.log("Window loaded");
        $('.preloader').delay(850).fadeOut('slow', function() {
            $('body').css({
                'overflow': 'visible'
            });
        });
    });
});

/*sticky-header*/

$(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".sticky-header").removeClass("sticky-bar");
    } else {
        $(".sticky-header").addClass("sticky-bar");
    }
});

/*Burger-menu*/

$('.mobile-menu__ready').on('click',function(e) {
    e.preventDefault();
    $('.mobile-menu__ready').toggleClass('change')
    $('.mobile__menu-list').toggleClass('active');
})

$('.nav__menu li a').on('click',function(e) {
    e.preventDefault();
    $('.mobile-menu__ready').removeClass('change')
    $('.mobile__menu-list').hide();
})

/* Modal-window */
const modal = document.querySelector('.telephone-wrapper-modal')
const corpnumber = document.querySelector('.telephone-number')

const telephoneBtn = document.querySelector('.telephone-logo');
const closeBtn = document.querySelector('.telephone-contacts__form_index-del')

telephoneBtn.addEventListener('click',function(e){
    e.preventDefault();
    modal.classList.add('active');
    corpnumber.classList.add('active');
});

function closeModal(){
    modal.classList.remove('active');
    corpnumber.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);


/*Script for single-product*/

$(document).ready(function () {
    // Объявим переменную cartItemCount в более широкой области видимости
    var cartItemCount = 0;

    $('.Single-product__goods-atributes_colors .atributes__color').on('click', function () {
        var color = $(this).data('color');
        console.log('Выбран цвет:', color);
        activeColor(color);
    });

    $('.Single-product__goods-atributes_size .atributes__size').on('click', function () {
        var size = $(this).text();
        console.log('Выбран размер:', size);
        activeSize(size);
    });

    $('.add-to-cart__btn-AddToCart').on('click', function (e) {
        e.preventDefault();
        var selectedColor = $('.Single-product__goods-atributes_colors .atributes__color.active').data('color');
        var selectedSize = $('.Single-product__goods-atributes_size .atributes__size.active span').text();
        console.log('Выбран цвет для добавления в корзину:', selectedColor);
        console.log('Выбран размер для добавления в корзину:', selectedSize);
        simulateAddToCart(selectedColor, selectedSize);
    });

    function activeColor(color) {
        $('.Single-product__goods-atributes_colors .atributes__color').removeClass('active');
        $('.Single-product__goods-atributes_colors .atributes__color[data-color="' + color + '"]').addClass('active');
    }

    function activeSize(size) {
        $('.Single-product__goods-atributes_size .atributes__size').removeClass('active');
        $('.Single-product__goods-atributes_size .atributes__size:contains(' + size + ')').addClass('active');
    }

    function simulateAddToCart(color, size) {
        var selectedProduct = {
            name: 'Свитшот Sweet Shot',
            price: 311,
            color: color,
            size: size,
        }
        var cart = {
            items: [],
            total: 0,
        };

        // Добавляем товар в корзину
        cart.items.push(selectedProduct);
        cart.total += selectedProduct.price;

        // Выводим сообщение в консоль
        console.log('Товар успешно добавлен в корзину:', selectedProduct);

        // Выводим информацию о корзине
        console.log('Текущее состояние корзины:', cart);

        // Увеличиваем количество товаров в корзине
        cartItemCount += cart.items.length;

        // После добавления товара вызываем updateCartDisplay для обновления отображения корзины
        updateCartDisplay();
    }

    function updateCartDisplay() {
        console.log('Количество товаров в корзине:', cartItemCount);

        var $cartNumb = $('.round__cart-numb');
        var $cartIcon = $('.navigation__cart');

        // Проверяем, есть ли товары в корзине
        if (cartItemCount > 0) {
            $cartNumb.text(cartItemCount);
            $cartNumb.addClass('active'); // Добавляем класс для видимости
        } else {
            $cartNumb.removeClass('active'); // Убираем класс для невидимости
        }

        // Обновляем отображение корзины в верхнем меню
        $cartIcon.html('<div class="round__cart-numb active"><span>' + cartItemCount + '</span></div><img src="Assets/gallery/shopping-bags.svg" alt="корзина">');
    }
});


/*validator */
$(document).ready(function() {
    $('.telephone-feedback-form__btn').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
  })
  $.validator.addMethod("regex", function(value, element, regexp) {
    var regExsp = new RegExp(regexp);
    return this.optional(element) || regExsp.test(value);
  },"Please check your input."
  );
  
  $(".telephone-feedback__form").validate({
    rules: {
      firstName: {
          required: true,
          regex : "[A-Za-z]{1,32}" 
      },
      Email:{
        required: true,
        regex : "[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@"
      },
      phNumber: {
        digits : true,
        required: true,
        minlength: 10,
        maxlength: 11,
        regex: "[0-9]+"
    }
    },
    messages: {
        firstName: "Пожалуйста введите ваше имя",
        Email: "Пожалуйста введите ваш E-mail",
        phNumber: "Пожалуйста введите правильный номер"
    },
    submitHandler: function(form) {
        $('.preloader').fadeIn(850);
        $.ajax({
            type: 'POST',
            url: 'Form to order Callback.php',
            data: $(form).serialize(),
        })
        .done(function(response) {
            console.log(response);
            $('.telephone__modal-window').fadeOut();
            $('.form__succes-message').fadeIn();
        })
        .always(function() {
            console.log('Always');
            setTimeout(function() {
                $('.preloader').fadeOut(6000);
                form.reset();
            }, 1000);
        })
        .fail(function(error) {
            console.error(error);
        });
        return false
    }
}) 
    $('.succes-message__close-btn').on('click', function(e) {
        e.preventDefault();
        $('.form__succes-message').fadeOut();
        $('.preloader').fadeOut();
        $('.telephone-number').removeClass('active');
        $('.telephone-wrapper-modal').removeClass('active');
        $('.telephone__modal-window').fadeIn();
        /*setTimeout(function() {
        window.location.href = 'Homepage.html';
        }, 300);*/
      });

/* Slick slider */

$(document).ready(function(){
        // Инициализируем слайдеры//
        $('.offer__description-slider').slick({
          arrows: false,
          dots: true,
          slidesToShow: 1,
          asNavFor: '.offer__foto-slider'
        });
    
        $('.offer__foto-slider').slick({
          arrows: false,
          dots: false,
          slidesToShow: 1,
          asNavFor: '.offer__description-slider'
        });
    
    })

    $(document).ready(function(){
        // Плавная прокрутка при нажатии на стрелку
        $('.scroll-down').on('click', function(e){
          e.preventDefault();
          $('html, body').animate({
            scrollTop: $('.new-collection-title').offset().top
          }, 1000);
        })
    });

document.addEventListener('DOMContentLoaded', function () {
    var paginationTabs = document.querySelectorAll('.pagination__tab');
    var scrollRightButton = document.querySelector('.pagination__scroll-right');
    var productFeeds = document.querySelectorAll('.shop__product-feed');
    var productsTexts = document.querySelectorAll('.shop__products_text');

    paginationTabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
            if (tab.classList.contains('active')) {
                return;
            }

            productFeeds.forEach(function (feed) {
                feed.classList.remove('active');
            });

            productsTexts.forEach(function (text) {
                text.classList.remove('active');
            });

            paginationTabs.forEach(function (paginationTab) {
                paginationTab.classList.remove('active');
            });

            productFeeds[index].classList.add('active');
            productsTexts[index].classList.add('active');
            tab.classList.add('active');
        });
    });

    var pagTabIndexes = document.querySelectorAll('.pag__tab_index');
    pagTabIndexes.forEach(function (tabIndex, index) {
        tabIndex.addEventListener('click', function () {
            if (index === 0) {
                resetToInitialState();
            } else {
                // Добавьте логику для других вкладок пагинации, если необходимо
            }
        });
    });

    scrollRightButton.addEventListener('click', function () {
        // Ваша логика для прокрутки вправо
        // ...

        // После прокрутки обновите активные классы или что-то еще
        // ...

        // Пример: переключение на следующую страницу
        var activeTabIndex = Array.from(paginationTabs).findIndex(tab => tab.classList.contains('active'));
        if (activeTabIndex < paginationTabs.length - 1) {
            resetToInitialState();
            paginationTabs[activeTabIndex + 1].click();
        }
    });

    // Используем делегирование событий для обработчика сброса в начальное состояние
    document.querySelector('.pagination__tab.active .pag__tab_index').addEventListener('click', function (e) {
        if (e.target.classList.contains('pag__tab_index')) {
            resetToInitialState();
        }
    });

    function resetToInitialState() {
        productFeeds.forEach(function (feed) {
            feed.classList.remove('active');
        });

        productsTexts.forEach(function (text) {
            text.classList.remove('active');
        });

        paginationTabs.forEach(function (tab) {
            tab.classList.remove('active');
        });

        productFeeds[0].classList.add('active');
        productsTexts[0].classList.add('active');
        paginationTabs[0].classList.add('active');
    }
});

$(document).ready(function() {
    $('#select1').niceSelect();
  });

/*Slider */

const   prev = document.querySelector('.slider__scroll-right'),
       next = document.querySelector('.slider__scroll-left'),
        slides = document.querySelectorAll('.gallery__foto'),
        lines = document.querySelectorAll('.gallery__line_scroll');


let index = 0;

const activeSlide = n => {
    for(gallery__foto of slides){
        gallery__foto.classList.remove('active');
    }
    slides[n].classList.add('active');
}

const activeLine = n => {
    for(gallery__line_scroll of lines){
        gallery__line_scroll.classList.remove('active');
    }
    lines[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeLine(ind);
}

const nextSlide = () => {
    if(index == slides.length - 1){
        index = 0;
        prepareCurrentSlide (index);
    } else{
        index++;
        prepareCurrentSlide (index);
    }
};

const prevSlide = () => {
    if(index == 0){
        index = slides.length - 1;
        prepareCurrentSlide (index);
    } else{
        index--;
        prepareCurrentSlide (index);
    }
};

lines.forEach((item,indexSquare) =>{
    item.addEventListener('click', () =>{
        index = indexSquare;
        prepareCurrentSlide(index);
    })
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


