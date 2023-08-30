import { manageCalendar } from "./calendar.func.js";
import { attachMenuEvents } from "./display.func.js";

window.addEventListener(
    'DOMContentLoaded',
    function (event) {
        manageCalendar();
        attachMenuEvents();
    });