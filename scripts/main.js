const POSITION_MENU_LEFT = `--position--menu-nav-left`;
const POSITION_MENU_TOP = `--position--menu-nav-top`;
const WIDTH_THRESHOLD = 736;
const TRANSITION_DURATION = `500ms`;

let jsTriggers = document.querySelectorAll(`#js-triggers li`);
jsTriggers.forEach(function(listItem) {
    let anchor = listItem.querySelector(`a`);
    let text = anchor.textContent.trim();
    if (text === `Show Menu`) {
        anchor.id = `show-menu`;
    } else if (text === `Show Modal`) {
        anchor.id = `show-modal`;
    }
});

let menuActive = false;
let sidebarEnabled = false;
let nav = document.querySelector(`nav`);
let ul = document.querySelector(`ul`);
let showModal = document.getElementById(`show-modal`);
let menuLink = document.getElementById(`show-menu`);
let modalPanel = document.querySelector(`.modal-panel`);
let width = window.innerWidth;
let correctWidth = window.innerWidth;

function hideModal() {
    modalPanel.style.display = `none`;
}

function checkWidthThresholdPassed() {
    correctWidth = window.innerWidth;

    if ((width < WIDTH_THRESHOLD && correctWidth >= WIDTH_THRESHOLD)
    || (width >= WIDTH_THRESHOLD && correctWidth < WIDTH_THRESHOLD)){
        menuActive = false;
        window.location.reload();
    }
    width = correctWidth;
    updateSideBar();
}

function updateSideBar() {
    if(correctWidth < WIDTH_THRESHOLD){
        ul.style.display = `block`;
        sidebarEnabled = true;
    }
    else{
        ul.style.display = `flex`;
        sidebarEnabled = false;
    }
    updateMenuPosition();
}

function updateMenuPosition() {
    if(menuActive){
        if(sidebarEnabled){
            nav.style.setProperty(POSITION_MENU_LEFT, `70px`);
            nav.style.setProperty(POSITION_MENU_TOP, `calc(var(--header-height) + 40px)`);
        }
        else{
            nav.style.setProperty(POSITION_MENU_LEFT, `50%`);
            nav.style.setProperty(POSITION_MENU_TOP, `calc(var(--header-height) + 40px)`);
        }
    }
    else {
        if(sidebarEnabled){
            nav.style.setProperty(POSITION_MENU_LEFT, `-100px`);
            nav.style.setProperty(POSITION_MENU_TOP, `calc(var(--header-height) + 40px)`);
        }
        else{
            nav.style.setProperty(POSITION_MENU_LEFT, `50%`);
            nav.style.setProperty(POSITION_MENU_TOP, `50px`);
        }
    }
}

showModal.addEventListener(`click`, () => {
    modalPanel.style.display = `block`;
});

modalPanel.addEventListener(`click`, () => {
    hideModal();
});

document.addEventListener(`keydown`, function(event) {
    if (event.code === `Escape`) {
        hideModal();
    }
});

menuLink.addEventListener(`click`, () => {
    nav.style.transitionDuration = TRANSITION_DURATION;
    menuActive = !menuActive;
    updateMenuPosition();
});

window.addEventListener(`resize`, checkWidthThresholdPassed);
updateSideBar();
