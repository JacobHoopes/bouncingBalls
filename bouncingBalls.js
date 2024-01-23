
let balls = [];
const ballRadius = 20;
const maxInitalV = 5;

var first = 1;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    windowResized()
    // noCursor();
    frameRate(30);
}



function draw() {
    var titleText = document.getElementById("output");
    titleText.innerText = mouseX + ", " + (mouseY);
    background(0,0,0,70);
    noStroke();
    strokeWeight(1);
    for (let ball of balls) {
        ball.update();
        ball.display();
    }
    
    if (first) {
        windowResized();
        first = 0;
        for (let i = 0; i < 20; i++) {

            const velX = random(-maxInitalV, maxInitalV);
            const velY = random(-maxInitalV, maxInitalV);
            balls.push(new Thing(random(width), random(height), ballRadius, velX, velY));
        }
    }
}

function windowResized() {
    var titleText = document.getElementById("output");
    resizeCanvas(window.innerWidth, window.innerHeight - titleText.offsetHeight-4);
}

function mouseClicked() {
    const velX = random(-maxInitalV, maxInitalV);
    const velY = random(-maxInitalV, maxInitalV);
    if (balls.length >= 15) {
        balls.shift();
    }
    balls.push(new Thing(mouseX, mouseY, ballRadius, velX, velY));
}
// document.addEventListener("DOMContentLoaded", function() {
//     windowResized();
// });

function distance(x1, y1, x2, y2) {
    return sqrt((x2-x1)**2+(y2-y1)**2);
}

function degreesBetweenVectors(V1x, V1y, V2x, V2y) {
    let V1 = createVector(V1x, V1y);
    let V2 = createVector(V2x, V2y);
    let angle = atan2(V2.y - V1.y, V2.x - V1.x);
    let degrees = (angle * (180/Math.PI) + 180) % 360;
    return degrees;
}

function getBounceVector(initial, center, contact) {
    let degrees = degreesBetweenVectors(center.x, center.y, contact.x, contact.y);
    let degrees1 = degreesBetweenVectors(initial.x, initial.y, center.x, center.y);
    let newDegrees = degrees - (degrees1 - degrees); // outgoing angle
    let newAngle = (newDegrees)/(180/Math.PI);
    let x1 = Math.cos(newAngle);
    let y1 = Math.sin(newAngle);
    let finalVector = createVector(x1, y1);
    strokeWeight(3);
    stroke(255,0,0);
    // line(center.x+distance(initial.x, initial.y, center.x, center.y)*x1, center.y+distance(initial.x, initial.y, center.x, center.y)*y1, center.x, center.y);
    // line(initial.x, initial.y, center.x, center.y);
    strokeWeight(1);
    stroke(255);
    return finalVector;
}