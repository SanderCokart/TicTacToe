let player1 = '×';
let player2 = '○';
let cells = document.querySelectorAll(".cell");
let currentPlayer = player1;
let winner = "";
let winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let turns = 0;

//get text contents
let textContents = [];
cells.forEach(cell => {
    textContents.push(cell.textContent);
});


let x = () => { document.getElementById("grid").style.cursor = "url('./x.png'), pointer"; }
let o = () => { document.getElementById("grid").style.cursor = "url('./o.png'), pointer"; }

function move(e) {

    //if target is a cell and the text of the target is empty
    if (e.target.className === "cell" && e.target.textContent === "") {

        //set tetx to player
        e.target.textContent = currentPlayer;

        //check
        checkWinner(currentPlayer);

        //alternates players
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        (currentPlayer === player1) ? cursor = "url('./ x.png'), pointer" : cursor = "url('./ o.png'), pointer";

        if (currentPlayer === player1) {
            x();
        } else {
            o();
        }

    }

}


function checkWinner(player) {

    turns++;

    //loop combos
    winCombos.forEach(combo => {

        let counter = 0;

        //loop each combo
        combo.forEach(elem => {

            //if the cells in a combo compare to the current player
            if (cells[elem].textContent === player) {

                //up counter of matches of a combo
                counter++

                //if 3 of the same player are in a combo            
                if (counter === 3) {
                    winner = player;
                    setTimeout(() => {
                        document.querySelector(".grid").style.display = 'none';
                        document.querySelector(".winScreen").style.display = 'grid';
                        document.getElementById("message").innerHTML = "The winner is player <br><span>" + winner + "</span>"
                    }, 100);
                    return;
                }

            }
        });
    });

    //if nobody wins
    if (winner === '' && turns === 9) {
        console.log("NOBODY WON");
        setTimeout(() => {
            reset();
        }, 3000);
    }

}


function reset() {
    winner = '';
    turns = 0;
    cells.forEach(cell => {
        cell.textContent = '';
    });

    document.querySelector(".grid").style.display = 'grid';
    document.querySelector(".winScreen").style.display = 'none'

}

document.querySelector(".grid").addEventListener("click", move);