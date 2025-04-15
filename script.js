document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlist-form");
  const waitlistCount = document.querySelector(".waitlist-count");
  let count = 0;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    // Here you would typically send the email to your backend
    // For now, we'll just update the count and show a success message
    count++;
    waitlistCount.textContent = `${count} people have already joined the waitlist`;

    // Clear the input
    form.reset();

    // Show success message
    alert("Thanks for joining the waitlist!");
  });
});
