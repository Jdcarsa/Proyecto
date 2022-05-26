let entradaM,
  masa,
  k,
  timer = 0.01,
  simularV2 = false,
  t = 0,
  x,
  img,
  piso,
  circulo,
  piso2,
  resor;
var valorK = 0,
  valorM = 0,
  valorA = 0,
  W0,
  Fase = 0,
  Gamma,
  resta,
  M1,
  M2;
let imagen;

function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  SliderEntrada();
  fondos();
}

function fondos() {
  img = loadImage("/Fondos M.A.S/pared.png");
  piso = loadImage("/Fondos M.A.S/pisodef.png");
  cir = loadImage("/Fondos M.A.S/circulo.png");
  resor = loadImage("/Fondos M.A.S/prueba.png");
  liquid = loadImage("/Fondos M.A.S/gif.gif");
  bg = loadImage("/Fondos M.A.S/background.jpg")
}

//----------------------------------------------

function botonesControl() {
  stop = createButton("Reiniciar");
  stop.position(800, 100);
  stop.mousePressed(() => window.location.reload());
  amort = createButton("Simular");
  amort.position(500, 100);
  amort.mousePressed(() => (simularV2 = true));
}
//----------------------------------------------
function SliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(5, 20, 1, 1);
  entradaM.position(140, 180);
  //----------------------------------------------

  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(10, 80, 1, 1);
  entradaK.position(520, 180);
  //----------------------------------------------
  //----------------------------------------------}
  //Creacion de slider de b
  entradaA = createSlider(30, 100, 1, 1);
  entradaA.position(900, 180);
}

//----------------------------------------------

function calcularV2() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  Gamma = valorA / (3 * valorM);
  W0 = sqrt((2 * valorK) / (3 * valorM));
  resta = pow(2 * Gamma, 2) - pow(W0, 2);
  M1 = -Gamma - Math.sqrt(resta);
  M2 = -Gamma + Math.sqrt(resta);
}

//----------------------------------------------

function draw() {
  calcularV2();
  entorno();
  if (simularV2) {
    movimientoV2();
  }
}
//----------------------------------------------
function entorno() {
  background(bg);
  translate(200, 200);
  image(piso, -380, 368, 1800, 100);
  image(img, -230, 285, 80, 120);
  image(img, 1100, 285, 80, 120);
  fill(255);
  stroke(255)
  textSize(30);
  text("Simulacion de oscilaciones forzadas ", 230, -160);
  textSize(15);
  text("Constante de amortiguamiento(N*s/m) = " + valorA, 640, -70);
  text("Masa(kg) = " + valorM, 0, -70);
  text("Constante de elasticidad (N/M) = " + valorK, 300, -70);
  text(" Gamma =" + Gamma.toFixed(2), 300, 120);
  text(" Wo =" + W0.toFixed(2), 600, 120);
}
//----------------------------------------------

//----------------------------------------------
function movimientoV2() {
  x =map(2*t*cos(5*t-2),-1,1,0,100);
  line(-157, 370, x + 380, 370);
  image(cir, x + 372, 345, 50, 50);
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, 160, 345, 225 + x, 50);
    //image(url, posX, posY, width, height)
  }
  //Liquido idea
  tint(255, 80);
  image(liquid, -157, 315, 1264, 80);
  noTint();
  t += timer;
}

//----------------------------------------------
