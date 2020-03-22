/*
 *  jQuery special_effectsCarousel v1.3.3
 *  www.mycodes.net
 */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.special_effectsCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.special_effects) {
                        if (data.special_effects.hasOwnProperty(i)) {
                            content += data.special_effects[i].step;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data("special_effects-originalStyles", base.$elem.attr("style"));
            base.$elem.data("special_effects-originalClasses", base.$elem.attr("class"));

            base.$elem.css({opacity: 0});
            base.orignalsteps = base.options.steps;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$usersteps = base.$elem.children();
            base.stepsAmount = base.$usersteps.length;
            base.wrapsteps();
            base.$special_effectssteps = base.$elem.find(".special_effects-step");
            base.$special_effectsWrapper = base.$elem.find(".special_effects-wrapper");
            base.playDirection = "next";
            base.prevstep = 0;
            base.prevArr = [0];
            base.currentstep = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updatesteps();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.special_effectsStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".special_effects-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisiblesteps();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updatesteps();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapsteps : function () {
            var base = this;
            base.$usersteps.wrapAll("<div class=\"special_effects-wrapper\">").wrap("<div class=\"special_effects-step\"></div>");
            base.$elem.find(".special_effects-wrapper").wrap("<div class=\"special_effects-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".special_effects-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updatesteps : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singlestep === true) {
                base.options.steps = base.orignalsteps = 1;
                base.options.stepsCustom = false;
                base.options.stepsDesktop = false;
                base.options.stepsDesktopSmall = false;
                base.options.stepsTablet = false;
                base.options.stepsTabletSmall = false;
                base.options.stepsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.stepsDesktop[0] || base.orignalsteps)) {
                base.options.steps = base.orignalsteps;
            }
            if (base.options.stepsCustom !== false) {
                //Reorder array by screen size
                base.options.stepsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.stepsCustom.length; i += 1) {
                    if (base.options.stepsCustom[i][0] <= width) {
                        base.options.steps = base.options.stepsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.stepsDesktop[0] && base.options.stepsDesktop !== false) {
                    base.options.steps = base.options.stepsDesktop[1];
                }

                if (width <= base.options.stepsDesktopSmall[0] && base.options.stepsDesktopSmall !== false) {
                    base.options.steps = base.options.stepsDesktopSmall[1];
                }

                if (width <= base.options.stepsTablet[0] && base.options.stepsTablet !== false) {
                    base.options.steps = base.options.stepsTablet[1];
                }

                if (width <= base.options.stepsTabletSmall[0] && base.options.stepsTabletSmall !== false) {
                    base.options.steps = base.options.stepsTabletSmall[1];
                }

                if (width <= base.options.stepsMobile[0] && base.options.stepsMobile !== false) {
                    base.options.steps = base.options.stepsMobile[1];
                }
            }

            //if number of steps is less than declared
            if (base.options.steps > base.stepsAmount && base.options.stepsScaleUp === true) {
                base.options.steps = base.stepsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentstep);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendstepsSizes : function () {
            var base = this,
                roundPages = 0,
                laststep = base.stepsAmount - base.options.steps;

            base.$special_effectssteps.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.stepWidth})
                    .data("special_effects-step", Number(index));

                if (index % base.options.steps === 0 || index === laststep) {
                    if (!(index > laststep)) {
                        roundPages += 1;
                    }
                }
                $this.data("special_effects-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$special_effectssteps.length * base.stepWidth;

            base.$special_effectsWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendstepsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.stepWidth = Math.round(base.$elem.width() / base.options.steps);
        },

        max : function () {
            var base = this,
                maximum = ((base.stepsAmount * base.stepWidth) - base.options.steps * base.stepWidth) * -1;
            if (base.options.steps > base.stepsAmount) {
                base.maximumstep = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumstep = base.stepsAmount - base.options.steps;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                step,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.stepsAmount; i += 1) {
                elWidth += base.stepWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    step = $(base.$special_effectssteps[i]);
                    roundPageNum = step.data("special_effects-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.special_effectsControls = $("<div class=\"special_effects-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"special_effects-buttons\"/>");
            base.special_effectsControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "special_effects-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "special_effects-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.special_effectsControls mousedown.special_effectsControls", "div[class^=\"special_effects\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.special_effectsControls mouseup.special_effectsControls", "div[class^=\"special_effects\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("special_effects-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"special_effects-pagination\"/>");
            base.special_effectsControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.special_effectsControls mouseup.special_effectsControls", ".special_effects-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("special_effects-page")) !== base.currentstep) {
                    base.goTo(Number($(this).data("special_effects-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                laststep,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.stepsAmount - base.stepsAmount % base.options.steps;

            for (i = 0; i < base.stepsAmount; i += 1) {
                if (i % base.options.steps === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        laststep = base.stepsAmount - base.options.steps;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "special_effects-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "special_effects-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("special_effects-page", lastPage === i ? laststep : i);
                    paginationButton.data("special_effects-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".special_effects-page").each(function () {
                if ($(this).data("special_effects-roundPages") === $(base.$special_effectssteps[base.currentstep]).data("special_effects-roundPages")) {
                    base.paginationWrapper
                        .find(".special_effects-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentstep === 0 && base.maximumstep === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentstep === 0 && base.maximumstep !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentstep === base.maximumstep) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentstep !== 0 && base.currentstep !== base.maximumstep) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.special_effectsControls) {
                if (base.options.steps >= base.stepsAmount) {
                    base.special_effectsControls.hide();
                } else {
                    base.special_effectsControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.special_effectsControls) {
                base.special_effectsControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentstep += base.options.scrollPerPage === true ? base.options.steps : 1;
            if (base.currentstep > base.maximumstep + (base.options.scrollPerPage === true ? (base.options.steps - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentstep = 0;
                    speed = "rewind";
                } else {
                    base.currentstep = base.maximumstep;
                    return false;
                }
            }
            base.goTo(base.currentstep, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentstep > 0 && base.currentstep < base.options.steps) {
                base.currentstep = 0;
            } else {
                base.currentstep -= base.options.scrollPerPage === true ? base.options.steps : 1;
            }
            if (base.currentstep < 0) {
                if (base.options.rewindNav === true) {
                    base.currentstep = base.maximumstep;
                    speed = "rewind";
                } else {
                    base.currentstep = 0;
                    return false;
                }
            }
            base.goTo(base.currentstep, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumstep) {
                position = base.maximumstep;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentstep = base.special_effects.currentstep = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.steps === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singlestepTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumstep || position === -1) {
                position = base.maximumstep;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentstep = base.special_effects.currentstep = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentstep);
            base.prevstep = base.special_effects.prevstep = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevstep !== base.currentstep) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevstep !== base.currentstep) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$special_effectsWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$special_effectsWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$special_effectsWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$special_effectsWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$special_effectsWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$special_effectsWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.special_effects mousedown.special_effects",
                    "touchmove.special_effects mousemove.special_effects",
                    "touchend.special_effects touchcancel.special_effects mouseup.special_effects"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.special_effects",
                    "touchmove.special_effects",
                    "touchend.special_effects touchcancel.special_effects"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.special_effects",
                    "mousemove.special_effects",
                    "mouseup.special_effects"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.special_effects", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.stepsAmount <= base.options.steps) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$special_effectsWrapper.hasClass("grabbing")) {
                    base.$special_effectsWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.special_effects");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    special_effectsStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$special_effectsWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.special_effects.dragDirection = "left";
                } else {
                    base.dragDirection = base.special_effects.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        special_effectsStopEvent = handlers.pop();
                        handlers.splice(0, 0, special_effectsStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".special_effects-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closeststep();

            if (newPosition > base.maximumstep) {
                base.currentstep = base.maximumstep;
                newPosition  = base.maximumstep;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentstep = 0;
            }
            return newPosition;
        },
        closeststep : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.stepWidth / 20) > array[i + 1] && goal - (base.stepWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentstep = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentstep = i;
                    }
                } else if (goal + (base.stepWidth / 20) < v && goal + (base.stepWidth / 20) > (array[i + 1] || array[i] - base.stepWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentstep = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentstep = i + 1;
                    }
                }
            });
            return base.currentstep;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("special_effects.next", function () {
                base.next();
            });
            base.$elem.on("special_effects.prev", function () {
                base.prev();
            });
            base.$elem.on("special_effects.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("special_effects.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("special_effects.goTo", function (event, step) {
                base.goTo(step);
            });
            base.$elem.on("special_effects.jumpTo", function (event, step) {
                base.jumpTo(step);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $step,
                stepNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.stepsAmount; i += 1) {
                $step = $(base.$special_effectssteps[i]);

                if ($step.data("special_effects-loaded") === "loaded") {
                    continue;
                }

                stepNumber = $step.data("special_effects-step");
                $lazyImg = $step.find(".lazyspecial_effects");

                if (typeof $lazyImg.data("src") !== "string") {
                    $step.data("special_effects-loaded", "loaded");
                    continue;
                }
                if ($step.data("special_effects-loaded") === undefined) {
                    $lazyImg.hide();
                    $step.addClass("loading").data("special_effects-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = stepNumber >= base.currentstep;
                } else {
                    follow = true;
                }
                if (follow && stepNumber < base.currentstep + base.options.steps && $lazyImg.length) {
                    base.lazyPreload($step, $lazyImg);
                }
            }
        },

        lazyPreload : function ($step, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $step.data("special_effects-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$special_effectssteps[base.currentstep]).find("img"),
                iterations;

            function addHeight() {
                var $currentstep = $(base.$special_effectssteps[base.currentstep]).height();
                base.wrapperOuter.css("height", $currentstep + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisiblesteps : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$special_effectssteps.removeClass("active");
            }
            base.visiblesteps = [];
            for (i = base.currentstep; i < base.currentstep + base.options.steps; i += 1) {
                base.visiblesteps.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$special_effectssteps[i]).addClass("active");
                }
            }
            base.special_effects.visiblesteps = base.visiblesteps;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "special_effects-" + className + "-out";
            base.inClass = "special_effects-" + className + "-in";
        },

        singlestepTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentstep = base.$special_effectssteps.eq(base.currentstep),
                $prevstep = base.$special_effectssteps.eq(base.prevstep),
                prevPos = Math.abs(base.positionsInArray[base.currentstep]) + base.positionsInArray[base.prevstep],
                origin = Math.abs(base.positionsInArray[base.currentstep]) + base.stepWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$special_effectsWrapper
                .addClass('special_effects-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevstep
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevstep.off(animEnd);
                    base.clearTransStyle($prevstep, outClass);
                });

            $currentstep
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentstep.off(animEnd);
                    base.clearTransStyle($currentstep, inClass);
                });
        },

        clearTransStyle : function (step, classToRemove) {
            var base = this;
            step.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$special_effectsWrapper.removeClass('special_effects-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        special_effectsStatus : function () {
            var base = this;
            base.special_effects = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "usersteps"     : base.$usersteps,
                "special_effectssteps"      : base.$special_effectssteps,
                "currentstep"   : base.currentstep,
                "prevstep"      : base.prevstep,
                "visiblesteps"  : base.visiblesteps,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".special_effects special_effects mousedown.disableTextSelect");
            $(document).off(".special_effects special_effects");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$special_effectsWrapper.unwrap();
                base.$usersteps.unwrap().unwrap();
                if (base.special_effectsControls) {
                    base.special_effectsControls.remove();
                }
            }
            base.clearEvents();
            base.$elem
                .attr("style", base.$elem.data("special_effects-originalStyles") || "")
                .attr("class", base.$elem.data("special_effects-originalClasses"));
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addstep : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$usersteps.length || position === -1) {
                base.$usersteps.eq(-1).after(htmlString);
            } else {
                base.$usersteps.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removestep : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$usersteps.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.special_effectsCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("special_effects-init") === true) {
                return false;
            }
            $(this).data("special_effects-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "special_effectsCarousel", carousel);
        });
    };

    $.fn.special_effectsCarousel.options = {

        steps : 5,
        stepsCustom : false,
        stepsDesktop : [1199, 4],
        stepsDesktopSmall : [979, 3],
        stepsTablet : [768, 2],
        stepsTabletSmall : false,
        stepsMobile : [479, 1],
        singlestep : false,
        stepsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : [],
        rewindNav : false, //循环
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "special_effects-carousel",
        theme : "special_effects-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
}(jQuery, window, document));