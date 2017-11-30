var Slide = {
    /**
     * Atributos
     * */
	pagination: document.querySelectorAll("#pagination li"),
	container: document.querySelector("#slide ul"),
    pos: 0,
    intervalName: 0,
    items: document.querySelectorAll("#slide ul li"),
	back: document.querySelector("#retroceder"),
	next: document.querySelector("#avanzar"),

    /**
     * Metodos
     * */
    initSlide: function () {
        /**
         * Agrega el evento clic a cada indicador del paginado
         * */
        for (var i = 0; i < Slide.pagination.length; i++) {
            /**
             * Cuando se hace clic a un indicador del paginado, va a esa imagen*/
            Slide.pagination[i].addEventListener("click", Slide.initPagination)
        }
        /**
         * Evento clic a cada flecha de navegacion
         * */
        Slide.next.addEventListener("click", Slide.nextPage);
        Slide.back.addEventListener("click", Slide.backPage);
        /**
         * Slide autimatico
         * */
        Slide.interval();
    },
    initPagination: function (item) {
        /**
         * Cuando se avanza o retrocede manualmente, se cancela el slide automatico, despues de 10seg de inactivdad, regresa el slide automatico
         * */
        Slide.resetInterval();
        /**
         * Se obtiene la posicion actual del slide
         * Se hace el cambio con animacion incluida
         * Se cambia el indicar del slide
         * */
        Slide.pos = item.target.parentNode.getAttribute("item") - 1;
        Slide.container.style.left = - Slide.pos * 100 + "%";
        Slide.setPaginationIndicator(Slide.pos);
        Slide.container.style.transition = ".7s left ease-in-out";
    },
    nextPage: function () {
        /**
         * Cuando se avanza o retrocede manualmente, se cancela el slide automatico, despues de 10seg de inactivdad, regresa el slide automatico
         * */
        Slide.resetInterval();

        /**
         * Validacion para que cuando este en la ultima imagen, regrese a la primera
         * */
        if (Slide.pos === Slide.items.length - 1) {
            Slide.pos = 0;
        } else {
            Slide.pos ++;
        }

        /**
         * Se obtiene la posicion actual del slide
         * Se hace el cambio con animacion incluida
         * Se cambia el indicar del slide
         * */
        Slide.container.style.left = Slide.pos * -100 + '%';
        Slide.setPaginationIndicator(Slide.pos);
        Slide.container.style.transition = ".7s left ease-in-out";
    },
    backPage: function () {
        /**
         * Cuando se avanza o retrocede manualmente, se cancela el slide automatico, despues de 10seg de inactivdad, regresa el slide automatico
         * */
        Slide.resetInterval();

        /**
         * Validacion para que cuando este en la primer imagen, regrese a la ultima
         * */
        if (Slide.pos === 0) {
            Slide.pos = Slide.items.length - 1;
        } else {
            Slide.pos --;
        }

        /**
         * Se obtiene la posicion actual del slide
         * Se hace el cambio con animacion incluida
         * Se cambia el indicar del slide
         * */
        Slide.container.style.left = Slide.pos * -100 + '%';
        Slide.setPaginationIndicator(Slide.pos);
        Slide.container.style.transition = ".7s left ease-in-out";
    },
    interval: function () {
        /**
         * Slide automatico
         * Cambia la imagen cada 3 segundos
         * */
        Slide.intervalName = setInterval(function() {
            if (Slide.pos === Slide.items.length - 1) {
                Slide.pos = 0;
            } else {
                Slide.pos ++;
            }

            Slide.container.style.left = Slide.pos * -100 + '%';
            Slide.setPaginationIndicator(Slide.pos);
            Slide.container.style.transition = ".7s left ease-in-out";
        }, 3000)
    },
    resetInterval: function () {
        /**
         * Limpia el intervalo automatico
         * */
        clearInterval(Slide.intervalName);

        /**
         * Despues de 10 segundos, inicia el Slide automatico
         * */
        setTimeout(function () {
            Slide.interval()
        }, 10000);
    },
    resetPagination: function () {
        /**
         * Cambia la opacidad de todos los indicadores
         * */
        for (var i = 0; i < Slide.pagination.length; i++) {
            Slide.pagination[i].style.opacity = '0.5';
            Slide.pagination[i].style.transition = ".7s opacity ease-in-out";
        }
    },
    setPaginationIndicator: function (index) {
        /**
         * Disminuye la opacidad de todos los indicadores
         * */
        Slide.resetPagination();
        /**
         * Aumenta la opacidad del indicador actual
         * */
        Slide.pagination[index].style.opacity = '1';
        Slide.pagination[index].style.transition = ".7s opacity ease-in-out";
    }
};

Slide.initSlide();