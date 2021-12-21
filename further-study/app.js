let pokeball=document.querySelector('#pokeball')

pokeball.addEventListener('click',function(){
    document.querySelector('#pokemon-area').innerHTML=''
    let count;
    let namesAndImages = [];
    let pokemonArr=[]
    axios.get('https://pokeapi.co/api/v2/pokemon/').then(c=>{
        count=c.data.count
        return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
    }).then(pokemonList=>{
        
        for (let i=0;i<3;i++){
            let randNumber=Math.floor(Math.random()*count)
            let pokemonURL=pokemonList.data.results[randNumber].url
            namesAndImages.push({name:pokemonList.data.results[randNumber].name})
            pokemonArr.push(pokemonURL)
        }
        return Promise.all(pokemonArr.map(url => axios.get(url)));
    })
    .then(result=>{
        let pokemonSpeciesURL=[]

        for (let i=0;i<result.length;i++){
           
            namesAndImages[i].img=result[i].data.sprites.back_default
            pokemonSpeciesURL.push(result[i].data.species.url)

        }
        return Promise.all(pokemonSpeciesURL.map(url => axios.get(url)));
    })
    .then(res=>{
        

        for (j=0;j<res.length;j++){

            let text;
            for (let i of res[j].data.flavor_text_entries ){
                if (i.language.name==='en'){
                    text=i.flavor_text
                    break;
                }
            }
            namesAndImages[j].description=text
            makeCard(namesAndImages[j].name,namesAndImages[j].img,namesAndImages[j].description)
        }
    })

})

function makeCard(name,image,text){
    let div=document.createElement('div')
    div.classList.add("col-md-auto")
    div.innerHTML=`<div class="card" style="width: 18rem;">
    <img src=${image} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${text}</p>
    </div>
</div>`
    document.querySelector('#pokemon-area').appendChild(div)

}

