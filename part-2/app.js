let button=document.querySelector("#gimme-card")

let button2=document.querySelector("#restart")

let deckId;
axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/").then(c=>{
    deckId=c.data.deck_id
})


function drawCard(){

    console.log(deckId)
    axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(c=>{
        if (c.data.remaining===0){
            console.log(c.data.remaining)
            button.style='display:None;'
            button2.style='display:block;'
        }
        else{
            let img=document.createElement('img')
            img.src=c.data.cards[0].image
            document.querySelector('#cards').append(img)
    
            img.style=`transform: rotate(${Math.floor(Math.random() * 60)+30}deg);`
            console.log(c.data)
        }
    })
}

button.addEventListener('click',drawCard)

button2.addEventListener('click',function(){
    location.reload()
})



