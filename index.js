const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const verde = document.getElementById("verde")
const naranja = document.getElementById("naranja")
const btnEmpezar = document.getElementById("btnEmpezar")
const ULTIMO_NIVEL = 10
class Juego {
    constructor(){
        this.inicializar()
        this.secuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    inicializar(){
        btnEmpezar.classList.toggle('none')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.inicializar = this.inicializar.bind(this)
        this.siguienteNivel= this.siguienteNivel.bind(this)
        this.seleccion= this.seleccion.bind(this)
    }
    secuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
    }
    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
    }
    transformarAColor(numero){
        switch(numero){
            case 0:
                return "naranja"
            case 1:
                return "celeste"
            case 2:
                return "violeta"
            case 3:
                return "verde"
        }
    }
    transformarANumero(color){
        switch(color){
            case "naranja":
                return 0
            case "celeste":
                return 1
            case "violeta":
                return 2
            case "verde":
                return 3
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i<this.nivel; i++){
            const color = this.transformarAColor(this.secuencia[i])
            setTimeout(()=>this.iluminar(color), i*1000)
        } 
        this.identificar()
    }
    iluminar(ilu){
        this.colores[ilu].classList.add("light")
        setTimeout(()=>this.apagar(ilu), 350)
    }
    apagar(color){
        this.colores[color].classList.remove("light")
    }
    identificar(){
        this.colores.celeste.addEventListener('click', this.seleccion)
        this.colores.naranja.addEventListener('click', this.seleccion)
        this.colores.violeta.addEventListener('click', this.seleccion)
        this.colores.verde.addEventListener('click', this.seleccion)
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.seleccion)
        this.colores.naranja.removeEventListener('click', this.seleccion)
        this.colores.violeta.removeEventListener('click', this.seleccion)
        this.colores.verde.removeEventListener('click', this.seleccion)
    }
    perdioJuego(){
        swal ( "Perdiste!" ,  "No te rindas!  vuelve a intentarlo" ,  "error",{
            buttons:"volver a intentar"
        })
        .then(()=>{
            this.inicializar()
        })
    }
    ganateElJuego(){
        swal ( "Ganaste!" ,  "Eres muy bueno, increible!" ,  "success",{
            buttons:{cancel:"Volver a Jugar"}
        } )
        .then(()=>{
            this.inicializar()
        })
    }
    nivelSuperado(){
                swal ( "Nivel completado" ,  "Eres muy bueno, increible!" ,  "success", {buttons: "Siguiente Nivel"} )
                .then(()=>{
                    setTimeout(this.siguienteNivel, 700)

                })
    }
    seleccion(ev){
        const colorSeleccionado = ev.target.dataset.color
        const numeroSeleccionado = this.transformarANumero(colorSeleccionado)
        this.iluminar(colorSeleccionado)
        if (numeroSeleccionado == this.secuencia[this.subnivel]){
            console.log(this.secuencia)
            console.log(numeroSeleccionado)
            console.log(this.secuencia[this.subnivel])
            console.log(this.subnivel)
            this.subnivel++
            console.log(this.subnivel)
            if (this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel>ULTIMO_NIVEL+1){
                    this.ganateElJuego()
                }
                else{
                    this.nivelSuperado()
                }
            }
            else{
                console.log("no se")
            }
        }
        else{
            this.eliminarEventosClick()
            this.perdioJuego()
        }
    }
}
function empezarjuego(){
    window.juego = new Juego()
}
console.warn('No juegues conmigo bb')