// ##################################################

let ul=document.createElement('ul')
document.querySelector('body').append(ul)


let numbers=[12,54,37,89]
axios.get(`http://numbersapi.com/${numbers}?json`)
  .then(n1 => {
    for (let i in n1.data){
        let li=document.createElement('li')
        li.innerText=n1.data[i]
        ul.append(li)
    }
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });

// ##################################################
let ol=document.createElement('ol')
document.querySelector('body').append(ol)

const favNumber=10;

let fourNumberPromises=[]

for (let i = 1; i < 5; i++) {
  fourNumberPromises.push(
    axios.get(`http://numbersapi.com/${favNumber}?json`)
  );
}

Promise.all(fourNumberPromises)
  .then(numberArr => (
    numberArr.forEach(n =>{
        let li=document.createElement('li')
        li.innerText=n.data.text
        ol.append(li)
    })
  ))
  .catch(err => console.log(err));