"use strict";

function generateMonth(month)
{
    let monthHTML = document.createElement("section");
    let header = document.createElement("h2");
    header.textContent = month.name;
    monthHTML.appendChild(header);
    let i = 0;
    while (i<month.numberOfDays) {
        let day = document.createElement("article");
        day.textContent = i+1;
        monthHTML.appendChild(day);
        i++;
    }
    return monthHTML;
}

function getMonthList()
{
    return [
        new Month("Janvier", 31, 1),
        new Month("Février", 28, 2),
        new Month("Mars", 31, 3),
        new Month("Avril", 30, 4),
        new Month("Mai", 31, 5),
        new Month("Juin", 30, 6),
        new Month("Juillet", 31, 7),
        new Month("Août", 31, 8),
        new Month("Septembre", 30, 9),
        new Month("Octobre", 31, 10),
        new Month("Novembre", 30, 11),
        new Month("Décembre", 31, 12)
    ];
}

function createCalendar()
{
    let calendar = document.createElement("main");
    const months = getMonthList();

    let i = 0;
    while (i<months.length) {
        const month = generateMonth(months[i]);
        calendar.appendChild(month);
        i++;
    }

    return calendar;
}

function fetchHolidays()
{
    let url = 'https://date.nager.at/api/v3/PublicHolidays/2023/fr';
    fetch(url)
    .then((response) => { // Code appelé quand le navigateur reçoit la réponse
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((dates) => {
        let i = 0;
        while (i < dates.length) {
            const holiday = dates[i];
            console.log(`${holiday.date} : ${holiday.localName}`);
            const dateElements = holiday.date.split('-');
            const monthNum = dateElements[1];
            const dayNum = dateElements[2];
            let selector = '#calendar > section:nth-child(' + monthNum + ') > article:nth-child(' + (dayNum*1+1) + ')';
            console.log(selector);
            let article = document.querySelector(selector);
            article.textContent = article.textContent + " " + holiday.localName;
            article.classList.add('holiday');
            //document.querySelector('#calendar > section:nth-child(4) > article:nth-child(10)')
            i++;
        }
        
        // console.table(dates)
    }) // Code appelé si la réponse est OK
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}


window.addEventListener(
    'DOMContentLoaded',
    function (event) {
        const calendrier = createCalendar();
        console.log(calendrier);
        document.querySelector('#calendar').innerHTML = calendrier.innerHTML;
        fetchHolidays();
});