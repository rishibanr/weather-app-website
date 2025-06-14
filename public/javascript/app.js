
const weatherForm = document.querySelector('form');
const seacrchLocation = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = seacrchLocation.value;

    //messageOne.textContent = 'Loading....';

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = location;
            messageTwo.textContent = data.forecast;
        }
    })

});
})
