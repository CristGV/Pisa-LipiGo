
document.addEventListener("DOMContentLoaded", function () {

    var bgVideo = document.getElementById("bgVideo");

    if (bgVideo) {
        var isMobile = window.innerWidth <= 768;
        var videoSrc = isMobile ? "assets/img/hero/bgVideoM.webm" : "assets/img/hero/bgVideo.webm";

        if (bgVideo.querySelector("source").getAttribute("src") !== videoSrc) {
            bgVideo.innerHTML = `<source src="${videoSrc}" type="video/webm">`;
            bgVideo.load();
        }

        bgVideo.autoplay = true;
        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.playsInline = true;

        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isSafari) {
            setTimeout(() => {
                bgVideo.play().catch(() => { });
            }, 1000);
        } else {
            bgVideo.play().catch(() => { });
        }
    }

    /** Scroll Arrows  */

    const nextArrow = document.querySelector('.nextArrow');
    const prevArrow = document.querySelector('.prevArrow');
    const innerScroll = document.querySelector('.innerScroll');

    nextArrow.addEventListener("click", function () {
        innerScroll.scrollTo({
            top: innerScroll.scrollHeight,
            behavior: 'smooth'
        });
    });

    prevArrow.addEventListener("click", function () {
        innerScroll.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* Menu mobile */

    const mobileBtn = document.querySelector(".MobileMBtn");
    const closeBtn = document.querySelector(".closeMM");
    const contentMenu = document.querySelector(".contentMenu");

    mobileBtn.addEventListener("click", function () {
        contentMenu.classList.add("show");
    });

    closeBtn.addEventListener("click", function () {
        contentMenu.classList.remove("show");
    });


    document.querySelectorAll(".topFaq").forEach(item => {
        item.addEventListener("click", function () {
            document.querySelectorAll(".itemFaq.show").forEach(faq => {
                if (faq !== this.parentElement) {
                    faq.classList.remove("show");
                }
            });
            this.parentElement.classList.toggle("show");
        });
    });

    /** Popups **/

    const floatPop = document.getElementById("floatPop");
    const closePop = document.querySelector(".closePop");

    const popupMap = {
        pop1: "estres",
        pop2: "ansiedad",
        pop3: "insomnio"
    };

    Object.keys(popupMap).forEach((btnId) => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener("click", function () {
                floatPop.querySelectorAll(".bodyPop").forEach(el => el.classList.remove("active"));
                floatPop.classList.add("active");
                document.getElementById(popupMap[btnId]).classList.add("active");
            });
        }
    });

    closePop.addEventListener("click", function () {
        floatPop.classList.remove("active");
        const sections = ["estres", "ansiedad", "insomnio"];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.classList.remove("active");
            }
        });
    });

    // const openHovers = document.querySelectorAll(".openHover");

    // openHovers.forEach(button => {
    //     button.addEventListener("click", function () {
    //         const itemHow = this.closest(".itemHow");
    //         const hoverCard = itemHow.querySelector(".hoverCard");
    //         const isActive = hoverCard.classList.contains("show");
    //         document.querySelectorAll(".hoverCard").forEach(card => {
    //             card.classList.remove("show");
    //         });
    //         if (!isActive) {
    //             hoverCard.classList.add("show");
    //         }
    //     });
    // });


    /** Ver Mas  **/

    const verMas = document.getElementById("verMas");
    const closeVer = document.getElementById("closeVer");
    const closeMVer = document.querySelector(".closeMVer");
    const popVer = document.querySelector(".popVer");

    if (verMas && closeVer && popVer) {
        verMas.addEventListener("click", function () {
            popVer.classList.add("active");
        });

        closeVer.addEventListener("click", function () {
            popVer.classList.remove("active");
        });
        closeMVer.addEventListener("click", function () {
            popVer.classList.remove("active");
        });
    }

    /** animaciones de entrada **/


    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(items).indexOf(entry.target);
                setTimeout(() => {
                    addClass(entry.target);
                }, 500 * index);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 });
    const FadeInEElements = document.querySelectorAll('.FadeInE');
    const FadeInEObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('activeFade');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    FadeInEElements.forEach(element => {
        FadeInEObserver.observe(element);
    });

    if (window.matchMedia("(max-width: 768px)").matches) {
        const FadeMElements = document.querySelectorAll('.fadeM');
        const FadeMObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('activeFade');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        FadeMElements.forEach(element => {
            FadeMObserver.observe(element);
        });
    }

});

