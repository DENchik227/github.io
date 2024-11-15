
function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Создание шаблона mailto-ссылки
    const subject = encodeURIComponent(`Новое сообщение от ${name}`);
    const body = encodeURIComponent(`Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`);
    
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  }