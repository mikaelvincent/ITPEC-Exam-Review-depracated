const CLASS_SELECTED = 'bg-primary-subtle';
const CLASS_CORRECT = 'bg-success-subtle';
const CLASS_WRONG = 'bg-danger-subtle';
const CLASS_BORDER_SELECTED = 'border-primary';
const CLASS_BORDER_CORRECT = 'border-success';
const CLASS_BORDER_WRONG = 'border-danger';
const SELECTOR_CARD_LINK = '.card a';
const SELECTOR_CARD_HEADING = 'h4';
const ID_SUBMIT_BUTTON = 'submit-btn';
const ID_SUBMIT_COL = 'submit-col';
const ID_EXPLANATION_COL = 'explanation-col';

document.addEventListener('DOMContentLoaded', function() {
	const choices = document.querySelectorAll(SELECTOR_CARD_LINK);
	const submitButton = document.getElementById(ID_SUBMIT_BUTTON);
	const submitButtonColumn = document.getElementById(ID_SUBMIT_COL);
	const explanationButtonColumn = document.getElementById(ID_EXPLANATION_COL);
	let selectedChoiceIndex = null;
	let answered = false;

	choices.forEach((choice, index) => {
		choice.addEventListener('click', function(event) {
			event.preventDefault();
			if (answered || choice.closest('.card').classList.contains(CLASS_WRONG)) {
				return;
			}
			clearSelections();
			const card = choice.closest('.card');
			card.classList.add(CLASS_SELECTED, CLASS_BORDER_SELECTED);
			selectedChoiceIndex = index;
		});
	});

	submitButton.addEventListener('click', function() {
		if (answered || selectedChoiceIndex === null) return;

		const selectedCard = choices[selectedChoiceIndex].closest('.card');
		const heading = selectedCard.querySelector(SELECTOR_CARD_HEADING);

		if (selectedChoiceIndex === quizConfig.correctAnswer) {
			selectedCard.classList.replace(CLASS_SELECTED, CLASS_CORRECT);
			selectedCard.classList.replace(CLASS_BORDER_SELECTED, CLASS_BORDER_CORRECT);
			triggerConfetti();
			answered = true;
			submitButtonColumn.classList.add('d-none');
			explanationButtonColumn.classList.remove('d-none');
		} else {
			selectedCard.classList.replace(CLASS_SELECTED, CLASS_WRONG);
			selectedCard.classList.replace(CLASS_BORDER_SELECTED, CLASS_BORDER_WRONG);
		}
	});

	function clearSelections() {
		choices.forEach(choice => {
			const card = choice.closest('.card');
			if (!card.classList.contains(CLASS_WRONG)) {
				card.classList.remove(CLASS_SELECTED, CLASS_BORDER_SELECTED);
			}
		});
	}
});

function triggerConfetti() {
	confetti({
		particleCount: 60,
		angle: 60,
		spread: 60,
		origin: {
			y: 0.6
		}
	});
	confetti({
		particleCount: 60,
		angle: 120,
		spread: 60,
		origin: {
			y: 0.6
		}
	});
}
