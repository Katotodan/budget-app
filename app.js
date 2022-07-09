const inputBudget = document.querySelector("#budget");
const subBudget = document.querySelector(".bugdetSub");
const expensiveInput = document.querySelector("#expensive");
const expensiveValue = document.querySelector("#amount");
const addItem = document.querySelector(".addItem");

const budgetOutput = document.querySelector(".budgetAmount");
const expensiveOutput = document.querySelector(".budgetExpenses");
const balanceOutput = document.querySelector(".budgetBalance");
let budget = 0;
let expensive = 0;

let successMsg = () =>{
    const msg = document.querySelector(".success");
    msg.style.display = "block"
    setTimeout(() => {
        msg.style.display = "none"
    }, 3000);
}
let failMsg = () =>{
    const msgfail = document.querySelector(".fail");
    msgfail.style.display = "block"
    setTimeout(() => {
        msgfail.style.display = "none"
    }, 3000);
}

if(localStorage.getItem("budget")){
    budgetOutput.innerHTML = localStorage.getItem("budget"); 
    budget = parseInt(localStorage.getItem("budget"))  
}
if(localStorage.getItem("expensive")){
    expensive = parseInt(localStorage.getItem('expensive'));
    expensiveOutput.innerHTML = ` $ ${expensive}`;
}

subBudget.addEventListener("click", (e) =>{
    e.preventDefault();
    if(inputBudget.value != ""){
        budget = parseInt(inputBudget.value)
        localStorage.setItem("budget", inputBudget.value);
        budgetOutput.innerHTML =` $ ${localStorage.getItem("budget")}` ;
        inputBudget.value = "";
        balance();
        inputBudget.blur()
        successMsg();
    }else{
        failMsg();
    }
    
})

let item ;

addItem.addEventListener("click", (e)=>{
    e.preventDefault()
    let time = new Date;
    let timer = time.getTime();
    if(expensiveInput.value != "" && expensiveValue.value != "" ){
        item = document.createElement('div');
        item.innerHTML = `
            <span>${expensiveInput.value}</span> 
            <span class = "expensive"> $ ${expensiveValue.value}</span> 
            <span>
                <strong class ="updateItem"> 📝 </strong> 
                <strong class = "deletebtn " id = "${timer.toString()}">❌</strong>
            </span>
        `
        expensive += parseInt(expensiveValue.value);
        localStorage.setItem("expensive", expensive.toString());
        expensiveOutput.innerHTML = ` $ ${expensive}`;

        //addItemToLocalstorage();
        localStorage.setItem(timer.toString(), item.innerHTML)
        //displayLastItem()
        document.querySelector("aside:last-child article").appendChild(item);
        updateItem = document.querySelectorAll(".updateItem")
        deletebtn = document.querySelectorAll(".deletebtn");
        btn();
        balance();
        expensiveInput.value = "";
        expensiveValue.value = "";
        expensiveInput.blur()
        expensiveValue.blur()
        successMsg()

    }else{
        failMsg()
    }   
})


const displayContent = () =>{
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        if(key !== 'budget' && key !== 'expensive' ){
            item = document.createElement('div');
            item.innerHTML= localStorage.getItem(key);
            document.querySelector("aside:last-child article").appendChild(item);
        }   
    }
    
}
displayContent()

let deletebtn = document.querySelectorAll(".deletebtn");
let updateItem = document.querySelectorAll(".updateItem")

const btn = () => {
    deletebtn.forEach((element) =>{
        element.addEventListener("click", () =>{
            element.parentNode.parentNode.remove()
            localStorage.removeItem(element.id);
            expensiveness()
            balance();   
        })
    })

    updateItem.forEach((element, index) =>{
        element.addEventListener("click", () =>{
            expensiveInput.value = element.parentNode.parentNode.children[0].innerHTML;
            let el = (element.parentNode.parentNode.children[1].innerHTML).slice(3)
            expensiveValue.value = (element.parentNode.parentNode.children[1].innerHTML).slice(3);
            element.parentNode.parentNode.remove();
            localStorage.removeItem(element.parentNode.parentNode.children[2].children[1].id);
            expensiveness()
            balance();
        })
    })
}
btn()

let balance = () =>{
    let balance = budget - expensive;
    balanceOutput.innerHTML =` $ ${balance}`;
}
balance();

const expensiveness = () =>{
    const elmt = document.querySelectorAll("div span.expensive");
    expensive = 0;
    for(let i= 0; i<elmt.length; i++){
        expensive += parseInt((elmt[i].innerHTML).slice(3));   
    }
    localStorage.setItem("expensive" , expensive.toString());
    expensiveOutput.innerHTML = `$ ${expensive}`;
}










