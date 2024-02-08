var words = ["margin","length","legend","jacket","hunter","nation","nobody"];
function StartGame() {
    RandomWordIndex = Math.trunc(Math.random() * words.length);
    RandomWord = words[RandomWordIndex].toUpperCase();
    NumberOfTrys = 1;
    
    let wordsBox = document.querySelectorAll(".words");
    wordsBox.forEach((word) => {
        word.innerHTML = "";
    })
    wordsBox.forEach((word) => {
        for (let i = 0 ; i < RandomWord.length ; i++) {
            let Input = document.createElement("input");
            Input.setAttribute("type","text");
            Input.setAttribute("maxlength","1");
            Input.setAttribute("class",`input${i}`);
            word.appendChild(Input);
        }
    })

    let tryBoxs = document.querySelectorAll(`.try_box`);
    tryBoxs.forEach((tr) => {
        tr.classList.remove("active");
    })
    
    let tryBox = document.querySelector(`.try_box${NumberOfTrys}`);
    tryBox.classList.add("active");
    
    let inputs = document.querySelectorAll(`.try_box${NumberOfTrys} input`);
    inputs[0].focus();
    
    inputs.forEach((inp) => {
        inp.addEventListener(("input") , () => {
            if (inp.value.length == 1 && Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) + 1 <= 5) {
                let NumberInput = Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) + 1
                let NextInput = document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput}`);
                if (NextInput.value.length == 0) {
                    NextInput.focus();
                }else {
                    let NbFreeSpaces = 0;
                    let inputs = document.querySelectorAll(`.try_box${NumberOfTrys} input`);
                    inputs.forEach((inp) => {
                        if (inp.value == "") {
                            NbFreeSpaces++;
                        }
                    })
                    let k = NumberInput - 1;
                    let found = false
                    while (NbFreeSpaces != 0 && !found && k < inputs.length) {
                        if (inputs[k].value.length == 0) {
                            found = true;
                        }
                        k++;
                    }
                    try {
                        if (document.querySelector(`.try_box${NumberOfTrys} .words .input${k-1}`).value.length == 0) {
                            document.querySelector(`.try_box${NumberOfTrys} .words .input${k-1}`).focus()
                        }
                    }catch (error) {}
                }
            }
        })
        inp.addEventListener(("keydown") , (e) => {
            const keys = e.key;
            if (keys == "Backspace") {
                if (Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) - 1 >= 0) {
                    inp.value = "";
                    let NumberInput = Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) - 1
                    let NextInput = document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput}`);
                    NextInput.focus();
                }
            }
        })
    })

    let HintButton = document.querySelector(".game_zone .buttons button:last-child");

    let Hint = 2;

    let HintSpan = document.querySelector(".game_zone .buttons button:last-child span");
    HintSpan.innerHTML = Hint;

    HintButton.addEventListener(("click") , () => {
        let inputs = document.querySelectorAll(`.try_box${NumberOfTrys} .words input`);
        let NbFreeSpaces = 0;
        inputs.forEach((inp) => {
            if (inp.value == "") {
                NbFreeSpaces++;
            }
        })
        if (NbFreeSpaces > 0) {

            let RandomWordIndex = 0;
            do {
                RandomWordIndex = Math.trunc(Math.random() * RandomWord.length);                
            }while (document.querySelector(`.try_box${NumberOfTrys} .words .input${RandomWordIndex}`).value != "" && Hint >= 1)
            
            if (Hint >= 1) {

                let input = document.querySelector(`.try_box${NumberOfTrys} .words .input${RandomWordIndex}`);
                
                input.value = RandomWord[RandomWordIndex];
    
                let inputs = document.querySelectorAll(`.try_box${NumberOfTrys} .words input`);
    
                let k = 0;
    
                let found = false;
    
                do {
                    if (inputs[k].value.length == 0) {
                        inputs[k].focus();
                        found = true;
                    }
                    k++;
                }while(!found && k < inputs.length)
            }
            Hint--;
            if (Hint >= 0) {
                let HintSpan = document.querySelector(".game_zone .buttons button:last-child span");
                HintSpan.innerHTML = Hint;
            }
        }
    })

    let checkButton = document.querySelector("button:first-child");
    checkButton.addEventListener(("click"), () => {
        check();
    })
    
}
window.addEventListener(("keydown") , (e) => {
    const key = e.key;
    if (key == "Enter") {
        check();
    }
})

function check() {
    
    let NbInput = 0;
    let inputs = document.querySelectorAll(".try_box.active input");
    inputs.forEach((inp) => {
        if (inp.value.length == 1) {
            NbInput++;
        }
    })
    
    if (NumberOfTrys <= 5 && NbInput == RandomWord.length) {
        checkLetters()
        NumberOfTrys++;
        let tryBoxs = document.querySelectorAll(`.try_box`);
        tryBoxs.forEach((tr) => {
            tr.classList.remove("active");
        })
        let tryBox = document.querySelector(`.try_box${NumberOfTrys}`);
        tryBox.classList.add("active");
        let inputs = document.querySelectorAll(`.try_box.active input`);
        inputs[0].focus();

        inputs.forEach((inp) => {
            inp.addEventListener(("input") , () => {
                if (inp.value.length == 1 && Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) + 1 <= 5) {
                    let NumberInput = Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) + 1
                    let NextInput = document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput}`);
                    if (NextInput.value.length == 0) {
                        NextInput.focus();
                    }else {
                        try {
                            if (document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput + 1}`).value.length == 0) {
                                document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput + 1}`).focus()
                            }
                        }catch (error) {}
                    }
                }
            })
            inp.addEventListener(("keydown") , (e) => {
                const keys = e.key;
                if (keys == "Backspace") {
                    if (Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) - 1 >= 0) {
                        inp.value = "";
                        let NumberInput = Number(inp.getAttribute("class")[inp.getAttribute("class").length - 1]) - 1
                        let NextInput = document.querySelector(`.try_box${NumberOfTrys} .words .input${NumberInput}`);
                        NextInput.focus();
                    }
                }
            })
        })
    }else {
        let k = 0;
        let found = false;
        do {
            if (inputs[k].value.length == 0) {
                inputs[k].focus();
                found = true;
            }
            k++;
        }while(!found && k < inputs.length)
    }
}

function checkLetters() {

    let GuessCorrect = 0;

    for (let i = 0 ; i < RandomWord.length ; i++) {
        let Letter = document.querySelectorAll(`.try_box${NumberOfTrys} .words input`)[i].value;
        let LetterBg = document.querySelector(`.try_box${NumberOfTrys} .words .input${i}`)
        if (Letter.toUpperCase() == RandomWord[i]) {
            LetterBg.classList.add("correct");
            GuessCorrect++;
        }else if (RandomWord.includes(Letter.toUpperCase())) {
            LetterBg.classList.add("maybe");
        }else {
            LetterBg.classList.add("wrong");
        }
    }

    if ( GuessCorrect == RandomWord.length ) {
        document.querySelector(".Game_Bar").classList.add("active");
        document.querySelector(".Game_Bar h1").innerHTML = "You Won !!";
    }else if (NumberOfTrys == 5) {
        document.querySelector(".Game_Bar").classList.add("active");
        document.querySelector(".Game_Bar h1").innerHTML = "You Lose !! <br> The Word Is " + RandomWord
    }
}

StartGame()

document.querySelector(".rematch").addEventListener(("click"), () => {
    document.querySelector(".Game_Bar").classList.remove("active");
    StartGame()
})
