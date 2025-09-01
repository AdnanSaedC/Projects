//what we are doing here is as soon as the html and css load we want
/**to load the javscript
 * 
 */

document.addEventListener('DOMContentLoaded',()=>{
    console.log("hi0");
    const todoListInputButton = document.getElementById("add-task-btn")
    const todoListInput=document.getElementById("todo-input")
    const todoList= document.getElementById("todo-list")

    let tasks=JSON.parse(localStorage.getItem("tasks")) || [] ;
    //we have an empty array for first time login and 
    //for more than first time we will extract from local storage

    //now how to extract task and load them

    tasks.forEach((taskOfInterest) => { displayTask(taskOfInterest) } );

    function displayTask(task){
        console.log(task)
    }

    todoListInputButton.addEventListener("click",()=>{
        const taskText = todoListInput.value.trim();

        //checking whether the inout field is empty or not
        if(taskText === "" ) return;
            //dont do anything
        
        const newTask = {
            id:Date.now(),//it will give unique id
            text:taskText,
            Completed:false
        }

        tasks.push(newTask);
        saveTaskInTheLocalStorage();

        //lets clean the input field
        todoListInput.value=""
    })

    function saveTaskInTheLocalStorage(){
        localStorage.setItem("tasks",JSON.stringify(tasks));

        //we are storing the task in the local storage 
        /**
         * task is the key and json.stringify because you can only store
         * in the string format
         */
    }
})

