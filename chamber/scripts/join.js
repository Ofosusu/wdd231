const timestampField = document.querySelector('#timestamp');

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const cardLinks = document.querySelectorAll('.seal');

cardLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetId = link.dataset.modal;
        const modal = document.querySelector(`#${targetId}`);

        if (modal) {
            modal.showModal();
        }
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('dialog').close();
    });
});

const allModals = document.querySelectorAll('dialog.scroll-modal');

allModals.forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
        const box = dialog.getBoundingClientRect();

        const clickedInsideBox =
            event.clientX >= box.left &&
            event.clientX <= box.right &&
            event.clientY >= box.top &&
            event.clientY <= box.bottom;

        if (!clickedInsideBox) {
            dialog.close();
        }
    });
});