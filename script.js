var inputBox = document.querySelector(".inputFied input") ;
var addBtn = document.querySelector(".inputFied button");
const Todolist = document.querySelector(".Todolist");
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup=()=>{
    let userdata = inputBox.value
    if( userdata.trim() != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active")
    }
}

ShowTask();

addBtn.onclick = ()=>{
    let userdata = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New ToDo");
    if(getLocalStorageData == null){
         listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorageData);
    }
    listArr.push(userdata);
    localStorage.setItem("New ToDo", JSON.stringify(listArr) );// Đưa dữ liệu mới vào Strorage, ở đây local storage chỉ hiểu kí tự là string.
    ShowTask();
    addBtn.classList.remove("active");
}

function ShowTask() {
    let getLocalStorageData = localStorage.getItem("New ToDo");
    if(getLocalStorageData == null){
         listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStorageData);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active")
    }
    else{
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = "";
    listArr.forEach((element,index) => {
        newLiTag += `<li>${element}<span onclick ="deleteTask(${index})"><i class="fa-solid fa-trash"></i></span></li>`;
    });
    Todolist.innerHTML = newLiTag;// inside HTML
    inputBox.value = "";// khi ấn thêm thì giá trị trong ô input tự chuyển về chuỗi trống để nhậ task tiếp theo
}
// deleteFunction
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorageData);
    listArr.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    ShowTask();
}

deleteAllBtn.onclick = () => {
    listArr = [];
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    ShowTask();
}
