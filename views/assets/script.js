const tg = document.getElementById("tg");

window.onload = function() {
    const modal = document.querySelector('.modal');
    modal.classList.add('show'); // Добавляем класс для показа модального окна
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

tg.onclick = () => {
    window.location.replace("https://stackoverflow.com");
}

