const input_Box = document.getElementById("inputBox");
const list_Container = document.getElementById("listContainer");
const todoPage = document.querySelector(".todoPage");

let undoTimeout;
let lastRemovedTask = null;

function addTask() {
    if(input_Box.value === ''){
        alert("You must write somethign first to add a task ");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = input_Box.value;
        list_Container.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("remove-btn");//
        li.appendChild(span);
        
    }
    input_Box.value = "";
    saveData();
}

list_Container.addEventListener("click", function(e) {
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN" && e.target.classList.contains("remove-btn")){
        lastRemovedTask = e.target.parentElement;
        e.target.parentElement.remove();
        showUndoButton(); 
        saveData();
    }
},false);

// function for undo button
function showUndoButton() {
    let undoButton = document.createElement("button");
    undoButton.innerText = "Undo";
    undoButton.classList.add("undo-btn");

    // Append the Undo button to the bottom of the .todoPage
    todoPage.appendChild(undoButton);

    // Set a timer to hide the Undo button after 5 seconds
    undoTimeout = setTimeout(() => {
        if (undoButton.parentElement) {
            undoButton.remove();
        }
        lastRemovedTask = null; // Clear the removed task reference
    }, 5000);
       // Add Undo functionality
       undoButton.addEventListener("click", function () {
        if (lastRemovedTask) {
            list_Container.appendChild(lastRemovedTask); // Restore the task
            saveData();
        }
        clearTimeout(undoTimeout); // Cancel the timer
        undoButton.remove(); // Remove the Undo button
    });
}
function saveData(){
    localStorage.setItem("data", list_Container.innerHTML);
}

function showTask() {
    list_Container.innerHTML = localStorage.getItem("data") || "";

}

showTask();

// localStorage.clear();