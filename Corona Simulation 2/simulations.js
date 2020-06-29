var people = [];
var radiusToDetect = 6;

function increaseRadius() {
    radiusToDetect = parseInt(document.getElementById("theR").value);
}

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < 100; i++) {
        var x = random(10, width-10);
        var y = random(10, height-10);

        for (let j = 0; j < people.length; j++) {
            if (j !== 0) {
                if (dist(x, y, people[j].x, people[j].y) - 20 < 0) {
                    x = random(10, width-10);
                    y = random(10, height-10);

                    j = -1;
                }
            }
        }
        people[people.length] = new Person(x, y, 0);
    }
    people[people.length] = new Person(random(10, width-10), random(10, height-10), 1);
}

function draw() {
    background(51); 
    
    for (let i = 0; i < people.length; i++) {
        people[i].show();
        people[i].update();
    }

    for (let i = 0; i < people.length; i++) {
        var currentCircle = people[i];

        for (let j = 0; j < people.length; j++) {
            if (i !== j) {
                if (currentCircle.detect(people[j])) {
                    if (currentCircle.state === 1) {
                        if (people[j].state === 0) {
                            people[j].state = 1;
                        }
                    } else if (currentCircle.state === 0) {
                        if (people[j].state === 1) {
                            currentCircle.state = 1;
                        }
                    }
                } else if (currentCircle.detectRadius(people[j])) {
                    if (currentCircle.state == 1) {
                        if (people[j].state == 0) {
                            people[j].state = 2;
                        }
                    }
                }
            }
        }
    }
}
//group
function Person(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.rand = random(0, 100);
    this.r = 0.7;
    this.xs = random(-this.r, this.r);
    this.ys = random(-this.r, this.r);

    this.show = function() {
        if (this.state == 0) {
            fill(120, 200, 255);
        } else if (this.state == 1) {
            fill(255, 0, 0);
        } else {
            if (this.rand > 0.1) {
                this.state = 0;
            } else {
                this.state = 1;
            }
        }
        noStroke();
        ellipse(this.x, this.y, 20, 20);
    }

    this.update = function() {
        this.x += this.xs;
        this.y += this.ys;

        if (this.x + 10 >= width) {
            this.xs *= -1;
        }
        if (this.x - 10 <= 0) {
            this.xs *= -1;
        }
        if (this.y + 10 >= height) {
            this.ys *= -1;
        }
        if (this.y - 10 <= 0) {
            this.ys *= -1;
        }
    }

    this.detect = function(a) {
        var theDist = dist(this.x, this.y, a.x, a.y);

        if (theDist < 20) {
            return true;
        } else {
            return false;
        }
    }

    this.detectRadius = function(a) {
        var thenewDist = dist(this.x, this.y, a.x, a.y);

        if (thenewDist < 20 + radiusToDetect) {
            return true;
        } else {
            return false;
        }
    }
}