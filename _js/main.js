import { fetchHolidays, createCalendar } from "./calendar.func.js";

window.addEventListener(
    'DOMContentLoaded',
    function (event) {
        const calendrier = createCalendar();
        console.log(calendrier);
        document.querySelector('#calendar').innerHTML = calendrier.innerHTML;
        fetchHolidays();
});