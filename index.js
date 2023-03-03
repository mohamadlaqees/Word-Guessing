let word=document.querySelector('.word');
let hint=document.querySelector('.hint');
let myword=document.getElementById('myword');
let wrong=document.querySelector('.wrong');
let rem=document.querySelector('.remaining');
let ranW;
let theWord='';
let allS;
let incorrectAns=[];
let remainGuess=10;
let correctLength=0;
rem.innerHTML+=` ${remainGuess}`;

function randomWord(){
    ranW=wordList[Math.floor(Math.random() * wordList.length)];
    theWord=ranW.word;
    console.log(theWord);
    let hi=document.createElement('p');
    hi.innerHTML=`Hint: ${ranW.hint}`
    hint.appendChild(hi)
    for (let i = 0; i < ranW.word.length; i++) {
        let spa=document.createElement('span');
        spa.classList.add('charc');
        spa.setAttribute('letter',ranW.word[i]);
        word.appendChild(spa);
    }
    allS=document.querySelectorAll('.charc');

}
function checkCorrect(){
    console.log(`${theWord.length}===${correctLength}`);
    if( correctLength===theWord.length){
     setTimeout(() => {
        alert('Well Done ');
        if(alert){
            location.reload()
        }
     }, 100);
    }
}

document.getElementById('btn').onclick=function() {
    myword.value='';
    correctLength=0;
    theWord='';
    remainGuess=10;
    rem.innerHTML=`Remaining guesses: ${remainGuess}`
    incorrectAns=[];
    wrong.innerHTML=`Wrong letters:`;
    if(word.innerHTML==''){
        randomWord();
    }
    else{
        word.innerHTML='';
        hint.innerHTML=''
        randomWord();
    }
};
document.addEventListener('keydown',()=>{
    myword.focus();
})

myword.addEventListener('input',()=>{
    console.log(`${theWord.length}---${correctLength}`);
    for (let i = 0; i < ranW.word.length; i++) {
        if(ranW.word[i]===myword.value){
            myword.value='';
            allS.forEach((E)=>{
                if(E.hasAttribute(`letter`)){
                    if(E.getAttribute('letter')===ranW.word[i] ){
                        E.innerHTML=ranW.word[i];
                        correctLength+=1;
                    }
                }
              
            })
        }
        else{
            continue;
        }
        
    }
    checkCorrect();
 
    if(!incorrectAns.includes(myword.value)){
        remainGuess--;
        if(remainGuess===0){
            alert(`Time out\
            your word is ${ranW.word}`);
           
            if(alert){
                for (let i = 0; i < ranW.word.length; i++) {
                    if(allS[i].hasAttribute(`letter`)){
                        if(allS[i].getAttribute('letter')===ranW.word[i]){
                            allS[i].innerHTML=ranW.word[i];
                        }
                    }
            else{
                continue;
            }
            
        }            }
        }
        rem.innerHTML=`Remaining guesses: ${remainGuess}`
        incorrectAns=[];
        incorrectAns.push(myword.value);
        wrong.innerHTML+=` ${incorrectAns}`;
    }
    myword.value='';

});
