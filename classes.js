
class Thing {
    constructor(x, y, radius, velX, velY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velX = velX;
        this.velY = velY;
    }

    update() {
        if (this.x - this.radius < 0) {
            this.velX = abs(this.velX);
        } else if (this.x + this.radius > width) {
            this.velX = -abs(this.velX);
        }
        if (this.y - this.radius < 0) {
            this.velY = abs(this.velY);
        } else if (this.y + this.radius > height) {
            this.velY = -abs(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;

        let collidedPairs = [];

        for (let other of balls) {
            if (balls.indexOf(other) < balls.indexOf(this)) {
                let pairId = `${balls.indexOf(this)}-${balls.indexOf(other)}`;
                if (!collidedPairs.includes(pairId)) {
                    let distance = dist(this.x, this.y, other.x, other.y);
                    let combinedRadius = this.radius + other.radius;

                    if (distance < combinedRadius) {
                        // Collision detected, adjust directions to simulate bouncing
                        let angle = atan2(other.y - this.y, other.x - this.x);
                        let relativeVelX = other.velX - this.velX;
                        let relativeVelY = other.velY - this.velY;
                        let collisionAngle = atan2(relativeVelY, relativeVelX);
                    
                        let thisSpeed = dist(0, 0, this.velX, this.velY);
                        let otherSpeed = dist(0, 0, other.velX, other.velY);
                        let thisDirection = atan2(this.velY, this.velX);
                        let otherDirection = atan2(other.velY, other.velX);
                    
                        let newVelX1 = thisSpeed * cos(thisDirection - collisionAngle);
                        let newVelY1 = thisSpeed * sin(thisDirection - collisionAngle);
                        let newVelX2 = otherSpeed * cos(otherDirection - collisionAngle);
                        let newVelY2 = otherSpeed * sin(otherDirection - collisionAngle);
                    
                        this.velX = cos(collisionAngle) * newVelX2 + cos(collisionAngle + PI/2) * newVelY1;
                        this.velY = sin(collisionAngle) * newVelX2 + sin(collisionAngle + PI/2) * newVelY1;
                        other.velX = cos(collisionAngle) * newVelX1 + cos(collisionAngle + PI/2) * newVelY2;
                        other.velY = sin(collisionAngle) * newVelX1 + sin(collisionAngle + PI/2) * newVelY2;
                    }
                }
            }
        }
    }
    
    
    display() {
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
    }
}