// defining variables
let Gamebox = document.getElementsByClassName("Box");
let turn = "X";
let GameOver = false;
let ColorsList = [1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F"];
let Color="#";

// Changing Turn
function TurnChanger(){
    return turn==="X"? "O": "X"  
}

//winning Logic

// complete this function
function Winyet(){
    let win = [ [0,1,2,5,5,0] , [3,4,5,5,15,0] , [6,7,8,5,25,0] , [0,3,6,-5,15,90] , [1,4,7,5,15,90] , [2,5,8,15,15,90] , [0,4,8,5,15,45] , [2,4,6,5,15,135] ];

    win.forEach( (WinComb) => {
        if (Gamebox[WinComb[0]].innerText === Gamebox[WinComb[1]].innerText & Gamebox[WinComb[0]].innerText === Gamebox[WinComb[2]].innerText && Gamebox[WinComb[0]].innerText != "" ){
            GameOver = true;
            document.getElementsByClassName("WinLine")[0].style.width = "20vw";
            document.getElementsByClassName("WinLine")[0].style.transform = `translate(${WinComb[3]}vw , ${WinComb[4]}vw) rotate(${WinComb[5]}deg) scaleX(1.3)`;
            return 0;
        }
    })
}

// main logic
Array.from(Gamebox).forEach( (box) => {
    box.addEventListener("click",() => {
        let text = box.querySelector(".boxtext");
        if (text.innerText === ""){
            text.innerText = turn;
            Winyet();
            if (GameOver & turn != ""){
                document.querySelector(".TurnInfo").innerText = `Congratulations ${turn} Won! yayy`;
                turn = ""
            }

            if (!GameOver){
                turn = TurnChanger();
                document.querySelector(".TurnInfo").innerText = `Turn for ${turn} Now`;
            }
        }
    })
})

// reset logic
document.getElementById("GameReset").addEventListener("click", function(){
    Array.from(Gamebox).forEach( (box) => {
        box.querySelector(".boxtext").innerText = "";
    })
    // as games begin with turn for X first
    turn = "X";
    GameOver = false;
    document.querySelector(".TurnInfo").innerText = "Heyy, did you won? nah";

    //hiding the line that appears after winning
    document.getElementsByClassName("WinLine")[0].style.width = "0";

    //works like a button to reset color too as I prefer white bg only
    document.getElementsByTagName("body")[0].style.background = "white";

})

// color changer logic

document.getElementById("ColorChanger").addEventListener("click", () =>{
    for (i = 0; i <6; i++){
        // this gets me a random number b/w 0 to 15 as color list array has 16 elements
        let random = Math.floor(Math.random(1)*16);

        // used to create a 6 digit random hexagonal number to be used as color code
        Color += ColorsList[random]
    }

    document.getElementsByTagName("body")[0].style.background = Color;
    Color = "#";
})

