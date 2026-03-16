let popup = document.getElementById('popup');
const alex = document.querySelector(".character");
const map = document.querySelector(".map");
const house = document.querySelector("#house");
const platforms = Array.from(document.querySelectorAll(".platform"));
const direct = {
    right: "right",    
    left: "left",
    space: "space",
    down: "down"

}

const keys = {
    'ArrowLeft': direct.left,
    'ArrowRight': direct.right,
    'ArrowUp': direct.space,
    'ArrowDown': direct.down
}

const wasd = {
   'KeyA': direct.left,
   'KeyD': direct.right,
   'KeyW':direct.space,
   'KeyS':direct.down,
   'Space': direct.space
}

const speed = 1;
const jump = 7;
let x = 15; //alex starts here
let y = 151;
let camera_x = x;
let camera_y = y;
let pressedDirect= [] 
let vY = 0;       
const gravity = 0.5; 

const placeAlex = () => {
    const pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));



const direction = pressedDirect[0];
if (direction) {
   if (direction === direct.right) {x += speed;}
   if (direction === direct.left) {x -= speed;}
    if (vY === 0 && (direction === direct.right || direction === direct.left)) {
        alex.setAttribute("facing", direction);
    }
}
// console.log(pressedDirect);

alex.setAttribute("walking", direction ? "true" : "false");

y += vY;       
vY += gravity; 

//boog
if (direction === direct.space && y >= 151) { 
    vY = -jump; 
}

const alexRect = {
    left: x,
    right: x + 16
   //  bottom: y + 32 
};

let onGround = false;
platforms.forEach(platform => {

    const pRect = platform.getBoundingClientRect();
    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    

    const pLeft = (pRect.left - map.getBoundingClientRect().left) / pixelSize;
    const pRight = pLeft + (pRect.width / pixelSize);
    const pTop = (pRect.top - map.getBoundingClientRect().top) / pixelSize;


    if (x + 10 > pLeft && x < pRight - 10) { 
        if (y <= pTop && (y + vY) >= pTop - 32) { 
            y = pTop - 30;
            vY = 0;
            onGround = true;
        }
    }
});

if (y >= 151) { 
    y = 151; 
    vY = 0; 
    onGround = true;
}

if (direction === direct.space && onGround) { 
    vY = -jump; 
}

const leftLimit = -14;
const rightLimit = 780;
const topLimit = -25;
const bottomLimit = 848;
if (x < leftLimit) { x = leftLimit; }
if (x > rightLimit) { x = rightLimit; }
if (y < topLimit) { y = topLimit; }
if (y > bottomLimit) { y = bottomLimit; }

const CAMERA_LEFT_OFFSET_PX = 50;
const CAMERA_TOP_OFFSET_PX = 70;


// console.log('x:'+ x); 
// console.log ("y:"+ y);
//213 513
const camera_transform_left = -x*pixelSize+(pixelSize * CAMERA_LEFT_OFFSET_PX);
const camera_transform_top = -y*pixelSize+(pixelSize * CAMERA_TOP_OFFSET_PX);
map.style.transform = `translate3d( ${camera_transform_left}px, ${camera_transform_top}px, 0 )`;
alex.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;
}
//Set up the game loop
let previousMs;
const stepTime = 1 / 60;
const tick = (timestampMs) => {
   if (previousMs === undefined) {
      previousMs = timestampMs;
   }
   let delta = (timestampMs - previousMs) / 1000;
   while (delta >= stepTime) {
      placeAlex();
      delta -= stepTime;
   }
   previousMs = timestampMs - delta * 1000;


   requestAnimationFrame(tick);
}
requestAnimationFrame(tick); 


/* Direction key state */
document.addEventListener("keydown", (e) => {
   const dir = keys[e.code];
   if (dir && pressedDirect.indexOf(dir) === -1) {
      pressedDirect.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   const dir = keys[e.code];
   const index = pressedDirect.indexOf(dir);
   if (index > -1) {
      pressedDirect.splice(index, 1)
   }
});

document.addEventListener("keydown", (e) => {
   const dir = wasd[e.code];
   if (dir && pressedDirect.indexOf(dir) === -1) {
      pressedDirect.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   const dir = wasd[e.code];
   const index = pressedDirect.indexOf(dir);
   if (index > -1) {
      pressedDirect.splice(index, 1)
   }
});


// popup

function dataGet(id) {
    if (id == isNaN) {
        alert("wrong")
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let result = JSON.parse(this.responseText) ;
                document.getElementById("titelPop").innerHTML = result[id].title ;
                document.getElementById("omschrijvingPop").innerHTML = result[id].info ;
                document.getElementById("imagePop").src = "media/"+ result[id].img;
                console.log(result[0])
            }
        };
        xmlhttp.open("GET", "js/projecten.json");
        xmlhttp.send();
    }


    if (popup.style.display === "none"){
        popup.style.display = "block"
    }else{
        popup.style.display = "none";
    }
}

//popuptoggle
function toggleOff() {
    if (popup.style.display === "none"){
        popup.style.display = "block"
    }else{
        popup.style.display = "none";
    }
}