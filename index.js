import { menuArray } from '/data.js'
const menuTemplate = document.getElementById("menu")
const orderedMenu = document.getElementById("ordered-menu")
const hidden = document.getElementById('hidden')
const totalPrice = document.getElementById('total-price')
const completeOrder = document.getElementById('complete-order')
const closeBtn = document.getElementById('modal-close-btn')
const hiddenForm = document.getElementById('hidden-form')
const payBtn = document.getElementById('pay-btn')
const resetBtn  = document.getElementById('reset')
let orderedItemsArray = []


document.addEventListener('click', (e) =>{
    if(e.target.dataset.buy){
        handleBuyClick(e.target.dataset.buy)
    }else if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    } else if(e.target.id === 'complete-order'){
        handlePaymentWindow()
    } else if(e.target.id === 'modal-close-btn'){
        hiddenForm.style.display = 'none'
    } else if(e.target.id === 'pay-btn'){
        e.preventDefault()
        if(!hiddenForm.checkValidity()){
            alert('Please fill out all required fields.');
            return;
        }
        hiddenForm.style.display = 'none'
        
        const consentForm = new FormData(hiddenForm)
        const name = consentForm.get('userName')
        
        hidden.innerHTML = `Thank you ${name}, your order is on its way`
        hidden.style.backgroundColor = "#ECFDF5"
        hidden.style.color = "#065F46"
        hidden.style.padding = "2em"
        reset.style.display = "inline-block"
        
    } else if(e.target.id === 'reset'){
        location.reload();
    }
    calculatePrice()
})

function handleBuyClick(itemId){
    
    const addedItem = menuArray.filter(function(item){
        return item.id == itemId  
    })[0]
    orderedItemsArray.push(addedItem)
    renderOrderedItems()
    hidden.style.display = 'block'
    
}


function handleRemoveBtn(itemIndex){
    orderedItemsArray.splice(itemIndex, 1)
    
    if(orderedItemsArray.length === 0) {
        hidden.style.display = 'none'
    }
    
    
    renderOrderedItems()
    
}

function handlePaymentWindow(){
    hiddenForm.style.display = 'block'
}

function calculatePrice() {
    let price = 0;
    orderedItemsArray.forEach((prices)=>{
        price += prices.price
    })
    
    totalPrice.textContent = '$' +  price 
    
    
}


function renderOrderedItems() {
    let orderedItemHtml = ''
    orderedItemsArray.forEach((orderedItem, index)=>{
        orderedItemHtml += `
    
            <div class='ordered-menu-container'>
                
                <div class='menu-ordered-inner'>
                    <h2>${orderedItem.name}</h2>
                    <button class='remove-btn' data-remove="${index}">Remove</button>
                </div>
                <p>$${orderedItem.price}</p>
                
            </div>
             
        `
    })
    
    orderedMenu.innerHTML = orderedItemHtml
    
}



function getOrderArray() {
    let menuHtml = ''
    menuArray.forEach((menuItem)=>{
        menuHtml += `
            <div class="container">
                <div class="container-inner">
                    <div>
                        <h1>${menuItem.emoji}</h1>
                    </div>
                
                    <div>
                        <h2>${menuItem.name}</h2>
                        <p class="ingredients">${menuItem.ingredients}</p>
                        <p>$${menuItem.price}</p>
                    </div>
                </div>
               <button data-buy='${menuItem.id}' class="add-btn">X</button>
            </div>
        `
    })
    
    return menuHtml
}

function render() {
    menuTemplate.innerHTML = getOrderArray()
}

render()

