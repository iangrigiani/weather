const locationForm = document.querySelector('form');
const inputValue = document.querySelector('input');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    p1.textContent = 'Loading...';
    p2.textContent = '';

    const addresssValue = inputValue.value;
    fetch('/weather?address=' + addresssValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error;    
            } else {
                p1.textContent = data.temp + ' grados';
                p2.textContent = data.desc;
            }
        })
    })
    
})