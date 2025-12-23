document.addEventListener('DOMContentLoaded',()=>{

    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || []
    let totalAmount = 0;
    renderExpense();

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        let expenseName = expenseNameInput.value.trim();
        let amount = parseFloat(expenseAmountInput.value.trim());
        //converting to float since all the values returned by form is string

        if(expenseName !== ""){
            if(amount !== "" && !isNaN(amount) && amount>0){
                const newExpense ={
                    expenseName,
                    amount:amount,
                    id: Date.now()
                }
                //expenseName , this will set the attribute and the
                //value as same

                expenses.push(newExpense);
                saveExpenseToLocalStorage();
                renderExpense();
            }
        }

        expenseAmountInput.value="";
        expenseNameInput.value="";
    })

    function saveExpenseToLocalStorage(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }

    function updateAmount(){
        return expenses.reduce((accumulator,eachExpense)=>
                accumulator+eachExpense.amount,0
        )
    }
    function renderExpense(){
        expenseList.innerHTML="";
        expenses.forEach( expense=> {
            let li=document.createElement("li");
            li.innerHTML=`
            ${expense.expenseName} - $${expense.amount}
            <button id="${expense.id}">Delete</button>`;

            li.addEventListener("click",(e)=>{
                if(e.target.tagName === 'BUTTON'){
                    let liToBeRemoved = parseInt( e.target.getAttribute('id'));
                    expenses = expenses.filter(eachExpense=> eachExpense.id !== liToBeRemoved);
                    saveExpenseToLocalStorage();
                    renderExpense();
                }
            })

            expenseList.appendChild(li);
        });
        totalAmountDisplay.innerHTML=updateAmount();
    }
})