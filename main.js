//mistatkenumber to count the number of mistake, totalnumber for generating unique id to dynamically added boxes
var mistakenumber = 0
var totalnumber = 17

//To generate a random integer between a range
function randomboxgenerator(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}
//initializing the answerlist array which are generated randomly for the puzzle
var answerlist = []

//This function generates the number of required answers i.e for a 4*4 box= 4 answerlist length, for a 4*5 box = 5 answerlist length
function numberofbox(n) {
    guesslist= []
    answerlist = []
    for (let i = 0; i < 4 * n; i += 4) {
        num = randomboxgenerator(i + 1, i + 5)
        answerlist.push(num)
    }
}

//functions for displaying the flashes  of answer, so the user get the idea of where to click
function initialscreen() {
    console.log(answerlist.length)
    for (let i = 0; i < answerlist.length; i++) {
        document.getElementById(answerlist[i]).style.backgroundColor = 'whitesmoke';
    }
}
function defaultscreen() {
    for (let i = 0; i < answerlist.length; i++) {
        document.getElementById(answerlist[i]).style.backgroundColor = '#241977';
    }
}

//default box size is 4*4
numberofbox(4)
setTimeout(initialscreen, 1000)
setTimeout(defaultscreen, 1700)

//for the timer shown in the bottom right corner
function timer() {
    var time = parseInt(document.getElementById('number').innerHTML)
    setTimeout(() => {
        if (time < 21 && time > 0) {
            time -= 1
            document.getElementById('number').style.color = 'red'
            document.getElementById('number').innerHTML = time
        }
        else if (time > 19) {
            time -= 1
            document.getElementById('number').innerHTML = time

        }
        else {
            document.getElementById('number').style.color = 'red'
            document.getElementById('number').innerHTML = 'Time up!!'
            document.getElementById('alertbox').style.display = 'flex'
            document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none'
        }
    }, 0)
}
var intervalid = setInterval(timer, 1000)

//To make the color of the clicked box (green color) to default color
function defaultcolor(clicked) {
    document.getElementById(clicked).style.backgroundColor = '#241977';
}

//function to take action when wrong box is clicked or duplicate box is clicked
function onwrong() {
    if (mistakenumber == 1) {
        document.getElementById('100').style.backgroundColor = 'red'
    }
    else if (mistakenumber == 2) {
        document.getElementById('101').style.backgroundColor = 'red'
    }
    else if (mistakenumber == 3) {
        document.getElementById('102').style.backgroundColor = 'red'
        document.getElementById('alertbox').style.display = 'flex'
        document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none';
    }
}

//function to restart the game from the default when clicking try again button includes removing the dynamically added boxes as well
function tryagain() {
    boxnumber = 4
    mistakenumber = 0;
    document.getElementById('number').innerHTML = '40'
    document.getElementById('alertbox').style.display = 'none'
    document.getElementById('lastbox').style.display = 'none'
    document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'auto';
    document.getElementById('number').style.color = 'white'
    document.getElementById('100').style.backgroundColor = '#393211'
    document.getElementById('101').style.backgroundColor = '#393211'
    document.getElementById('102').style.backgroundColor = '#393211'
    document.getElementById('small').innerHTML = `
            <div class="fieldcontainer">
                <div class="box" id = '1' onclick="changecolor(this.id)"></div>
                <div class="box" id = '5' onclick="changecolor(this.id)"></div>
                <div class="box" id = '9' onclick="changecolor(this.id)"></div>
                <div class="box" id = '13' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box" id = '2' onclick="changecolor(this.id)"></div>
                <div class="box" id = '6' onclick="changecolor(this.id)"></div>
                <div class="box" id = '10' onclick="changecolor(this.id)"></div>
                <div class="box" id = '14' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box" id = '3' onclick="changecolor(this.id)"></div>
                <div class="box" id = '7' onclick="changecolor(this.id)"></div>
                <div class="box" id = '11' onclick="changecolor(this.id)"></div>
                <div class="box" id = '15' onclick="changecolor(this.id)"></div>
            </div>
            <div class="fieldcontainer">
                <div class="box" id = '4' onclick="changecolor(this.id)"></div>
                <div class="box" id = '8' onclick="changecolor(this.id)"></div>
                <div class="box" id = '12' onclick="changecolor(this.id)"></div>
                <div class="box" id = '16' onclick="changecolor(this.id)"></div>
            </div>
    `
    numberofbox(4)
    setTimeout(initialscreen, 1500)
    setTimeout(defaultscreen, 2300)
}

//initalizing the guess list i.e. the list of the box we clicked
var guesslist = []
var boxnumber = 4

//function when a box is clicked
function changecolor(clicked) {
    let elem = document.getElementById(clicked)
    //if the clicked box is duplicate, it must be ignored
    if (guesslist.includes(parseInt(clicked)) != true) {
        //if the clicked box's id is included in the randomly generated answerlist array then it is stored in the guesslist array
        if (answerlist.includes(parseInt(clicked))) {
            guesslist.push(parseInt(clicked))
            elem.style.backgroundColor = 'green'
            setTimeout(defaultcolor, 500, clicked)
            
            /*finally when the guesslist array's length is equal to answerlist's length, i.e. all's correct box are ticked, so a next level is generated by dynamically adding 4 more boxes.... if the boxnumber is 7 i.e we pass the 4*6 box test, we pass the test and a congratulations display is shown*/
            if (guesslist.length == answerlist.length) {
                guesslist = []
                boxnumber += 1
                if (boxnumber == 7) {
                    document.getElementById('lastbox').style.display = 'flex'
                    document.getElementsByClassName('maincontainer')[0].style.pointerEvents = 'none'
                    clearInterval(intervalid)
                }
                else {
                    var field = document.getElementsByClassName('fieldcontainer')
                    for (let i = 0; i < 4; i++) {
                        idnumber = totalnumber + i
                        field[i].innerHTML += `<div class="box" id = "${idnumber}" onclick="changecolor(this.id)"></div>`
                    }
                    totalnumber += 4
                    numberofbox(boxnumber)
                    setTimeout(initialscreen, 1500)
                    setTimeout(defaultscreen, 2300)
                }
            }
        }
        else {
            elem.style.backgroundColor = 'red'
            setTimeout(defaultcolor, 150, clicked)
            mistakenumber += 1;
            onwrong();
        }
    }
    else {
        elem.style.backgroundColor = 'red'
        setTimeout(defaultcolor, 150, clicked)
        mistakenumber += 1;
        onwrong();
    }
}
