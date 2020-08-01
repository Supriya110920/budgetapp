class BudgetApp{
    constructor(addBudgetBtn,addExpenseBtn,table){
        addBudgetBtn.addEventListener('click', this.addBudget.bind(this));
        addExpenseBtn.addEventListener('click', this.addExpense.bind(this));
        table.addEventListener('click', this.deleteExpense.bind(this));
        table.addEventListener('click' , this.editExpenses.bind(this));
        this.budgetAmount = document.querySelector("#budget-amount");
        this.errors = document.querySelectorAll(".error");
        this.showBudget = document.querySelector("#feedback-item__budget__show");
        this.showExpenses = document.querySelector(
        "#feedback-item__expenses__show");
        this.showBalance = document.querySelector("#feedback-item__balance__show");
        this.expenseName = document.querySelector("#expense-name");
        this.expenseAmount = document.querySelector("#expense-amount");
        this.template = document.querySelector("#expense-row");
        this.tbody = document.querySelector("tbody");
        this.clone;
    }
    addBudget(){
        if(+this.budgetAmount.value <= 0  ||isNaN(+this.budgetAmount.value)) //if the budget amount is zero or invalid (isNaN for checking invalid) ? //
            {
                this.errors[0].classList.add('error-show'); //the error message show by showing error class//
                this.budgetAmount.classList.add('input-error'); //the input box become red //
                setTimeout(()=>{
                  this.errors[0].classList.remove('error-show'); //the error message gone //
                  this.budgetAmount.classList.remove('input-error');//the red border gone//
                },3000); //after 3 sec//

            }
        else{
                this.showBudget.innerText = +this.budgetAmount.value;   //add the budget value and shown//
                this.showBalance.innerText = +this.budgetAmount.value - +this.showExpenses.innerText; //balance amount calculate and shown//
                this.budgetAmount.value = ''; //the budget input box become empty after giving input//
            }
    }
    
    addExpense(){
        if(this.expenseName.value === '' || /\d/.test(this.expenseName.value)) //if expences name is empty or any numeric ? //
        {
                this.errors[1].classList.add('error-show'); //show error//
                this.expenseName.classList.add('input-error'); //border red//
                setTimeout(()=>{
                    this.errors[1].classList.remove('error-show'); //error gone//
                this.expenseName.classList.remove('input-error'); //red border gone//
                },3000);//after 3 sec//
            }
            else if(+this.expenseAmount.value <= 0 ||isNaN(+this.expenseAmount.value)) //if the expences amount is zero or invalid //
            {
                    this.errors[2].classList.add('error-show'); //show error// 
                    this.expenseAmount.classList.add('input-error');//border red//
                    setTimeout(()=>{
                        this.errors[2].classList.remove('error-show');//error gone//
                    this.expenseAmount.classList.remove('input-error'); //border gone//
                    },3000);//after 3 sec//
            }
            else{
                //the botom table work//
                this.clone = this.template.content.cloneNode(true); //the expences row content are printed in table//
                let td = this.clone.querySelectorAll('td'); // the <td> tags all elements are stored in td variable//
                td[0].innerText = this.expenseName.value; //expencesname print [0] colom & .value is used to return value &.innerText mean td[0] values assign in singel variable //                
                td[1].innerText = +this.expenseAmount.value;// expences amount stored next colom //
                this.tbody.appendChild(this.clone);//adding next value in table body and increasing row//
                
                //the income expences and balance work //
                this.showExpenses.innerText = +this.showExpenses.innerText + +this.expenseAmount.value; // show expences =expences + new expences //
                this.showBalance.innerText = +this.showBalance.innerText - +this.expenseAmount.value; // show balance =balance - expenxes //
                
                //the input form work//
                this.expenseName.value = ''; //expences name become blank after submit //
                this.expenseAmount.value = '';//expences amount blank after submit
            }
    }
    deleteExpense(e){ //the specified delet biuuon click//
        if(e.target.classList.contains('deleteRow'))//deletrow class of which row in table//
        {
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;//show balance = balance + those row expexnces value//   

            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;//show expences =expences - deleted rows expences //

            e.target.closest('tr').remove(); //the row removes //
        }
    }

    editExpenses(e){
        if(e.target.classList.contains('editRow')){ //editrow class of which table//
            this.showBalance.innerText = +this.showBalance.innerText + +e.target.closest('tr').children[1].innerText;// balance =balance +those rows expence value//
            this.showExpenses.innerText = +this.showExpenses.innerText - +e.target.closest('tr').children[1].innerText;// expences =expences - deleted rows expences//
            this.expenseName.value = e.target.closest('tr').children[0].innerText; //new expences name ready to edit //
            this.expenseAmount.value = e.target.closest('tr').children[1].innerText;//new expences value ready to edit //
            this.expenseAmount.focus();// the cursor goes to expences amount input box//
            e.target.closest('tr').remove();//the row deleted//
        }
    }
}


document.addEventListener('DOMContentLoaded', init); //the all 4 functions are called which contain in addEventListner function//


function init(){//function initialising//
    const addBudgetBtn = document.querySelector('#add-budget'); // add-budget id initialised in addBudget constant//
    const addExpenseBtn = document.querySelector('#expense-add');//expense-add id initialised in addExpences//
    const table = document.querySelector('table');//the <table> tag values initialised in table constant//
    new BudgetApp(addBudgetBtn,addExpenseBtn,table); //new Budget app function call//
}