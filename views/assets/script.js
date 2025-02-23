window.onload = function() {
    const modal = document.querySelector('.modal');
    modal.classList.add('show'); 
}

document.addEventListener('DOMContentLoaded', () => {
    const closemodal = document.getElementById('close-modal');
    if (closemodal) {
        closemodal.onclick = function() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        };
    }
});

const getDate = () => {
    const date = new Date();
    const months = {
        'Jan': 'янв',
        'Feb': 'фев',
        'Mar': 'мар',
        'Apr': 'апр',
        'May': 'май',
        'Jun': 'июн',
        'Jul': 'июл',
        'Aug': 'авг',
        'Sep': 'сен',
        'Oct': 'окт',
        'Nov': 'ноя',
        'Dec': 'дек'
    };
    
    const weekdays = {
        'Sun': 'вс',
        'Mon': 'пн',
        'Tue': 'вт',
        'Wed': 'ср',
        'Thu': 'чт',
        'Fri': 'пт',
        'Sat': 'сб'
    };

    const monthStr = date.toLocaleString('en', { month: 'short' });
    const weekdayStr = date.toLocaleString('en', { weekday: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString();

    return [`${time}`, `${weekdays[weekdayStr]}, ${day} ${months[monthStr]}`];
};

document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    dateElement.textContent = getDate()[1];
    timeElement.textContent = getDate()[0];
    if (dateElement) {
        setInterval(() => {
            dateElement.textContent = getDate()[1];
            timeElement.textContent = getDate()[0];
        }, 1000);
    }
});