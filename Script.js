// CONFETTI + FIREWORKS + BALLOONS + MUSIC + MESSAGE DISPLAY
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const balloonsContainer = document.getElementById("balloons");
const bgMusic = document.getElementById("bgMusic");
const messageDisplay = document.getElementById("messageDisplay");

let pieces = [];

function randomColor(){
  const colors = ["#FF5E5B","#FFED66","#00CECB","#FF9A9E","#A18CD1"];
  return colors[Math.floor(Math.random()*colors.length)];
}

// START EVERYTHING
function startBirthday(){
  bgMusic.play();
  createBalloons();
  burstConfetti();
  burstFireworks();
  showMessage();
}

// CONFETTI BURSTS
function burstConfetti(){
  for(let b=0;b<3;b++){
    setTimeout(()=>{
      for(let i=0;i<80;i++){
        pieces.push({
          x:Math.random()*canvas.width,
          y:Math.random()*canvas.height,
          r:Math.random()*6+4,
          dy:Math.random()*3+2,
          dx:(Math.random()-0.5)*2,
          color: randomColor()
        });
      }
    }, b*500);
  }
  animateConfetti();
}

function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  pieces.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
    p.y+=p.dy;
    p.x+=p.dx;
    if(p.y>canvas.height) p.y=0;
    if(p.x>canvas.width) p.x=0;
    if(p.x<0) p.x=canvas.width;
  });
  requestAnimationFrame(animateConfetti);
}

// FIREWORK BURSTS
function burstFireworks(){
  const fwCount = 12;
  for(let i=0;i<fwCount;i++){
    setTimeout(()=>{
      let x = Math.random()*canvas.width;
      let y = Math.random()*canvas.height/2;
      let radius = 2;
      let maxRadius = Math.random()*50+30;
      let color = randomColor();

      let interval = setInterval(()=>{
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.fillStyle=color;
        ctx.fill();
        radius += 2;
        if(radius > maxRadius){
          clearInterval(interval);
        }
      },30);
    }, i*300);
  }
}

// BALLOONS FLOAT + SIDEWAYS
function createBalloons(){
  for(let i=0;i<8;i++){
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.backgroundColor = randomColor();
    balloon.style.left = Math.random()*90 + "vw";
    balloon.style.bottom = "-60px";
    balloonsContainer.appendChild(balloon);

    // Animate balloons
    let speed = 5 + Math.random()*3; // speed in px per frame
    let sideways = Math.random()*1.5; // sideways motion
    function floatBalloon(){
      let bottom = parseFloat(balloon.style.bottom);
      let left = parseFloat(balloon.style.left);
      bottom += speed;
      left += Math.sin(bottom/50)*sideways; // gentle sway
      balloon.style.bottom = bottom + "px";
      balloon.style.left = left + "px";
      if(bottom < window.innerHeight + 60){
        requestAnimationFrame(floatBalloon);
      }
    }
    floatBalloon();
  }
}

// SHOW LONG MESSAGE
function showMessage(){
  const msg = document.getElementById("message").value;
  messageDisplay.textContent = msg;
}
