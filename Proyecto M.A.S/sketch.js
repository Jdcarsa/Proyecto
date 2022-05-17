let button,
  entradaM,
  masa,
  k,
  simular = false,
  timer = 0.005,
  simularV2 = false,
  t = 0;
var valorK = 0,
  valorM = 0,
  valorA = 0,
  W0,
  Fase = 0;



function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  SliderEntrada()
  
}
//----------------------------------------------

function botonesControl() {
  button = createButton("Simular");
  button.position(500, 60);
  button.mousePressed(() => ((simular = true)));
  stop = createButton("Reiniciar");
  stop.position(800, 60);
  stop.mousePressed(() => ((window.location.reload())) );

}
//----------------------------------------------
function SliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(1, 30, 1, 1);
  entradaM.position(140, 160);
  //----------------------------------------------

  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 50, 1, 1);
  entradaK.position(450, 160);
  //----------------------------------------------
  //Creacion de slider de phi
  entradaF = createSlider(0, TWO_PI, 1, 1);
  entradaF.position(900, 160);
  //----------------------------------------------}
  //Creacion de slider de amplitud
  entradaA = createSlider(1, 300, 1, 1);
  entradaA.position(700, 160);
}

function obtener() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  Fase = entradaF.value();
  

}
//----------------------------------------------



//----------------------------------------------

function draw() {
  entorno();
  obtener();
  // condicional que contrala cuando se ejecutara el programa 
  if (simular) {
    movimiento();
  }
}
//----------------------------------------------
function entorno() {
  // disenio de todo el entorno del programa
  background(225);
  translate(200, 200);
  stroke(0);
  fill(150, 238, 33);
  // Rectangulo verde
  rect(-210, 395, 1368, 45);
  fill(268, 238, 33);
  // Rectangulos amarillos
  rect(1100, 395, 50, -100);
  rect(-200, 395, 30, -100);
  fill(0);
  textSize(30);
  text("Simulación M.A.S", 380, -160);
  fill(0);
  textSize(15);
  text("Amplitud(m) = " + valorA, 550, -50);
  text("Masa(kg) = " + valorM, 0, -50);
  text("Constante de elasticidad (N/M) = " + valorK, 230, -50);
  text("Desfase(rad) = " + Fase, 740, -50);
}
//----------------------------------------------

function movimiento() {
  //dibuja la linea y el ciruclo , y controla su movimiento
  let x = map(cos(W0 * t + Fase), -1, 1, -valorA, valorA);
  stroke(0);
  fill(129, 127, 256);
  line(-170, 370, x + 380, 370);
  stroke(0, 0, 250);
  circle(x + 400, 370, 48);
  stroke(0);
  fill(0);
  t += timer;
  W0 = sqrt((2 * valorK) / (3 * valorM));
  text("Wo =   " + W0.toFixed(2) + "rad/seg", 300, 120);
  let T = (2 * PI) / W0;
  text("T =   " + T.toFixed(2) + "seg", 600, 120);
}
//----------------------------------------------

