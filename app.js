const allmatchs = JSON.parse(localStorage.getItem('allmatchs'))||[]
const customers = JSON.parse(localStorage.getItem('customers')) || []
const result1 = JSON.parse(localStorage.getItem('result1')) || []

let seealliFrame = document.createElement('iframe')
  seealliFrame.className=('see-all')
  seealliFrame.classList.add('inactive')
  seealliFrame.src = 'seeall.html'
  document.querySelector('.seeall-iframe').append(seealliFrame)

  document.querySelector('.setting-btn').addEventListener('click',()=>{
    iFrames.forEach((content) => {
      content.classList.add("inactive");
    });
    document.querySelector('.settinglists-display').classList.remove('inactive')
    document.querySelector('.toggle-display').classList.remove('inactive')
    document.querySelector('.teamlists-display').classList.remove('inactive')
    document.querySelector('.teamsiframe-display').classList.remove('inactive')
    document.querySelector('.back-btn').classList.remove('inactive')
    document.querySelector('.setting-btn').classList.add('inactive')
  });

  document.querySelector('.back-btn').addEventListener('click',()=>{
    window.location.reload()
  });

let settingBtns = document.querySelectorAll('.list-btn')  
let displays = document.querySelectorAll('.display')  
settingBtns.forEach((btn,index)=>{
  btn.addEventListener('click',()=>{
    settingBtns.forEach(btns=>{
      btns.style.color = 'black'
      document.querySelector('.settinglists-display').classList.add('inactive')
    })
    btn.style.color = 'red'
    displays.forEach(dis=>{
      dis.classList.add('inactive')
    })
    document.querySelector('.teamlists-display').classList.add('inactive')
    document.querySelector('.teamsiframe-display').classList.add('inactive')
    displays[index].classList.remove('inactive')
  })
});

document.querySelector('.for-edit-btn').addEventListener('click',()=>{
  document.querySelector('.matchcreate-ctn').classList.remove('inactive')
  document.querySelector('.teamlists-display').classList.remove('inactive')
  document.querySelector('.add-btn').classList.add('inactive')
  document.querySelector('.save-btn').classList.add('inactive')
  let btns = document.querySelectorAll('.edit-btn')
  btns.forEach(btn=>{
    btn.classList.remove('inactive')
  })
});

function focusNext(event,next){
   if(event.key === 'Enter'){
    event.preventDefault()
    document.getElementById(next).focus()
  }
};

document.getElementById('focus4').addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
    e.preventDefault()
  }
  addCustomers()
});

document.getElementById('focus7').addEventListener('keydown',(e)=>{
  if(e.key === 'Enter'){
    e.preventDefault()
  }
  addTeam()
});

let navBtns = document.querySelectorAll('.nav-bar button')
navBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    navBtns.forEach(btns=>{
      btns.style.backgroundColor = 'black'
    })
    btn.style.backgroundColor = 'green'
  })
});

document.querySelector('.seeall-btn').addEventListener('click',()=>{
  document.querySelectorAll('.iframes').forEach(frame=>{
    frame.classList.add('inactive')
  })
  document.querySelector('.see-all').classList.remove('inactive')
  document.querySelector('.teamlists-display').classList.add('inactive')
});

const customerDisplay=()=>{
  let html=''
    customers.forEach((name,index) => {
        let customer = name.name.charAt(0).toUpperCase() + name.name.slice(1)
        html +="<div class='customer-div'>"
        html +=`
           <div class='customer-details'>
            <div>${customer}</div><div> (+${name.plus}) . (-${name.minus}) </div>
           </div>
        `
        html += `<button class="removecustomer-btn" onclick="removeCustomer(${index})">X</button>`
        html +="</div >"
        document.querySelector('.customer-display').innerHTML =` <div class='caution'>Customers</div>` + html
    })
};

customerDisplay()

const addCustomers=()=>{
 document.querySelector('.customersave-btn').classList.remove('inactive')
 let Name = document.querySelector('.customer-input').value
 let name = Name.toLowerCase()
 let plus = document.querySelector('.plus-com').value
 let minus = document.querySelector('.minus-com').value

 plusComm = 1 - (plus/100)
 minusComm = 1 - (minus/100)
 if(name ==''){
  return
 }
 if(plus == 0){
  plusComm = 1
 }
 if(minus == 0){
  minusComm = 1
 }
 let obj={name,plusComm,minusComm,plus,minus}
  customers.push(
   obj
 )
localStorage.setItem('customers',JSON.stringify(customers))
document.querySelector('.customer-input').value = ''

refreshCustomerDisplay()
};

