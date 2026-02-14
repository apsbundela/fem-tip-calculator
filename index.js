const billAmountEle = document.getElementById("bill-amt");
const tipContainerEle = document.getElementById("tip-selection");
const customTipEle = document.getElementById("custom-tip");
const totalPeopleEle = document.getElementById("total-people");
const totalTipAmountPPEle = document.getElementById("total-tip-amt");
const totalBillAmountPPEle = document.getElementById("total-bil-amt");
const resetBtn = document.getElementById("resetbtn");

let billAmount = 0;
let totalPeople = 0;
let selectedTip = null; // Explictly null, tip can be 0;
let finalTipAmountPerPerson = 0;
let finalBillAmountPerPerson = 0


// *********** Handle Amount *************
billAmountEle.addEventListener("input",(e)=>{
    let inpValue = Number(e.target.value);

    billAmount = inpValue;
    calculateBill();
})


// ************ Handle  People ***************
totalPeopleEle.addEventListener("input",(e)=>{
    let inpValue = Number(e.target.value);
        totalPeople = inpValue;
        calculateBill();
})


// *************Handle  Tip *******************
tipContainerEle.addEventListener("click", (e) => {

    const activeBtn = e.target;

    if (activeBtn.tagName !== "BUTTON") return;

    // Remove active from all buttons
    const buttons = tipContainerEle.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("active"));

    // Add active to clicked button
    activeBtn.classList.add("active");

    // Clear custom input
    customTipEle.value = "";

    // Set selected tip
    selectedTip = Number(activeBtn.dataset.tip) / 100;

    calculateBill();
});
customTipEle.addEventListener("input",(e)=>{
    let inpValue = Number(e.target.value);
        selectedTip = inpValue/100;
        calculateBill();
})



// **************** Calculation *******************
const calculateBill = ()=>{

    if((!Number.isNaN(billAmount) && billAmount > 0) 
        && (!Number.isNaN(totalPeople) && totalPeople > 0) 
        && (!Number.isNaN(selectedTip) && selectedTip !== null && selectedTip > 0)) {
        
        resetBtn.classList.remove("disable-btn");
        resetBtn.disabled = false;
        const totalTip = billAmount * selectedTip;
        const totalTipPP = totalTip /  totalPeople;
        const totalBillAmountPP = ( billAmount + totalTip ) / totalPeople;

        totalTipAmountPPEle.textContent = totalTipPP.toFixed(2);
        totalBillAmountPPEle.textContent = totalBillAmountPP.toFixed(2);

    } else {
        resetBtn.classList.add("disable-btn");
        resetBtn.disabled = true;
        totalTipAmountPPEle.textContent = "0";
        totalBillAmountPPEle.textContent = "0";

    }
}

resetBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    
    billAmount = 0;
    totalPeople = 0;
    selectedTip = null;

    billAmountEle.value = "";
    totalPeopleEle.value = "";
    customTipEle.value = "";

    resetBtn.classList.add("disable-btn");
    resetBtn.disabled = true;
    const buttons = tipContainerEle.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("active"));

    totalTipAmountPPEle.textContent = "$0.00";
    totalBillAmountPPEle.textContent = "$0.00";

})



