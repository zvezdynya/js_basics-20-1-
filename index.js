// // задание 1
// function createHTML(obj) { // функция, создающая элемент и разметку
//     const postsDiv = document.createElement('div');
//     postsDiv.innerHTML = `<div class="post-item"><h3>${obj.title}</h3><p>${obj.body}</p></div>`;
//     return postsDiv;
// }

// function addElement(func) { // функция, добавляющая разметку на страницу
//     const wrapper = document.querySelector('.wrapper');
//     wrapper.appendChild(func);
// }

// function getPosts() {//функция, получающая посты и добавляющая их на страницу
//     const listPromise = fetch('https://jsonplaceholder.typicode.com/posts');
//     listPromise
//     .then(response => response.json())
//     .then(json => 
//         json.forEach(el => {
//             // console.log(el.title);
//             // console.log(el.body);
//             addElement(createHTML(el));
//         }))
//     .catch(console.log('Oops, somthing wrong :('));
// }

// getPosts();


// // задание 2
// const btnPost = document.querySelector('.post-btn'); // получаем кнопку
// function createHTML(obj) { // создаем элемент и разметку
//     const postsDiv = document.createElement('div');
//     postsDiv.innerHTML = `<div class="post-item"><h3>${obj.title}</h3><p>${obj.body}</p></div>`;
//     return postsDiv; // возвращаем элемент
// }

// function addElement(func) {
//     const wrapper = document.querySelector('.wrapper'); //получаем обертку
//     wrapper.appendChild(func); // добавляем элемент на страницу
// }

// function createPost() {
    
//     const titleInput = document.querySelector('.post-title').value; // получаем текст из инпутов
//     const bodyInput = document.querySelector('.post-body').value;

//     fetch('https://jsonplaceholder.typicode.com/posts', { // добавляем пост на страницу
//     method: 'POST',
//     body: JSON.stringify({
//         title: titleInput,
//         body: bodyInput,
//         userId: 1
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
//     })
//     .then(response => response.json())
//     .then(json => addElement(createHTML(json)));
// }

// btnPost.addEventListener('click', createPost); // обработчик на клик

const outputDiv = document.querySelector('#result');
const errorDiv = document.querySelector('#error');
const searchBtn = document.querySelector('#search');
const options = document.querySelectorAll('option');
const index = document.querySelector('#index');

searchBtn.addEventListener('click', () => {
    outputDiv.innerHTML = `<div class="spinner"> 
    <div class="spinner-circle spinner-circle-outer"></div>
    <div class="spinner-circle-off spinner-circle-inner"></div>
    <div class="spinner-circle spinner-circle-single-1"></div>
    <div class="spinner-circle spinner-circle-single-2"></div>
    <div class="text">...working...</div>
</div>`; // спиннер загрузки
    errorDiv.innerHTML = "";
    let listPromise;
    options.forEach(option => { // проходим циклом по массиву option, находим выбранный
        if(option.selected) {
            console.log(option.value);
            console.log(index.value);
            
            try {
                listPromise = fetch(`https://swapi.dev/api/${option.value}/${index.value}/`);
                console.log(listPromise);
                listPromise
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    if (!response.ok) {
                        outputDiv.innerHTML = "";
                        throw new Error(errorDiv.innerHTML = 'Запрашиваемые данные не найдены');                            
                    }
                })
                .then(data => { 
                    console.log(data.name);
                    if(option.value == 'films') {
                        outputDiv.innerText = data.title;
                    } else {
                        outputDiv.innerText = data.name;
                    }
                });
            } catch(err) {
                errorDiv.innerHTML = err.message;
            } finally {
                outputDiv.innerHTML += '<br/>Отличный выбор!';
            }
        }
    });
});
        // .catch(console.log(error.message));

//}
// getPosts();


