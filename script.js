// drag on drop

document.querySelectorAll(".form_dragInput").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".form_drag");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", e => {
      if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0])
      }
  })

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("form_dragOver");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("form_dragOver");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drag_zoneThumb");

  if (dropZoneElement.querySelector(".form_divDrag")) {
    dropZoneElement.querySelector(".form_divDrag").remove();
  }

  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drag_zoneThumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`
    };
  } else {
      thumbnailElement.style.backgroundImage = null
  }

}

// 

// let myForm = document.getElementById("myForm");

// myForm.addEventListener('submit', (e) => {
//     console.log("Привет")
// })

// form_drag

// document.querySelectorALL(".drop-zone__input").forEach(inputElement => {
//     const dropZoneElement = inputElement.closest(".form_drag")


// onSubmit() {
//     let allValid = true;
//     // пройти все элементы
//     for (const item of this.formItems) {
//       // проверить каждый (взять тип и значение из полей с значениями)
//       if (!isValid(item.type, this.values[item.type])) {
//         // если ошибка - установить сообщение
//         this.errors[item.type] = errorMessages[item.type];
//         allValid = false;
//       }
//     }

//     // если все ок - отправить запрос
//     if (allValid) {
//       fetch("https://google.com", {
//         method: "post",
//         body: JSON.stringify(this.values),
//       });
//     }
//   },


// //////////////////////////////////////////////////////////////////////////////////////


var object = {};
var formData = new FormData(document.forms.person);

formData.forEach(function(value, key){
    object[key] = value;
});
var json = JSON.stringify(object);

var xhr = new XMLHttpRequest();
xhr.open("POST", 'https://beryl-boggy-ceiling.glitch.me/email', true)
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

// Отсылаем объект в формате JSON и с Content-Type application/json
xhr.send(json);


