function setup() { //definir una funcion
    canvas = createCanvas(230, 230); //creamos el lienzo y sus medidas
    canvas.center(); //colocamos el lienzo en el centro
    background("white"); //color del fondo
    canvas.mouseReleased(classifyCanvas); //llamamos la funcion classifyCanvas
    synth = window.speechSynthesis; //creamos una variable y almacenamos la API
  }
  
  function preload() { //definimos la funcion 
    classifier = ml5.imageClassifier('DoodleNet'); //cargamos el modelo DoodlNet
  }
  
  
  
  function clearCanvas() { //definimos la funcion
    background("white"); //pone un fondo blanco al lienzo
  }
  
  function draw() { //definimos una funcion
    strokeWeight(13);  // Establece el grosor del stroke (trazo) a 13.
    stroke(0);  // Establece el color del stroke (trazo) a negro.
    if (mouseIsPressed) {// Si el mouse está presionado, dibuja una línea entre la posición previa y la actual del mouse.
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  
  function classifyCanvas() { //definimos una funcion
    classifier.classify(canvas, gotResult); //comparamos la imagen con las del modelo
  }
  
  function gotResult(error, results) { //definimos una funcion
    if (error) { //si hay
      console.error(error); //lo muestra en la consola
    }
    console.log(results); //si no lo hay muestra en la consola el resultado
    document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label; //muestra el resultado en la etiqueta del HTML
  
    document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%'; //muestra en el HTML el porcentaje de precision, el resultado lo multiplica por 100 lo redondea
  
    utterThis = new SpeechSynthesisUtterance(results[0].label); //cambie de la palabra de antes
    synth.speak(utterThis); //que hable
  }