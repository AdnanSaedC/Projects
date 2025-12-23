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
        const li=document.createElement("li");
        li.setAttribute("data-id",task.id);
        li.innerHTML=`<span>${task.text}</span>
        <button>delete</button>`;

        //this is to strike through the content
        li.addEventListener("click",(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            
            task.Completed=!task.Completed;
            li.classList.toggle('completed');
            saveTaskInTheLocalStorage();
        })

        //now lets add the functionality to delete button
        li.querySelector('button').addEventListener('click',(e)=>{
            //we are selecting the button from the li
            //and stop propogation is becvause we dont wanrt
            //to strike through the content
            e.stopPropagation();
            tasks=tasks.filter(individualTask => individualTask.id!==task.id)
            //we have successfully removed the task item from the array
            //now remove it from the html page itself 
            li.remove();

            saveTaskInTheLocalStorage()

            /**
             * what we are doing here is we are running a filter on
             * task array and each value in the task is extracted and its id
             * is comapred with the one which is operation
             * 
             * now we have included all the functionalities now add it in the ul
             */
        })
        todoList.appendChild(li);
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
        displayTask(newTask);

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

    const clearButton=document.getElementById("clear-tasks-btn");
    clearButton.addEventListener("click",(e)=>{
        e.stopPropagation();
        tasks=[];
        saveTaskInTheLocalStorage();
        todoList.innerHTML="";
    })
})

