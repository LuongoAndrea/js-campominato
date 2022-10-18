

let play = function(){
    console.log('inizio gioco:');
    const num_bomb = 16;
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
        const bomb = Math.floor((Math.random() * 100) + 1);
        if(!bombPosition.includes(bomb)){
            bombPosition.push(bomb)
        }
    }
    console.log(bombPosition);

    
    function cellCreate(numCell){
        const cellPerSide = Math.sqrt(cellNumber);
        const divCell = document.createElement("div");
        divCell.className = 'square';
        divCell.style.width = `calc(100% / ${cellPerSide} )`
        divCell.style.height = `calc(100% / ${cellPerSide} )`
        divCell.innerHTML = `
            <span>${numCell}</span>
        `;
        divCell.addEventListener('click', function(){
            this.classList.add('white');
        } )
        
        return divCell;
    }
    function gridCreate(){
        const divGrid = document.createElement("div");
        divGrid.className = 'grid';
        for (let i = 1; i <= cellNumber; i++) {
            const cell = cellCreate(i);
            console.log(i);
            divGrid.appendChild(cell);
        }
        
        fieldGame.appendChild(divGrid);
    }
    gridCreate();
}

let btnPlay = document.getElementById("play");
btnPlay.addEventListener("click", play);