function carrusel() {
    let CARRUSEL;
    const PX_PER_MS = 20;
    const DELAY_AFTER_BTN_CLICKED = 2000;

    const $CARRUSEL = document.querySelector(".carrusel");
    const $CONTAINER = $CARRUSEL.querySelector(".carrusel-container");
    const items = $CONTAINER.querySelectorAll(".carrusel-items");

    const $BACK = document.querySelector('.one-before');
    const $NEXT = document.querySelector('.one-after');

    Array.from(items).map(item => {
        item.addEventListener('mouseover', () => { CARRUSEL_JS.pause(); });
        item.addEventListener('mouseout', () => {
            CARRUSEL_JS.pause();
            CARRUSEL_JS.start();
        });
    });

    $BACK.addEventListener('click', () => {
        CARRUSEL_JS.pause();
        CARRUSEL_JS.back();
        setTimeout(() => {
            CARRUSEL_JS.pause();
            CARRUSEL_JS.start();
        }, DELAY_AFTER_BTN_CLICKED);
    });
    $NEXT.addEventListener('click', () => {
        CARRUSEL_JS.pause();
        CARRUSEL_JS.next();
        setTimeout(() => {
            CARRUSEL_JS.pause();
            CARRUSEL_JS.start();
        }, DELAY_AFTER_BTN_CLICKED);
    });

    return {
        start() {
            CARRUSEL = setInterval(() => {
                const $first_item = $CONTAINER.firstElementChild;
                const container_left = $CONTAINER.offsetLeft;
                const $first_item_width = $first_item.offsetWidth;

                if (container_left > -1 * $first_item_width) {
                    $CONTAINER.style.left = `${container_left - 1}px`;
                }
                else this.back();
            }, PX_PER_MS);
        },
        back() {
            const $first_item = $CONTAINER.firstElementChild;
            const $first_item_clone = $first_item.cloneNode(true);
            $first_item_clone.addEventListener('mouseover', () => { CARRUSEL_JS.pause(); });
            $first_item_clone.addEventListener('mouseout', () => {
                CARRUSEL_JS.pause();
                CARRUSEL_JS.start();
            });
            $CONTAINER.style.left = `var(--carrusel-separation-bwn-items)`;
            $CONTAINER.firstElementChild.remove();
            $CONTAINER.appendChild($first_item_clone);
        },
        next() {
            const $lastElement = $CONTAINER.lastChild.cloneNode(true);
            $lastElement.addEventListener('mouseover', () => { CARRUSEL_JS.pause(); });
            $lastElement.addEventListener('mouseout', () => {
                CARRUSEL_JS.pause();
                CARRUSEL_JS.start();
            });
            $CONTAINER.lastChild.remove();
            $CONTAINER.style.left = `var(--carrusel-separation-bwn-items)`;
            $CONTAINER.insertBefore($lastElement, $CONTAINER.children[0]);
        },
        pause() {
            clearInterval(CARRUSEL);
        }
    }
}

const CARRUSEL_JS = carrusel();
CARRUSEL_JS.start();