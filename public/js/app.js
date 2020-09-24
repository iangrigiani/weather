const locationForm = document.querySelector('form');
const inputValue = document.querySelector('input');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const imgClima = document.querySelector('#clima');

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    p1.textContent = 'Loading...';
    p2.textContent = '';
    p3.textContent = '';
    p4.textContent = '';
    imgClima.style.display = 'none';
    imgClima.src = '';

    const addresssValue = inputValue.value;
    fetch('/weather?address=' + addresssValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error;    
            } else {
                p1.textContent = 'Temperatura: ' + data.temp + ' grados';
                p2.textContent = data.desc;
                imgClima.src = data.icon;
                imgClima.style.display = 'inline-block';
                p3.textContent = 'Humedad: ' + data.hum + '%';
                p4.textContent = 'Probabilidad de precipitaciones: ' + data.precip + '%';

            }
        })
    })
    
})