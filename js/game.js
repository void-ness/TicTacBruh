// defining variables
let Gamebox = document.getElementsByClassName("Box");
let turn = "X";
let GameOver = false;
let Tie = false;
let ColorsList = [1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F"];
let Color="#";
// screenSize matches atrribute will become true when the screen size matches
let screenSize = window.matchMedia("(max-width: 450px)")

let WinX = 0,WinO = 0;


// Changing Turn
function TurnChanger(){
    return turn==="X"? "O": "X"  
}

// Win Pop Up Sequence basically a media query in js
function CheckScreen(x) {
    if (x.matches) { 
        document.querySelector(".congratulate").style.height = "1.2em";        
    }
    
    else {
        document.querySelector(".WinPopUpImg").style.transform = "translateY(0)";
    }
  }

//winning Logic
function Winyet(){
    let win = [ [0,1,2,5,5,0] , [3,4,5,5,15,0] , [6,7,8,5,25,0] , [0,3,6,-5,15,90] , [1,4,7,5,15,90] , [2,5,8,15,15,90] , [0,4,8,5,15,45] , [2,4,6,5,15,135] ];
    
    // this checks for each of the winning combination
    win.forEach( (WinComb) => {
        if (Gamebox[WinComb[0]].innerText === Gamebox[WinComb[1]].innerText & Gamebox[WinComb[0]].innerText === Gamebox[WinComb[2]].innerText && Gamebox[WinComb[0]].innerText != "" ){
            GameOver = true;
            PointsCalc(Gamebox[WinComb[0]].innerText);
            document.getElementsByClassName("WinLine")[0].style.width = "20vw";
            document.getElementsByClassName("WinLine")[0].style.transform = `translate(${WinComb[3]}vw , ${WinComb[4]}vw) rotate(${WinComb[5]}deg) scaleX(1.3)`;
        }
    })

    // this code below is for checking for a Tie

    // after no one has won yet, the true value is changed to true
    Tie = true;

    // however if there is any empty box the Tie value is changed to False
    Array.from(Gamebox).forEach( (box) => {
        if (box.querySelector(".boxtext").innerText == ""){
            Tie = false;
        } 
    })

    // this gets processed when the No one has won yet, neither any box is left empty
    if (Tie){
        GameOver = true;
        PointsCalc("XO");
        return 0;
    }

    // console.log("alpha male")
}

// pointer logic
// WinX keeps record of Wins for X, similarly WinO is for recording wins for O
function PointsCalc(turn){
    if (turn == "X"){
        WinX += 1;
    }

    else if (turn == "O"){
        WinO += 1;
    }

    else if (turn == "XO"){
        WinX += 1;
        WinO += 1;
    }
}

// main logic
Array.from(Gamebox).forEach( (box) => {
    box.addEventListener("click",() => {
        if (!GameOver){
            let text = box.querySelector(".boxtext");
            if (text.innerText === ""){
                text.innerText = turn;
                Winyet();

                if (GameOver){
                    if (Tie){
                        document.querySelector(".TurnInfo").innerText = "Tough Match! It's a Tie.";
                    }
                    else if (!Tie){
                        document.querySelector(".TurnInfo").innerText = `Congratulations ${turn} Won! yayy`;
                    }

                    CheckScreen(screenSize);
                    document.querySelector(".PointsX").innerText = WinX;
                    document.querySelector(".PointsO").innerText = WinO;
                }

                if (!GameOver){
                    turn = TurnChanger();
                    document.querySelector(".TurnInfo").innerText = `Turn for ${turn} Now`;
                }
            }
        }
    })
})

// reset logic
document.getElementById("GameReset").addEventListener("click", function(){
    // makes all the boxes again empty
    Array.from(Gamebox).forEach( (box) => {
        box.querySelector(".boxtext").innerText = "";
    })

    // as games begin with turn for X first
    turn = "X";
    GameOver = false;
    document.querySelector(".TurnInfo").innerText = "Heyy, did you win? nah";

    //hiding the line that appears after winning
    document.getElementsByClassName("WinLine")[0].style.width = "0";

    // Resets the Win Pop Ups
    document.querySelector(".WinPopUpImg").style.transform = "translateY(19em)";
    document.querySelector(".congratulate").style.height = "0";        
})

// color changer logic
document.getElementById("ColorChanger").addEventListener("click", () =>{
    let i;
    for (i = 0; i <6; i++){
        // this gets me a random number b/w 0 to 15 as color list array has 16 elements
        let random = Math.floor(Math.random(1)*16);

        // used to create a 6 digit random hexagonal number to be used as color code
        Color += ColorsList[random]
    }

    document.getElementsByTagName("body")[0].style.background = Color;
    Color = "#";
})

