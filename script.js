const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
  number.addEventListener('click', () => {
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker.value;
    number.style.backgroundColor = selectedColor;
  });
});
