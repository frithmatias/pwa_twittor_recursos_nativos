class Camara {

    constructor( videoNode ) {
        this.videoNode = videoNode;
    }

    encender() {
        navigator.mediaDevices.getUserMedia({
            audio: false, 
            video: { width: 300, height: 300}
            // video va a capturar la imagen con la máxima resolución posible de la camara y esto no es necesario
            // hay camaras frontales que pueden capturar hasta 20mpx y esto es demasiado, vamos a definirle un valor menor.
        }).then( stream => {
            this.videoNode.srcObject = stream;
            this.stream = stream;
        });
    }

    apagar() {
        this.videoNode.pause(); // congela el video pero NO el stream 

        // hagamos una validacion porque nos va a dar error detener algo que todavía no esta definido 
        if( this.stream ){
            this.stream.getTracks()[0].stop();
        }
        // este metodo apagar() lo llamo en btnTomarFoto.on('click', ()=> {}), porque tenemos que detener 
        // el stream cuando ya sacamos la foto
    }


    tomarFoto(){
        // canvas es como un lienzo donde vamos a renderizar la foto 
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        // obtener el contexto del canvas 
        let context = canvas.getContext('2d');

        // dibujar la imagen dentro del canvas 
        context.drawImage( this.videoNode, 0,0, canvas.width, canvas.height );

        this.foto = context.canvas.toDataURL();

        // limpieza 
        canvas  = null;
        context = null;

        return this.foto; // regresamos la foto 
        // no lo podemos ver en pantalla todavía, pero lo podemos ver en consola ya que es un stream base64 


    }
}