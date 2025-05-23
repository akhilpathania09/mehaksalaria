document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.textContent = 'Your message has been sent successfully!';
    confirmationMessage.style.display = 'block';
});