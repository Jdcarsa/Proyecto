let button,
  entradaM,
  masa,
  k,
  simular = false,
  timer = 0.05,
  simularV2 = false,
  t = 0,
  img, piso,circulo,piso2,resor;
var valorK = 0,
  valorM = 0,
  valorA = 0,
  W0, xc=0 ,
  Fase = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  SliderEntrada();
  img = loadImage("Fondos/pared.png");
  piso = loadImage("Fondos/piso.png");
  piso2 = loadImage("Fondos/piso2.png");
  cir =loadImage("Fondos/circulo.png");
  resor = loadImage("Fondos/prueba.png")
}
//----------------------------------------------

function botonesControl() {
  button = createButton("Simular");
  button.position(500, 60);
  button.mousePressed(() => (simular = true));
  stop = createButton("Reiniciar");
  stop.position(800, 60);
  stop.mousePressed(() => window.location.reload());
}
//----------------------------------------------
function SliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(1, 30, 1, 1);
  entradaM.position(140, 160);
  //----------------------------------------------

  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
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
  background(150);
  translate(200, 200);
  // Rectangulo verde
  image(piso, -380, 368);
  piso.resize(1800, 100);
  image(piso2, -380, 368);
  piso2.resize(1500, 100);
  image(img, -230, 285);
  img.resize(80, 120);
  image(img, 1100, 285);
  img.resize(80, 120);
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
  const x = map(cos(W0 * t + Fase), -1, 1, -valorA, valorA);
  stroke(40,120,220);
  fill(100, 0, 250);
  if (!isNaN(x)){
    //SI ES UN NUMERO HAGA ESTO
    image(resor, 160, 345, 225+x, 50);
    //image(url, posX, posY, width, height)
    //resor.resize(225+x, 90);
  }
  line(-157, 370, x + 380, 370);
  image(cir, x+372, 345);
  cir.resize(50, 50);
  //circle(x + 400, 370, 48);
  stroke(0);
  fill(0);
  t += timer;
  W0 = sqrt((2 * valorK) / (3 * valorM));
  text("Wo =   " + W0.toFixed(2) + "rad/seg", 300, 120);
  let T = (2 * PI) / W0;
  text("T =   " + T.toFixed(2) + "seg", 600, 120);
}
//----------------------------------------------
