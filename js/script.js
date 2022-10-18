let play = function(){
    console.log('inizio gioco:');
    const score = document.getElementById("score");
    score.innerHTML = ''
    const num_bomb = 16;
    let cellClick = 0;
    const bombPosition = [];
    let cellNumber;
    const fieldGame = document.getElementById("fild-game");
    fieldGame.innerHTML = ''
    const levelHtml = document.getElementById("modalita").value;
    switch (levelHtml) {
        case '1':
        default:
            cellNumber = 100;
            break;

        case '2':
            cellNumber = 81;
            break;

        case '3':
            cellNumber = 49;
            break;
    }
    while(bombPosition.length < num_bomb){
        const bomb = Math.floor((Math.random() * cellNumber) + 1);
        if(!bombPosition.includes(bomb)){
            bombPosition.push(bomb)
        }
    }
    console.log(bombPosition);
    
    function handleClick(){
        console.log(this.querySelector('span').innerHTML);
        const num = parseInt(this.querySelector('span').innerHTML);
        console.log(num+' cliccato');
        if(bombPosition.includes(num)){
            this.classList.add('bomb');
            this.removeEventListener('click', handleClick)
            endGame(num);
        }
        else{
            this.classList.add('white');
            this.removeEventListener('click', handleClick)
            cellClick++;
        }
    }
    function cellCreate(numCell){
        const cellPerSide = Math.sqrt(cellNumber);
        const divCell = document.createElement("div");
        divCell.className = 'square';
        divCell.style.width = `calc(100% / ${cellPerSide} )`
        divCell.style.height = `calc(100% / ${cellPerSide} )`
        divCell.innerHTML = `
            <span>${numCell}</span>
        `;
        divCell.addEventListener('click', handleClick)
        return divCell;
    }
    function gridCreate(){
        const divGrid = document.createElement("div");
        divGrid.className = 'grid';
        for (let i = 1; i <= cellNumber; i++) {
            const cell = cellCreate(i);
            divGrid.appendChild(cell);
        }
        
        fieldGame.appendChild(divGrid);
    }
    gridCreate();

    function endGame(cellBomb){
        const squares = document.querySelectorAll('.square');
        console.log(squares)
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', handleClick);
            const num = parseInt(squares[i].querySelector('span').innerHTML);
            // console.log(cellBomb+'cella bomba')
            if(bombPosition.includes(num)){
                squares[i].classList.add('bomb');
                squares[i].innerHTML = '<i class="fa-solid fa-bomb"></i>'
            }

        }
        let bomba = cellBomb - 1;
        squares[bomba].innerHTML = '<i class="fa-solid fa-skull"></i>'
        console.log(cellClick);
        score.innerHTML = 'score: '+cellClick;

    }
}

let btnPlay = document.getElementById("play");
btnPlay.addEventListener("click", play);