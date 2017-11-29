var properties = {
	pagination: document.querySelectorAll("#pagination li"),
	container: document.querySelector("#slide ul"),
    currentPosition: 0,
	leftArrow: document.querySelector("#retroceder"),
	rightArrow: document.querySelector("#avanzar")
};

var methods = {
	startSlide: function () {
		for (var i = 0; i < properties.pagination.length; i++) {
			properties.pagination[i].addEventListener("click", methods.animation)
		}
		properties.leftArrow.addEventListener("click", methods.backPage);
		properties.rightArrow.addEventListener("click", methods.nextPage);
	},
	animation: function (item) {
        properties.currentPosition = item.target.parentNode.getAttribute("item") - 1;
		properties.container.style.left = - properties.currentPosition * 100 + "%";
        methods.resetPagination();
        methods.setPaginationIndicator(properties.currentPosition)
    },
    nextPage: function () {
        if (properties.container.style.left === "" || properties.container.style.left === "0%") {
            properties.container.style.left = "-100%";
            methods.resetPagination();
            methods.setPaginationIndicator(1);
        } else if (properties.container.style.left === "-300%") {
            properties.container.style.left = "";
            methods.resetPagination();
            methods.setPaginationIndicator(0);
        } else {
            var idx = properties.container.style.left.split("%")[0];
            properties.container.style.left = (idx - 100) + "%";
            methods.resetPagination();
            methods.setPaginationIndicator((properties.container.style.left.split("-")[1].replace("%", "")) / 100);
        }
    },
    backPage: function () {
        if (properties.container.style.left === "" || properties.container.style.left === "0%") {
            properties.container.style.left = "-300%";
            methods.resetPagination();
            methods.setPaginationIndicator(3);
        } else {
            var idx = properties.container.style.left.split("%")[0];
            properties.container.style.left = (parseInt(idx) + 100) + "%";
            methods.resetPagination();
            methods.setPaginationIndicator(parseInt(properties.container.style.left.split("%")[0].replace("-", "")) / 100);
        }
    },
    resetPagination: function () {
        for (var i = 0; i < properties.pagination.length; i++) {
            properties.pagination[i].style.opacity = '0.5';
        }
    },
    setPaginationIndicator: function (index) {
        properties.pagination[index].style.opacity = '1';
    }
};

methods.startSlide();