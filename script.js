'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////


// Data
const account1 = {
  owner: 'Hassan Ahmad',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Danish Khan',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Mohit Verma',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Manoj Madan',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');


const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// let currentAccount;

// btnLogin.addEventListener("click",function(e){
//   e.preventDefault(); 
//   currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value)
//   console.log(currentAccount)
// })

/////////////////////////////////////////////////


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);




const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

btnTransfer.addEventListener("click",function(e){
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const recieverAccount=accounts.find(acc=>acc.username===inputTransferTo.value)
  if(amount>0 && recieverAccount&& currentAccount.balance>=amount && recieverAccount?.username!==currentAccount.username){
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount)
    updateUI(currentAccount)
    window.alert("Transfer Successful");
  }
  else{
    window.alert("Transfer Failed");
  }
  inputTransferTo.value=inputTransferAmount.value="";

})


const updateUI=function(acc){
    //Display Movements
    displayMovements(acc.movements);
    //Display Balance
    calcDisplayBalance(acc)
    //Display Summary
    calcDisplaySummary(acc.movements);


}




/////////////////////
const createUsername=function(accs){
  accs.forEach(function(acc){
    acc.username=acc.owner.toLowerCase().split(" ").map(name=>name[0]).join("");

  });
};
createUsername(accounts);

let currentAccount;

btnLogin.addEventListener("click",function(e){
  e.preventDefault();
  console.log("login")
  currentAccount= accounts.find(acc=>acc.username===inputLoginUsername.value);
  console.log(currentAccount)
  if(currentAccount?.pin===Number(inputLoginPin.value)){
    //Display UI and Welcome Msg
    console.log("Logged in")
    labelWelcome.textContent=`
                                 Welcome Back ${currentAccount.owner.split(" ")[0]}
                              `
    containerApp.getElementsByClassName.opacity=100;
    //clear fields
    inputLoginUsername.value=inputLoginPin.value="";
    inputLoginPin.blur()
    window.alert("Login successful");
    updateUI(currentAccount); 
  }
  else{
    window.alert("Enter Correct User && PIN");
  }
  })


btnLoan.addEventListener("click",function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount>0 && currentAccount.movements.some(mov => mov >= amount*0.1)){
    //add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    window.alert("Loan Granted");

  }
  else{
    window.alert("Any deposit should be > 10% of Loan amount");
  }
  inputLoanAmount.value="";
  })



btnClose.addEventListener("click",function(e){
  e.preventDefault();
  if(inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value)===currentAccount.pin){
    
    const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
    console.log(index)
    inputCloseUsername.value=inputClosePin.value=""
    accounts.splice(index,1);

    containerApp.style.opacity=0;
    window.alert("Account Closed");
  }
  else{console.log("Incorrect")}
})

const displayMovements=function(movements){
  containerMovements.innerHTML=" "
  movements.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html=`
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}




const calcDisplayBalance=function(acc){
  acc.balance=acc.movements.reduce((acc,mov)=>acc+mov,0);
  
  labelBalance.textContent=`${acc.balance} EUR`;
}


const calcDisplaySummary=function(movements){
  const incomes=movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${incomes} EUR`;

  const out=movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(out)} EUR`
  const inttRate=currentAccount.interestRate
  const interest=movements.filter(int=>int>0)
                          .map(int=>int*inttRate/100)
                          .filter(int=>int>1)
                          .reduce((acc,int)=>acc+int,0);
  labelSumInterest.textContent=`${interest}EUR`
  console.log(inttRate)

}







const eurToUsd=1.1;
const totalDepositsUSD=movements
                  .filter(mov=>mov>0)
                  .map(mov=>mov*eurToUsd)
                  .reduce((acc,mov)=>acc+mov,0);

totalDepositsUSD


const firstWithdrawal=movements.find(mov=>mov<0)
console.log(movements)
console.log(firstWithdrawal)

const account=accounts.find(acc=>acc.owner==='Jessica Davis');

console.log(account)

