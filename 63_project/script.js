const menuBtn = document.querySelector('.menu-btn');
const menuAndButtons = document.querySelector('.menu_and_buttons');
const account = document.querySelector('.account');

menuBtn.addEventListener('click', function(){
  menuBtn.classList.toggle('open');
  menuAndButtons.classList.toggle('open');
  account.classList.toggle('open');
});

document.querySelectorAll('.wiggle_container').forEach(container => {
    container.addEventListener('click', (e) => {
      e.stopPropagation(); 
      
      document.querySelectorAll('.wiggle_container').forEach(c => c.classList.remove('active'));

      container.classList.add('active');
    });
  });
  
document.addEventListener('click', () => {
  document.querySelectorAll('.wiggle_container').forEach(c => c.classList.remove('active'));
});
  
