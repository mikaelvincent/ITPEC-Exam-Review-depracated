document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const successRow = document.getElementById('success-row');

    choices.forEach((choice, index) => {
        choice.addEventListener('click', function(event) {
            event.preventDefault();
            clearHighlights();

            if (index === questionData.correctAnswer) {
                choice.parentNode.classList.add('bg-success-subtle');
                successRow.classList.remove('d-none');
            } else {
                choice.parentNode.classList.add('bg-danger-subtle');
                successRow.classList.add('d-none');
            }
        });
    });

    function clearHighlights() {
        choices.forEach((choice) => {
            choice.parentNode.classList.remove('bg-success-subtle', 'bg-danger-subtle');
        });
    }
});
