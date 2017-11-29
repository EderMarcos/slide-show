var attri = {
	pagination: document.querySelectorAll("#pagination li"),
	container: document.querySelector("#slide ul"),
    pos: 0,
    interval: 0,
    items: document.querySelectorAll("#slide ul li"),
	back: document.querySelector("#retroceder"),
	next: document.querySelector("#avanzar")
};

var methods = {
	startSlide: function () {
		for (var i = 0; i < attri.pagination.length; i++) {
			attri.pagination[i].addEventListener("click", methods.pagination)
		}
		attri.next.addEventListener("click", methods.nextPage);
		attri.back.addEventListener("click", methods.backPage);
		methods.interval();
	},
	pagination: function (item) {
        methods.resetInterval();
        attri.pos = item.target.parentNode.getAttribute("item") - 1;
		attri.container.style.left = - attri.pos * 100 + "%";
        methods.setPaginationIndicator(attri.pos);
        attri.container.style.transition = ".7s left ease-in-out";
    },
    nextPage: function () {
        methods.resetInterval();

	    if (attri.pos === attri.items.length - 1) {
	        attri.pos = 0;
        } else {
            attri.pos ++;
        }

        attri.container.style.left = attri.pos * -100 + '%';
        methods.setPaginationIndicator(attri.pos);
        attri.container.style.transition = ".7s left ease-in-out";
    },
    backPage: function () {
        methods.resetInterval();

        if (attri.pos === 0) {
            attri.pos = attri.items.length - 1;
        } else {
            attri.pos --;
        }

        attri.container.style.left = attri.pos * -100 + '%';
        methods.setPaginationIndicator(attri.pos);
        attri.container.style.transition = ".7s left ease-in-out";
    },
    interval: function () {
        attri.interval = setInterval(function() {
            if (attri.pos === attri.items.length - 1) {
                attri.pos = 0;
            } else {
                attri.pos ++;
            }

            attri.container.style.left = attri.pos * -100 + '%';
            methods.setPaginationIndicator(attri.pos);
            attri.container.style.transition = ".7s left ease-in-out";
        }, 3000)
    },
    resetInterval: function () {
        clearInterval(attri.interval);

        setTimeout(function () {
           methods.interval()
        }, 10000);
    },
    resetPagination: function () {
        for (var i = 0; i < attri.pagination.length; i++) {
            attri.pagination[i].style.opacity = '0.5';
            attri.pagination[i].style.transition = ".7s opacity ease-in-out";
        }
    },
    setPaginationIndicator: function (index) {
        methods.resetPagination();
        attri.pagination[index].style.opacity = '1';
        attri.pagination[index].style.transition = ".7s opacity ease-in-out";
    }
};

methods.startSlide();