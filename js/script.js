/**
 * Массив со временем отправления из пункта А в пункт В
 */
let arrayDate = [
    new Date(Date.parse('2022-01-26T18:00:00.417+03:00')),
    new Date(Date.parse('2022-01-26T18:30:00.417+03:00')),
    new Date(Date.parse('2022-01-26T18:45:00.417+03:00')),
    new Date(Date.parse('2022-01-26T19:00:00.417+03:00')),
    new Date(Date.parse('2022-01-26T19:15:00.417+03:00')),
    new Date(Date.parse('2022-01-26T21:00:00.417+03:00'))
];

/**
 * Массив со временем отправления из пункта И в пункт А
 */
let arrayTimeFromBToA = [
    new Date(Date.parse('2022-01-26T18:30:00.417+03:00')),
    new Date(Date.parse('2022-01-26T18:45:00.417+03:00')),
    new Date(Date.parse('2022-01-26T19:00:00.417+03:00')),
    new Date(Date.parse('2022-01-26T19:15:00.417+03:00')),
    new Date(Date.parse('2022-01-26T19:35:00.417+03:00')),
    new Date(Date.parse('2022-01-26T21:50:00.417+03:00')),
    new Date(Date.parse('2022-01-26T21:55:00.417+03:00')),
]

/**
 * Select выбора времени отправления из пункта А в пункт В
 */
const timeFromAToBSelect = document.getElementById('time');

/**
 * Select выбора времени отправления из пункта В в пункт А
 */
const timeFromBToASelect = document.getElementById('timeBinA');

/**
 * Label для select выбора времени из пункта В в пункт А
 */
const labelTimeReverse = document.querySelector('.label-time-reverse');

/**
 * Начальная цена за одну поездку
 */
let ticketPrice = 700;

/**
 * Текст выбранного направления
 */
let selectedRoute = 'из А в В';

/**
 * Продолжительность поездки в одну сторону
 */
let durationTrip = 50;

/**
 * Выбранное время отправления из пункта А в пункт В
 */
let selectedTimeFromAToB = arrayDate[0].time;

/**
 * Выбранное время отправления из пункта В в пункт А
 */
let selectedTimeFromBToA = null;

arrayDate.forEach(date => {
    let optionTime = document.createElement('option');

    optionTime.innerText = date.getHours() + ':' + date.getMinutes();
    optionTime.setAttribute('value', date);
    timeFromAToBSelect.appendChild(optionTime);
})

/**
 * Выбор времени отправления из пункта А в В (из элемента select)
 * @param select - this
 */
function changeTime(select) {
    let selectedTime = select.querySelector(`option[value="${select.value}"]`);
    selectedTimeFromAToB = new Date(selectedTime.getAttribute('value'));

    if (timeFromBToASelect.style.display === 'block') {
        calculateTimeFromBToA();
    }
}

/**
 * Вычисление доступного времени отправления из пункта В в А
 */
function calculateTimeFromBToA() {

    while (timeFromBToASelect.firstChild) {
        timeFromBToASelect.removeChild(timeFromBToASelect.firstChild);
    }

    let filteredTimesFromBToA = arrayTimeFromBToA.filter(time => {
        return time.getTime() > selectedTimeFromAToB.getTime() + 50 * 60 * 1000
    })

    selectedTimeFromBToA = filteredTimesFromBToA[0];

    filteredTimesFromBToA.forEach(time => {
        let optionTimeFromBToA = document.createElement('option');
        optionTimeFromBToA.innerText = time.getHours() + ':' + time.getMinutes();
        timeFromBToASelect.appendChild(optionTimeFromBToA);
    })

}

/**
 * Выбор времени отправления из пункта В в А (из элемента select)
 * @param select - this
 */
function changeTimeFromBToA(select) {
    let selectedTime = select.querySelector(`option[value="${select.value}"]`);
    selectedTimeFromBToA = new Date(selectedTime.getAttribute('value'));
}

/**
 * Выбор маршрута (из элемента select)
 * @param select - this
 */
function changeRoute(select) {

    let newSelectedRoute = select.querySelector(`option[value="${select.value}"]`);

    selectedRoute = newSelectedRoute.getAttribute('value');

    if (newSelectedRoute.getAttribute('value') === 'из A в B и обратно в А') {

        calculateTimeFromBToA();

        timeFromBToASelect.style.display = 'block';
        labelTimeReverse.style.display = 'block';
        ticketPrice = 1200;
        durationTrip = 100;
    } else {
        timeFromBToASelect.style.display = 'none';
        labelTimeReverse.style.display = 'none';
        ticketPrice = 700;
        durationTrip = 50;
        selectedTimeFromBToA = null;
    }
}


/**
 * Получение и отображение информации по маршруту, стоимости билетов, времени отправления и прибытия (при нажатии на кнопку)
 */
function getResult() {

    const infoTicket = document.getElementById('info-ticket');
    const infoDuration = document.getElementById('info-duration');
    const infoTimeToB = document.getElementById('info-time-to-B');
    const infoTimeToA = document.getElementById('info-time-to-A');


    let quantityTickets = document.getElementById("num").value;

    if (quantityTickets === '0' || quantityTickets === '' || Number(quantityTickets) < 0) {
        infoTicket.innerHTML = '';
        alert('Выберите количество билетов!')
    } else {
        infoTicket.innerHTML = 'Вы выбрали ' + quantityTickets + ' билета по маршруту ' + selectedRoute + ' стоимостью ' + (ticketPrice * Number(quantityTickets)) + ' р.';
        infoDuration.innerHTML = 'Это путешествие займет у вас ' + durationTrip + ' минут.';

        if (selectedTimeFromBToA) {
            infoTimeToA.innerHTML = 'Теплоход отправляется из пункта В в ' + (selectedTimeFromBToA.getHours() + ':' + selectedTimeFromBToA.getMinutes()) + ', а прибудет в пункт А в ' + ((new Date(selectedTimeFromBToA.getTime() + 50 * 60 * 1000)).getHours() + ':' + (new Date(selectedTimeFromBToA.getTime() + 50 * 60 * 1000)).getMinutes()) + '.';
        } else {
            infoTimeToA.innerHTML = '';
        }

        infoTimeToB.innerHTML = 'Теплоход отправляется из пункта A в ' + (selectedTimeFromAToB.getHours() + ':' + selectedTimeFromAToB.getMinutes()) + ', а прибудет в пункт В в ' + ((new Date(selectedTimeFromAToB.getTime() + 50 * 60 * 1000)).getHours() + ':' + (new Date(selectedTimeFromAToB.getTime() + 50 * 60 * 1000)).getMinutes()) + '.';

    }
}



