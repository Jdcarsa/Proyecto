let button,
  entradaM,
  masa,
  k,
  simular = false,
  timer = 0.05,
  simularV2 = false,
  t = 0,
  img,
  piso,
  circulo,
  piso2,
  resor,
  ub;
var valorK = 0,
  valorM = 0,
  valorA = 0,
  W0,
  xc = 0,
  Fase = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  SliderEntrada();
  imagenes();
} //----------------------------------------------
function imagenes() {
  img = loadImage("Fondos M.A.S/pared.png");
  piso = loadImage("Fondos M.A.S/pisodef.png");
  cir = loadImage("Fondos M.A.S/circulo.png");
  resor = loadImage("Fondos M.A.S/prueba.png");
}
//----------------------------------------------

function botonesControl() {
  button = createButton("Simular");
  button.position(500, 100);
  button.mousePressed(() => (simular = true));
  stop = createButton("Reiniciar");
  stop.position(800, 100);
  stop.mousePressed(() => window.location.reload());
}
//----------------------------------------------
function SliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(1, 30, 1, 1);
  entradaM.position(140, 180);
  //----------------------------------------------

  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(450, 180);
  //----------------------------------------------
  //Creacion de slider de phi
  entradaF = createSlider(0, TWO_PI, 1, 1);
  entradaF.position(950, 180);
  //----------------------------------------------}
  //Creacion de slider de amplitud
  entradaA = createSlider(1, 300, 1, 1);
  entradaA.position(700, 180);
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
  obtener();
  entorno();
  // condicional que contrala cuando se ejecutara el programa
  if (simular) {
    movimiento();
  }
}
//----------------------------------------------
function entorno() {
  // disenio de todo el entorno del programa
  background(255);
  translate(200, 200);
  image(piso, -380, 368, 1800, 100);
  image(img, -230, 285, 80, 120);
  image(img, 1100, 285, 80, 120);
  fill(0);
  textSize(30);
  text("Simulación M.A.S", 380, -165);
  textSize(15);
  text("Amplitud(m) = " + valorA, 550, -60);
  text("Masa(kg) = " + valorM, 0, -60);
  text("Constante de elasticidad (N/M) = " + valorK, 230, -60);
  text("Desfase(rad) = " + Fase, 780, -60);
}
//----------------------------------------------

function movimiento() {
  //dibuja la linea y el ciruclo , y controla su movimiento
  const x = map(cos(W0 * t + Fase), -1, 1, 0, valorA);
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, 160, 345, 225 + x, 50);
    //image(url, posX, posY, width, height)
  }
  line(-157, 370, x + 380, 370);
  image(cir, x + 372, 345, 50, 50);
  t += timer;
  W0 = sqrt((2 * valorK) / (3 * valorM));
  text("Wo =   " + W0.toFixed(2) + "rad/seg", 300, 120);
  let T = (2 * PI) / W0;
  text("T =   " + T.toFixed(2) + "seg", 600, 120);
}
//----------------------------------------------