/* animacion hero desktop - scroll */

if (!window.matchMedia("(max-width: 768px)").matches) {
    document.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        let tempElement = document.querySelector(".temp");
        if (!tempElement) return;

        let minScroll = 150;
        let maxScroll = 900;
        let scale = 750 / (maxScroll - minScroll);
        let startValue = 100;
        let targetValue = startValue;

        if (scrollY >= minScroll && scrollY <= maxScroll) {
            targetValue = startValue + (scrollY - minScroll) * scale;
        } else if (scrollY > maxScroll) {
            targetValue = startValue + (maxScroll - minScroll) * scale;
        }

        animateValue(tempElement, targetValue);
    });

    let currentValue = 0;
    let animationFrame;

    function animateValue(element, target) {
        cancelAnimationFrame(animationFrame);

        function step() {
            let diff = (target - currentValue) * 0.35;
            if (Math.abs(diff) < 0.5) {
                currentValue = target;
            } else {
                currentValue += diff * 0.199;
            }
            element.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -168, ${currentValue}, 0, 1)`;
            if (currentValue !== target) {
                animationFrame = requestAnimationFrame(step);
            }
        }
        step();
    }

    (function () {
        let currentX = 0;
        let currentOpacity = 1;
        let animationFrameTxtHero;

        document.addEventListener("scroll", function () {
            const txtHero = document.querySelector(".txtHero");
            if (!txtHero) return;

            const scrollY = window.scrollY;
            const minScroll = 110,
                maxScroll = 400;
            const finalX = -100;
            let targetX, targetOpacity;

            if (scrollY <= minScroll) {
                targetX = 0;
                targetOpacity = 1;
            } else if (scrollY >= maxScroll) {
                targetX = finalX;
                targetOpacity = 0;
            } else {
                const progress = (scrollY - minScroll) / (maxScroll - minScroll);
                targetX = progress * finalX;
                targetOpacity = 1 - progress;
            }

            animateTxtHero(txtHero, targetX, targetOpacity);
        });

        function animateTxtHero(el, targetX, targetOpacity) {
            cancelAnimationFrame(animationFrameTxtHero);
            function step() {
                const diffX = targetX - currentX;
                const diffOpacity = targetOpacity - currentOpacity;
                if (Math.abs(diffX) < 0.5 && Math.abs(diffOpacity) < 0.01) {
                    currentX = targetX;
                    currentOpacity = targetOpacity;
                    el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentX}, 0, 0, 1)`;
                    el.style.opacity = currentOpacity;
                    return;
                }
                currentX += diffX * 0.1;
                currentOpacity += diffOpacity * 0.1;
                el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentX}, 0, 0, 1)`;
                el.style.opacity = currentOpacity;
                animationFrameTxtHero = requestAnimationFrame(step);
            }
            step();
        }

        let currentPlateX = 0;
        let currentPlateOpacity = 1;
        let animationFrameInnerPlate;

        document.addEventListener("scroll", function () {
            const innerPlate = document.querySelector(".innerPlate");
            if (!innerPlate) return;

            const scrollY = window.scrollY;
            const minScroll = 150, maxScroll = 500;
            const finalX = 100;
            let targetX, targetOpacity;

            if (scrollY <= minScroll) {
                targetX = 0;
                targetOpacity = 1;
            } else if (scrollY >= maxScroll) {
                targetX = finalX;
                targetOpacity = 0;
            } else {
                const progress = (scrollY - minScroll) / (maxScroll - minScroll);
                targetX = progress * finalX;
                targetOpacity = 1 - progress;
            }

            animateInnerPlate(innerPlate, targetX, targetOpacity);
        });

        function animateInnerPlate(el, targetX, targetOpacity) {
            cancelAnimationFrame(animationFrameInnerPlate);
            function step() {
                const diffX = targetX - currentPlateX;
                const diffOpacity = targetOpacity - currentPlateOpacity;
                if (Math.abs(diffX) < 0.5 && Math.abs(diffOpacity) < 0.01) {
                    currentPlateX = targetX;
                    currentPlateOpacity = targetOpacity;
                    el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentPlateX}, 0, 0, 1)`;
                    el.style.opacity = currentPlateOpacity;
                    return;
                }
                currentPlateX += diffX * 0.1;
                currentPlateOpacity += diffOpacity * 0.1;
                el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentPlateX}, 0, 0, 1)`;
                el.style.opacity = currentPlateOpacity;
                animationFrameInnerPlate = requestAnimationFrame(step);
            }
            step();
        }

        let currentCardLX = -110;
        let currentCardLOpacity = 0;
        let animationFrameCardL;
        function animateCardL(el, targetX, targetOpacity) {
            cancelAnimationFrame(animationFrameCardL);
            function step() {
                const diffX = targetX - currentCardLX;
                const diffOpacity = targetOpacity - currentCardLOpacity;
                if (Math.abs(diffX) < 0.5 && Math.abs(diffOpacity) < 0.01) {
                    currentCardLX = targetX;
                    currentCardLOpacity = targetOpacity;
                    el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentCardLX}, 0, 0, 1)`;
                    el.style.opacity = currentCardLOpacity;
                    return;
                }
                currentCardLX += diffX * 0.1;
                currentCardLOpacity += diffOpacity * 0.1;
                el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentCardLX}, 0, 0, 1)`;
                el.style.opacity = currentCardLOpacity;
                animationFrameCardL = requestAnimationFrame(step);
            }
            step();
        }

        let currentRightFX = 110;
        let currentRightFOpacity = 0;
        let animationFrameRightF;
        function animateRightF(el, targetX, targetOpacity) {
            cancelAnimationFrame(animationFrameRightF);
            function step() {
                const diffX = targetX - currentRightFX;
                const diffOpacity = targetOpacity - currentRightFOpacity;
                if (Math.abs(diffX) < 0.5 && Math.abs(diffOpacity) < 0.01) {
                    currentRightFX = targetX;
                    currentRightFOpacity = targetOpacity;
                    el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentRightFX}, 0, 0, 1)`;
                    el.style.opacity = currentRightFOpacity;
                    return;
                }
                currentRightFX += diffX * 0.1;
                currentRightFOpacity += diffOpacity * 0.1;
                el.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${currentRightFX}, 0, 0, 1)`;
                el.style.opacity = currentRightFOpacity;
                animationFrameRightF = requestAnimationFrame(step);
            }
            step();
        }

        let currentPlateFOpacity = 0;
        let animationFramePlateF;
        function animatePlateF(el, targetOpacity) {
            cancelAnimationFrame(animationFramePlateF);
            function step() {
                let diffOpacity = targetOpacity - currentPlateFOpacity;
                if (Math.abs(diffOpacity) < 0.01) {
                    currentPlateFOpacity = targetOpacity;
                    el.style.opacity = currentPlateFOpacity;
                    return;
                }
                currentPlateFOpacity += diffOpacity * 0.1;
                el.style.opacity = currentPlateFOpacity;
                animationFramePlateF = requestAnimationFrame(step);
            }
            step();
        }

        document.addEventListener("scroll", function () {
            const scrollY = window.scrollY;
            const minScroll = 300, maxScroll = 500;
            let progress;
            if (scrollY <= minScroll) {
                progress = 0;
            } else if (scrollY >= maxScroll) {
                progress = 1;
            } else {
                progress = (scrollY - minScroll) / (maxScroll - minScroll);
            }

            const cardLEl = document.querySelector(".cardL");
            if (cardLEl) {
                let targetX = -110 * (1 - progress);
                let targetOpacity = 0 + progress * 1;
                animateCardL(cardLEl, targetX, targetOpacity);
            }

            const rightFEl = document.querySelector(".rightF");
            if (rightFEl) {
                let targetX = 110 * (1 - progress);
                let targetOpacity = 0 + progress * 1;
                animateRightF(rightFEl, targetX, targetOpacity);
            }

            const plateFEl = document.querySelector(".plateF");
            if (plateFEl) {
                let targetOpacity = progress;
                animatePlateF(plateFEl, targetOpacity);
            }
        });
    })();
}