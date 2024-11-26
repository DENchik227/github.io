function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
  }

  const subject = encodeURIComponent(`New message from ${email}`);
  const body = encodeURIComponent(`${message}`);
  window.location.href = `mailto:denysrik83@gmail.com?subject=${subject}&body=${body}`;
}