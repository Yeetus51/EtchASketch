let container = document.createElement("div"); 
document.body.appendChild(container);

let titleDiv = document.createElement("div"); 
container.appendChild(titleDiv);

let titleH1 = document.createElement("h1");
titleDiv.appendChild(titleH1);

titleH1.textContent = "Etch A Sketch"; 

titleDiv.style.display = "flex";
titleDiv.style.justifyContent = "center";
titleDiv.style.backgroundColor = "rgb(47, 79, 79)"



let displayContainer = document.createElement("div"); 
container.appendChild(displayContainer); 

displayContainer.style.display = "flex";
displayContainer.style.justifyContent = "center";
displayContainer.style.backgroundColor = "rgb(47, 79, 255)"




let settingsDisplay = document.createElement("div");
displayContainer.appendChild(settingsDisplay); 
settingsDisplay.style.backgroundColor = "rgb(47, 255, 79)"
settingsDisplay.style.width = "20%"

let drawingWindowSize = 600; 

let etchASketckDisplay = document.createElement("div"); 
displayContainer.appendChild(etchASketckDisplay);
etchASketckDisplay.style.width = `${drawingWindowSize}px`;
etchASketckDisplay.style.height = `${drawingWindowSize}px`;
///etchASketckDisplay.style.flexDirection = "column";
etchASketckDisplay.style.flexWrap = "wrap";
etchASketckDisplay.style.display = "flex"; 
etchASketckDisplay.style.justifyContent = "center";
etchASketckDisplay.style.backgroundColor = "rgb(150,52,32)";

let clicking = false; 

window.addEventListener('mousedown', ()=>{
    clicking = true;
})

window.addEventListener('mouseup', ()=>{
    clicking = false;
})
function createEtchASketch(amount){
    let tileSize = drawingWindowSize/amount; 
    amount *= amount;
    
    for (let i = 0; i < amount; i++){
        let newBlock = document.createElement("div");
        etchASketckDisplay.appendChild(newBlock); 
        newBlock.style.backgroundColor = "rgb(75, 100, 30)";
        newBlock.style.width = `${tileSize}px`;
        newBlock.style.height = `${tileSize}px`;
        //newBlock.style.borderStyle = "solid";
        newBlock.style.borderWidth = "1px"; 
        newBlock.style.borderColor = "black";  



        newBlock.addEventListener('mouseover', () => {
            if(!clicking)return;

            newBlock.style.backgroundColor = "black";
    
    
          });


    }
}

function deleteEtchASketch(etchASketchDisplay){
    let children = Array.from(etchASketchDisplay.children);

    children.forEach(element => {
        element.remove();
    });
}





let sliderObject = (name, min, max,currentValue, sliderKnob, sliderBar) =>{
    return {name,min,max,currentValue, sliderKnob,sliderBar};
}


let createSliderValue = (min, max, name, defaultValue,) =>{
    let newSlider = sliderObject(name, min ,max,defaultValue, null,null);  


    let sliderContainer = document.createElement("div"); 
    settingsDisplay.appendChild(sliderContainer);

    sliderContainer.style.width = "90%"; 
    sliderContainer.style.height = "50px"; 
    sliderContainer.style.backgroundColor = "white";
    sliderContainer.style.display ="flex";
    sliderContainer.style.alignItems = "center";
    sliderContainer.style.justifyContent = "center";
    sliderContainer.style.flexDirection = "column";

    let sliderName = document.createElement("h4"); 
    sliderContainer.appendChild(sliderName); 
    sliderName.textContent = name;


    let sliderBar = document.createElement("div"); 
    sliderContainer.appendChild(sliderBar); 
    sliderBar.style.width = "90%";
    sliderBar.style.height = "10px";
    sliderBar.style.backgroundColor = "grey";
    sliderBar.style.display = "flex";
    sliderBar.style.alignItems = "center";
    sliderBar.style.position = 'relative';

    let sliderKnob = document.createElement("div");
    sliderBar.appendChild(sliderKnob);

    sliderKnob.style.width = "15px";
    sliderKnob.style.height = "15px";
    sliderKnob.style.backgroundColor = "red";
    sliderKnob.style.padding = "0px";

    sliderKnob.style.left = (((defaultValue - min) / (max - min)) * 100) - 2.5 + '%';
    sliderKnob.style.position = 'absolute';

    newSlider.sliderKnob = sliderKnob;
    newSlider.sliderBar = sliderBar;


    sliderKnob.addEventListener('mousedown', () => {
        console.log(`Click!!! on : ${sliderKnob}`);

        draggingSlider = newSlider;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDragging);


      });



    let sliderVisual = document.createElement("div");
    sliderBar.appendChild(sliderVisual);
    return newSlider
}



let draggingSlider; 


function onDrag(e) {
    if (!draggingSlider) return;
    let newLeft = draggingSlider.currentValue;
    if(e.clientX - draggingSlider.sliderKnob.getBoundingClientRect().left < 0)newLeft--; 
    if(e.clientX - draggingSlider.sliderKnob.getBoundingClientRect().left > 0)newLeft++; 
    console.log(newLeft);
    if(newLeft > 95) newLeft = 95;
    if(newLeft < 0) newLeft = 0;
    console.log(newLeft);
    draggingSlider.currentValue = newLeft;
    draggingSlider.sliderKnob.style.left = `${newLeft}%`;


    // deleteEtchASketch(etchASketckDisplay);
    // createEtchASketch(draggingSlider.currentValue);
}

function stopDragging() {
    if (!draggingSlider) return;

    console.log(`Stopped dragging: ${draggingSlider.sliderKnob}`);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDragging);
    
    deleteEtchASketch(etchASketckDisplay);
    createEtchASketch(draggingSlider.currentValue);
    
    draggingSlider = null;
    
}

createSliderValue(1,100,"Tile Size",0);

createEtchASketch(64);
























