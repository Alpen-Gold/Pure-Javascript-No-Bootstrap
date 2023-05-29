let error = document.getElementById("error");
error.style.display = "none";
let spinner = document.getElementById("spinner-card");
let ul = document.getElementById("ul");
ul.style.display = "none";

let url = "https://jsonplaceholder.typicode.com/todos";

let inputPostAndPut = document.getElementById("input-post-and-put").value;
let getTodo = async () => {
  try {
    let respons = await axios.get(url);
    return { succass: true, data: respons.data };
  } catch (error) {
    console.error(" error :" + error);
    return { succass: false };
  }
};

let setTodo = async (size) => {
  let respons = await getTodo();

  spinner.style.display = "none";

  if (respons.succass) {
    ul.style.display = "";

    console.log(respons);

    let data = size ? respons.data.slice(0, size) : respons;
    data.map((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <p class="text-li"  id=${(item.completed && `text-didtn `) || ""}>${
        item.title
      }</p>
      
          <div class="button-li">

            ${
              (item.completed &&
                `<i class="fa-solid fa-circle-check" id="check"></i>`) ||
              ``
            }
              
      
              <button class="all-button" id="delete-btn"  onclick="deleteTask(${
                item.id
              })">
              <i class="fa-solid fa-trash"></i>
              </button>
      
              <button class="all-button" id="pen-btn"  onclick="editPutTask(${
                item.id
              })">
              <i class="fa-solid fa-pen"></i>
              </button>
          </div>
        `;

      ul.appendChild(li);
    });
  } else {
    error.style.display = "";
  }
};
// ------------
setTodo(15);
// ------------

// write the text error

let textError = document.getElementById("text-error");
textError.style.display = "none";

let postBtn = async () => {
  let inputPostAndPut = document.getElementById("input-post-and-put").value;
  document.getElementById("input-post-and-put").value = null;
  if (inputPostAndPut !== "") {
    textError.style.display = "none";
    let respons = await axios.post(
      url,
      (inputNewVlue = { title: inputPostAndPut, completed: false, ucerId: 1 })
    );

    console.log("ohshadi");
    setTodo();
    return { succass: true, data: respons };
  } else {
    console.log("ohshamadi");
    textError.style.display = "";
    console.error("error :" + error);
    return { succass: false };
  }
};

// edit

let editNewTask;
let editPutTask = async (id) => {
  try {
    let respons = await axios.get(url + "/" + id);

    document.getElementById("input-post-and-put").value = respons.data.title;
    editNewTask = respons.data;
    console.log(editNewTask);
    return { success: true };
  } catch (error) {
    console.error("error :" + error);
    return { success: false };
  }
};

let putBtn = async () => {
  if (document.getElementById("input-post-and-put").value !== "") {
    textError.style.display = "none";
    let putNewInput = document.getElementById("input-post-and-put").value;

    document.getElementById("input-post-and-put").value = "";

    await axios.put(url + "/" + editNewTask.id, {
      title: putNewInput,
      completed: editNewTask.completed,
    });

    console.log(putNewInput);
  } else {
    textError.style.display = "";
  }
};

// delete Task

let deleteTask = async (id) => {
  let respons = await axios.delete(url + "/" + id);

  return respons;
};