const refreshCustomerDisplay=()=>{
  let html=''
  customers.forEach((name,index) => {
      let customer = name.name.charAt(0).toUpperCase() + name.name.slice(1)
      html +="<div class='customer-div'>"
      html +=`
         <div class='customer-details'>
          <div>${customer}</div><div> (+${name.plus}) . (-${name.minus}) </div>
         </div>
      `
      html += `<button class="removecustomer-btn" onclick="removeCustomer(${index})">X</button>`
      html +="</div >"
      document.querySelector('.customer-display').innerHTML = html
  })
};

const removeCustomer=(index)=>{
    customers.splice(index,1)
    localStorage.setItem('customers',JSON.stringify(customers))
    refreshCustomerDisplay()
};

const addTeam=()=>{
    let pName = document.querySelector('.upname-input').value
    let dName = document.querySelector('.doname-input').value
    if(pName == "" || dName == ""){
      alert('Enter Team name')
      return
    }
    allmatchs.push({
        pName:pName,
        dName:dName
    })
    localStorage.setItem('allmatchs',JSON.stringify(allmatchs))
    document.querySelector('.upname-input').value = ''
    document.querySelector('.doname-input').value = ''
    refresh(document.querySelector('.teamlists-display'))
  };

  for(let i=0;i<allmatchs.length;i++){
    let newIframe = document.createElement('iframe')
    newIframe.className = 'iframes inactive'
    newIframe.src = 'match'+(i+1 )+'.html'
    document.querySelector('.teamsiframe-display').append(newIframe)
  };


const Save=()=>{
  window.location.reload()
};

const refresh=()=>{
  let html=''
  allmatchs.forEach((vs,index) => {
      html +="<div class='match-title-div'>"
      html +=`
         <div class='match-title'>
          ${index+1}.   ${vs.pName}   Vs   ${vs.dName}
         </div>
      `
      html +="</div >"
      document.querySelector('.teamlists-display').innerHTML = html
  });
};

const showAddteam=()=>{
    let html=''
    allmatchs.forEach((vs,index) => {
        html +="<div class='match-title-div'>"
        html +=`
           <div class='match-title'>
            ${index+1}.   ${vs.pName}   Vs   ${vs.dName}
           </div>
        `
        html += `<button class="edit-btn inactive" onclick="Edit(${index})">Edit</button>`
        html += `<button class="sub-btn inactive" onclick="Submit(${index})">Sub</button>`
        html +="</div >"
        document.querySelector('.teamlists-display').innerHTML = html
    });
};

showAddteam();

const matchTitles = document.querySelectorAll('.match-title')
const iFrames = document.querySelectorAll('.iframes')
matchTitles.forEach((title, index) => {
    title.addEventListener("click", () => {
      document.querySelector('.teamlists-display').classList.add('inactive')
      document.querySelector('.settinglists-display').classList.add('inactive')
      matchTitles.forEach((title) => {
        title.classList.remove('active');
      });
      title.classList.add('active')
      iFrames.forEach((content) => {
        content.classList.add("inactive");
      });
      iFrames[index].classList.remove("inactive");
    });
 });

 document.querySelector('.logo').addEventListener('click',()=>{
  window.location.reload()
 });

 const Edit=(index)=>{
   let editBtns = document.querySelectorAll('.edit-btn')
   editBtns.forEach(btn=>{
     btn.classList.add('inactive')
    document.querySelector('.add-btn').classList.add('inactive')
    document.querySelector('.save-btn').classList.add('inactive')
    let matchTitles= document.querySelectorAll('.match-title')
    matchTitles.forEach(title=>{
      title.classList.add('inactive')
    })
    matchTitles[index].classList.remove('inactive')
  });
  
  document.querySelector('.upname-input').value = allmatchs[index].pName
  document.querySelector('.doname-input').value = allmatchs[index].dName
  document.querySelectorAll('.sub-btn')[index].classList.remove('inactive')
 };

 const Submit=(index)=>{
  window.location.reload()
  allmatchs[index].pName = document.querySelector('.upname-input').value
  allmatchs[index].dName = document.querySelector('.doname-input').value
  if(allmatchs[index].pName == "" || allmatchs[index].dName == ""){
    alert('Enter Team name')
    return
  }
  localStorage.setItem('allmatchs',JSON.stringify(allmatchs))
  let newScore = JSON.parse(localStorage.getItem('score'+(index+1)))||[]
  newScore.splice(0,newScore.length)
  localStorage.setItem('score'+(index+1),JSON.stringify(newScore))
  let newResult = JSON.parse(localStorage.getItem('score'+(index+1)))||[]
  newResult.splice(0,newResult.length)
  localStorage.setItem('result'+(index+1),JSON.stringify(newResult))
  document.querySelector('.upname-input').value = ''
  document.querySelector('.doname-input').value = ''
 };
 

