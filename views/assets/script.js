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

