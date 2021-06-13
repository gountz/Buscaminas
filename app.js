//constantes o variables globales
const $ul = document.getElementById('lista');
const $div = document.getElementById('tablero-contenedor');
const $butonInit = document.getElementById('btnIniciar');
const $textoIntroductorio = document.getElementById('textoIntroductorio');
let contadorDeJugadas = 0;
//Funciones de iniciacion
function iniciarGame(){
    let minas = crearMinas();
    desactivarBoton();
    mostrarTablero();
    asignarMinas(minas);
    sumarIndicesCeldas(minas);
    
}

//Funciones de ejecutacion

function crearMinas(){
    let minas = [];
    let candidatos = Math.floor(Math.random()*16) + 1;
    minas.push(candidatos);
    while(minas.length<4){
        candidatos = Math.floor(Math.random()*16)+1;
        for(let i = 0;i<minas.length;i++){
            if(candidatos===minas[i]){
                break;
            }
            else if(minas[i]===minas[minas.length-1]){
                minas.push(candidatos);
            }
        }
    }
    return minas;
}
function sumarIndicesCeldas($elemento){
    let minaIndice = [$elemento[0],$elemento[1],$elemento[2],$elemento[3]]
    
    for(let i=0;i<4;i++){
        sumarIndices(minaIndice[i]);
    }
}
function sumarIndices($elemento){
    const recorrerMinas = [-1,1,3,-3,4,-4,5,-5]
    const capturadorErroresIzq = [1,5,9,13];
    const capturadorErroresDr = [4,8,12,16];
    let comparador;
    for(let i = 0;i<4;i++){
        if($elemento === capturadorErroresIzq[i]){
            comparador = 1;
        }
    }
    for(let i = 0;i<4;i++){
        if($elemento ===capturadorErroresDr[i]){
            comparador = 2;
        }
    }
    if(comparador ===1 || comparador === 2){
        if(comparador ===1){
            comparador=0;
            let recorrerMinasAxuliar = [1,-3,4,-4,5]
            for(let i = 0;i<8;i++){
                
                if(document.getElementById(`_${$elemento +recorrerMinasAxuliar[i]}`)){
                    
                    document.getElementById(`_${$elemento + recorrerMinasAxuliar[i]}`).childNodes[0].textContent = `${parseInt(document.getElementById(`_${$elemento +recorrerMinasAxuliar[i]}`).childNodes[0].textContent) + 1 }` ;
                    
                }
            }
            
        }
        else{
            comparador=0;
            let recorrerMinasAxuliar = [-1,3,4,-4,-5]
            for(let i = 0;i<8;i++){
                if(document.getElementById(`_${$elemento +recorrerMinasAxuliar[i]}`)){
             
                    document.getElementById(`_${$elemento + recorrerMinasAxuliar[i]}`).childNodes[0].textContent = `${parseInt(document.getElementById(`_${$elemento +recorrerMinasAxuliar[i]}`).childNodes[0].textContent) + 1 }` ;
                
                }
            }
        }
    }
    else{
        for(let i = 0;i<8;i++){
            if(document.getElementById(`_${$elemento +recorrerMinas[i]}`)){
         
                document.getElementById(`_${$elemento + recorrerMinas[i]}`).childNodes[0].textContent = `${parseInt(document.getElementById(`_${$elemento +recorrerMinas[i]}`).childNodes[0].textContent) + 1 }` ;
            
            }
        } 
    }
    
}

function desactivarBoton(){
    $butonInit.style.display="none";
    $textoIntroductorio.style.display="none";
}
function mostrarTablero(){
    $div.classList.toggle('contenedor-toggle');
}
function asignarMinas(variable){
    variable.forEach(element =>{
        const html = "<i class='bx bxs-bomb'></i>";
        const $li = document.getElementById(`_${element}`)
        $li.insertAdjacentHTML('beforeend',html);
        $li.children[0].style.visibility = " hidden";
    })
}

function descubrirCasillero($element){
    $element.style.color = "white"
    let $liElements = document.querySelectorAll('li');
   if($element.children.length==2){
        for(let i=0;i<$liElements.length;i++){
            if($liElements[i].childNodes[1]){
                $liElements[i].childNodes[1].style.color = "white";
                $liElements[i].childNodes[1].style.visibility = " visible";
                $liElements[i].style.background = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)";
            }
        }
        alert("Perdiste");
        window.location.reload();
        
       

    }
    else{
        contadorDeJugadas++;
        $element.onclick = "";
        $element.childNodes[0].style.visibility = " visible";
        $element.style.background = "linear-gradient(to top, #9be15d 0%, #00e3ae 100%)";
        if(contadorDeJugadas===12){
            alert("Ganaste!");
            window.location.reload();
        }

    }

    
}
