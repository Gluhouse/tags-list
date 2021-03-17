app = () => {
  //   const tags = [{ tagName: "testName", readOnly: false, id: 0 }];

  if (localStorage.tags === undefined) {
    localStorage.tags = JSON.stringify([]);
  }
  if (localStorage.inUse === undefined) {
    localStorage.inUse = "tags";
  }

  const input = document.querySelector("#inputTag");
  const addBtn = document.querySelector(".addTag");

  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addTag(currentTags(), input.value);
  });

  input.addEventListener("enter", (event) => {
    event.preventDefault();
    addTag(currentTags(), input.value);
  });

  const tagsCard = document.querySelector(".tagsCard");
  tagsCard.addEventListener("click", (event) => {
    if (event.target.closest(".deleteTag")) {
      deleteTag(event, currentTags());
    }

    if (event.target.closest("input")) {
      let id = +event.target.closest(".tag").getAttribute("data-index");
      readOnly(id);
    }
  });

  drawTags(currentTags());
};

addTag = (array, tagName) => {
  if (tagName !== "") {
    let uniqueId = +`${new Date().getTime()}`;
    document.querySelector("#inputTag").value = "";
    array.push({
      tagName: tagName,
      readOnly: false,
      id: uniqueId,
    });
    localStorage[localStorage.inUse] = JSON.stringify(array);
  }
  drawTags(array);
};

deleteTag = (event, array = []) => {
  let id = +event.target.closest(".tag").getAttribute("data-index");

  let filtered = array.filter((elem) => elem.id !== id);

  localStorage[localStorage.inUse] = JSON.stringify(filtered);
  drawTags(filtered);
};

drawTags = (array) => {
  tagsCard = document.querySelector(".tagsCard");
  tagsCard.innerHTML = "";
  array.forEach((elem) => {
    tagsCard.innerHTML += `
      <div class="tag" data-Index="${elem.id}">
      ${
        elem.readOnly === false
          ? `<input type="checkbox"></input>`
          : `<input type="checkbox" checked></input>`
      }
          <span class="tagName">${elem.tagName}</span>
         ${
           elem.readOnly === false ? `<button class="deleteTag">x</button>` : ``
         } 
        </div>
      `;
  });
};

// Получаю array используемый в данный момент

currentTags = () => {
  return JSON.parse(localStorage[localStorage.inUse]);
};

setTagsArray = (array) => {
  localStorage.inUse = array;
  if (localStorage[array] === undefined) {
    localStorage[array] = JSON.stringify([]);
  }
  drawTags(currentTags());
};

readOnly = (id) => {
  let array = [...currentTags()];
  array.forEach((elem) => {
    if (elem.id === id) {
      switch (elem.readOnly) {
        case true:
          elem.readOnly = false;
          break;

        case false:
          elem.readOnly = true;
          break;

        default:
          break;
      }
    }
  });
  localStorage[localStorage.inUse] = JSON.stringify(array);
  drawTags(currentTags());
};

app();
