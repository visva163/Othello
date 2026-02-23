// let cc='white';
// const r=document.querySelectorAll('.row');
// console.log(r);
// r.forEach((r,) =>{
//     for(let i=0;i<8;i++){
// const h=document.createElement('div');
// h.classList.add('box');
// h.addEventListener('click',placepiece);
// r.append(h);}
// });

// function placepiece(event){
//     let e=event.target;
//    console.log(e);
//     if(e.children.length>0) return;
//     const c=document.createElement('div');
//     c.classList.add('coin',cc);
//     e.append(c);
//    cc=cc==='black'? 'white': 'black';
// }

let currentPlayer = 'black';

const rows = document.querySelectorAll('.row');

let board = [];

// Create Board Array
for(let i=0;i<8;i++){
    board[i]=[];
    for(let j=0;j<8;j++){
        board[i][j]=null;
    }
}

// Create Boxes
rows.forEach((row,rowIndex)=>{

    for(let col=0;col<8;col++){

        const box=document.createElement('div');

        box.classList.add('box');

        box.dataset.row=rowIndex;
        box.dataset.col=col;

        box.addEventListener('click',placePiece);

        row.append(box);

    }

});


// Initial 4 Coins

placeInitial(3,3,'white');
placeInitial(3,4,'black');
placeInitial(4,3,'black');
placeInitial(4,4,'white');

updateScore();


function placeInitial(r,c,color){

    const box=getBox(r,c);

    const coin=document.createElement('div');

    coin.classList.add('coin',color);

    box.append(coin);

    board[r][c]=color;

}


function placePiece(event){

    const box=event.target.closest('.box');

    let r=parseInt(box.dataset.row);
    let c=parseInt(box.dataset.col);

    if(board[r][c]!=null)
        return;

    let flipped = flipPieces(r,c,currentPlayer);

    if(flipped.length==0)
        return;

    addCoin(r,c,currentPlayer);

    flipped.forEach(pos=>{

        let b=getBox(pos[0],pos[1]);

        b.firstChild.classList.remove('white','black');

        b.firstChild.classList.add(currentPlayer);

        board[pos[0]][pos[1]]=currentPlayer;

    });

    currentPlayer=currentPlayer=='black'?'white':'black';

    updateScore();
    updateTurn();

}



function addCoin(r,c,color){

    const box=getBox(r,c);

    const coin=document.createElement('div');

    coin.classList.add('coin',color);

    box.append(coin);

    board[r][c]=color;

}



function getBox(r,c){

    return document.querySelector(
        `.box[data-row='${r}'][data-col='${c}']`
    );

}



// Check Directions

function flipPieces(r,c,color){

    let enemy=color=='black'?'white':'black';

    let directions=[

        [1,0],[-1,0],
        [0,1],[0,-1],
        [1,1],[1,-1],
        [-1,1],[-1,-1]

    ];

    let result=[];

    directions.forEach(d=>{

        let temp=[];

        let i=r+d[0];
        let j=c+d[1];

        while(i>=0 && i<8 && j>=0 && j<8){

            if(board[i][j]==enemy){

                temp.push([i,j]);

            }

            else if(board[i][j]==color){

                result=result.concat(temp);
                break;

            }

            else{

                break;

            }

            i+=d[0];
            j+=d[1];

        }

    });

    return result;

}



function updateScore(){

    let white=0;
    let black=0;

    for(let i=0;i<8;i++){

        for(let j=0;j<8;j++){

            if(board[i][j]=='white')
                white++;

            if(board[i][j]=='black')
                black++;

        }

    }

    document.getElementById('whiteScore').textContent=white;
    document.getElementById('blackScore').textContent=black;

}



function updateTurn(){

    document.getElementById('turn').textContent =
        currentPlayer=='black'?'Black':'White';

}
