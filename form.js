document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById('form');
    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault()
        console.log("ssss");
        let error = formValidate(form)    
        
        if(error === 0) {
            sendValidate()
        } else {
            // alert()
            console.log("Заполните обязательные поля");
        }
    }

    function formValidate(e) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formaRemoveError(input)
            // contains - смотрит есть ли у кого-нибудь из input класс _email
            if(input.classList.contains('_email')) {
                if(emailTest(input)){
                    formaAddError(input);
                    error++;
                }
            } else {
                if(input.value === '') {
                    formaAddError(input)
                    error++;
                }
            }
        }

        return error
    }

    function formaAddError(input) {
        // input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }
    function formaRemoveError(input) {
        // input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }


// Отправка формы

async function sendValidate() {
        // const url = 'https://example.com';
        // const url = 'https://beryl-boggy-ceiling.glitch.me/email ;
        let obj = {}
        var formData = new FormData(document.forms.person)
        formData.append('image', formImage.files[0]);
    
        formData.forEach(function (value, key) {
            obj[key] = value
        })
    
        // let json = JSON.stringify(obj)
    
        const url = 'http://localhost:3000';
        const data = {
            "test_name": "sss",
            "test_email": "1@mail.ru",
            "test_message": "sss"
        };
    
    try {
    const response = await fetch(url, {
        method: 'POST', // или 'PUT'
        body: JSON.stringify(obj), // данные могут быть 'строкой' или {объектом}!
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    console.log('Успех:', JSON.stringify(json));
    } catch (error) {
    console.error('Ошибка:', error);
    }
    }

    // Картинка

    const formImage = document.getElementById('formImage')

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0])
    })

function uploadFile(file) {
    if(!['image/jpeg', 'image/png', "image/gif"].includes(file.type)) {
        alert('Прикрепите изображение')
        formImage.value = ""
        return
    }        
    if(file.size > 2 * 1024 * 1024) {
        alert("Файл дожен быть менее 2 мб")
        return
    }
}


})

