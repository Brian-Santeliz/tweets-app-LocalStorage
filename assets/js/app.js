//buscando el listado de tweetes
const lista = document.querySelector('#lista-tweets')


//event listeners
eventListeners();
function eventListeners(){
    //seleccionando el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //borrar tweets
   lista.addEventListener('click',eliminarTweet);

   //pinta en el DOM los tweet almecenados en el localStorage
   document.addEventListener('DOMContentLoaded', localStorageCargado)
    
}

//funciones

function agregarTweet(e){
    e.preventDefault();
    //extrayendo el valor del formulario.
     const texto = document.getElementById('tweet').value;

     //creando un boton para eliminar
     const borrar = document.createElement('a')
     borrar.className='borrar-tweet';
     borrar.style.textTransform='uppercase'
     borrar.textContent='eliminar'

     //creando un elemento y añadiendo el valor del formulario
     const li = document.createElement('li') 
     //pasando el valor al elemento li
     li.textContent = texto;

     //agregando el boton borrar
     li.appendChild(borrar)

    lista.appendChild(li) //agregando el li a la lista
    //añadiendo al local storage recibe como argumento el text
    agregarTweetLocalStorage(texto)
}

//eliminar tweet con delegation
function eliminarTweet(e){
    e.preventDefault();

    if(e.target.className==='borrar-tweet'){
        if(confirm('estas seguro que quires eliminar el tweet')){
             e.target.parentElement.remove() 
            borrarTweetLocalStorage(e.target.parentElement.textContent)
        }
    }
}

//funcion para pintar los elementos en el dom. 
function localStorageCargado(){
    let tweetsCargados;
    
    tweetsCargados = obtenerTwetsLocalStorage();

    //imprimiendo el arreglod de tweets.
    tweetsCargados.forEach(texto => {

         //creando un boton para eliminar
    const borrar = document.createElement('a')
    borrar.className='borrar-tweet';
    borrar.style.textTransform='uppercase'
    borrar.textContent='eliminar'

    //creando un elemento y añadiendo el valor del formulario
    const li = document.createElement('li') 
    //pasando el valor al elemento li
    li.textContent = texto;

    //agregando el boton borrar
    li.appendChild(borrar)

    lista.appendChild(li) //agregando el li a la lista
    });

}

//agregar el tweet al local storage
function agregarTweetLocalStorage(texto){

    let tweets;
    //leyendos los tweets y obteniendolos
    tweets = obtenerTwetsLocalStorage();
    
    //añadir el nuevo tweet
    tweets.push(texto)

    //convertir de json a string para guardarlo en el array
    localStorage.setItem('key', JSON.stringify(tweets))
}

//comprueba si existe tweet en localStorage, retorna un arreglo.
function obtenerTwetsLocalStorage(){
    let tweets; // variable de tweets vacia
     
    //revisar los valores del local storage
    if(localStorage.getItem('key')===null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('key')); //conviterte a objeto json
    }
    return tweets; //retornamos el valor de la variable a la funcion.
}

//eliminar el tweet del localStorage

function borrarTweetLocalStorage(tweetDom){
    let tweetsCargados,tweetBorrar;

    //eliminar el string del boton "eliminar"
    tweetBorrar = tweetDom.substring(0,tweetDom.length -8)
    //cargando los tweets del LocalStorage
    tweetsCargados = obtenerTwetsLocalStorage();
    //recorriendo el arreglo de los tweet y comprobando que sea igual que seleccionamos.
    tweetsCargados.forEach((tweet,indice)=>{
        if(tweet ===tweetBorrar){
            tweetsCargados.splice(indice,1) //elemento recorrido, y cuando elementos se elimnara.
        }
    })
    //actualizandoe el arreglo y tranformarlo a string.
    localStorage.setItem('key', JSON.stringify(tweetsCargados))

}
