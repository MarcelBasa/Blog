document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-button');

    editButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            window.location.href = `/edit/${index}`;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            fetch(`/delete/${index}`, {
                method: 'DELETE'
            });
            window.location.reload();
        });
    });
});