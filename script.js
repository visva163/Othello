let cc='white';
const r=document.querySelectorAll('.row');
console.log(r);
r.forEach((r,) =>{
    for(let i=0;i<8;i++){
const h=document.createElement('div');
h.classList.add('box');
h.addEventListener('click',placepiece);
r.append(h);}
});

function placepiece(event){
    let e=event.target;
   console.log(e);
    if(e.children.length>0) return;
    const c=document.createElement('div');
    c.classList.add('coin',cc);
    e.append(c);
   cc=cc==='black'? 'white': 'black';
}