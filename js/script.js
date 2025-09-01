// EMAIL FORM SUBMISSION
const form = document.getElementById('notifyForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input[type="email"]').value;
  msg.textContent = `Thanks! We'll notify ${email} when Phase One and Beyond launch.`;
  form.reset();
});

// HOW IT WORKS CARDS CLICK ANIMATION
const steps = document.querySelectorAll('.step');

steps.forEach(step => {
  step.addEventListener('click', () => {
    step.classList.toggle('active');
  });
});
