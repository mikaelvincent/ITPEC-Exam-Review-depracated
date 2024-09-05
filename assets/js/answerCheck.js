document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const successRow = document.getElementById('success-row');
    let answered = false;

    choices.forEach((choice, index) => {
        choice.addEventListener('click', function(event) {
            if (answered) return;
            event.preventDefault();
            clearHighlights();

            if (index === questionData.correctAnswer) {
                choice.closest('.card').classList.add('bg-success-subtle');
                successRow.classList.remove('d-none');
                triggerConfetti();
                answered = true;
            } else {
                choice.closest('.card').classList.add('bg-danger-subtle');
                successRow.classList.add('d-none');
            }
        });
    });

    function clearHighlights() {
        choices.forEach((choice) => {
            choice.closest('.card').classList.remove('bg-success-subtle', 'bg-danger-subtle');
        });
    }
});

function triggerConfetti() {
    confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { y: 0.6 }
    });
    confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { y: 0.6 }
    });
}
