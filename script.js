// drag on drop

document.querySelectorAll(".form_dragInput").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".form_drag");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", e => {
      if (inputElement.files.length) {
        uploadFile(inputElement.files[0])       
      }
  })

  // Проверка на то чтоб не превышал более 2мб и также можно чтоб была проверка картинки

  function uploadFile(file) {

    // Если сделать проверку чтоб картинка была

    // if(!['image/jpeg', 'image/png', "image/gif"].includes(file.type)) {
    //     alert('Прикрепите изображение')
    //     formImage.value = ""
    //     return
    // } 

    if(file.size > 2 * 1024 * 1024) {
        alert("Файл дожен быть менее 2 мб")
        inputElement.value = ''
        return
    }

    else {
      updateThumbnail(dropZoneElement, inputElement.files[0])
    }
  }

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



