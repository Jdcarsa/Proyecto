
let button, entradaM, masa, k, simular = false,timer = 0.005,t = 0;
var valorK = 0,valorM = 0,valorA = 0, W0, Fase =0;
function setup() {
  createCanvas(1368, 650);
  botonesControl();
  SliderEntrada();
}
//----------------------------------------------

function botonesControl() {
  button = createButton("Simular");
  button.position(500, 60);
  button.mousePressed(() => (simular = true));
  stop = createButton("Detener");
  stop.position(800, 60);
  stop.mousePressed(() => (simular = false));
}
//----------------------------------------------
function SliderEntrada() {
  entradaM = createSlider(0,100,1,1);
  entradaM.position(140, 160);
  //----------------------------------------------

  //--------------------------------------------------
  entradaK = createSlider(0, 100  , 1, 1);
  entradaK.position(450, 160);
  //----------------------------------------------
  entradaF = createSlider(0,TWO_PI)
  entradaF.position(900,160)
  //----------------------------------------------
  entradaA = createSlider(0, 140, 1, 1);
  entradaA.position(700, 160);
}
//----------------------------------------------
function calcular() {
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  Fase = entradaF.value();
  fill(255);
  textSize(15);
  text("0o(m) = " + valorA, 550, -50);
  text("Masa(kg) = " + valorM, 0, -50);
  text("Constante de elasticidad (N/M) = " + valorK, 230, -50);
  W0 = sqrt(((2 * valorK) / (3 * valorM)));
  text("Wo =   " + W0.toFixed(2), 0, 250);
  text("Desfase = " + Fase, 740, -50);
}

//----------------------------------------------

function draw() {
  entorno();
  calcular();
  if (simular) {
    //Se debe detener la animacion para ingresar los valores de m y k sin que ocurra un error
    movimiento();
  }
}
//----------------------------------------------
function entorno() {
  background(0);
  translate(200, 200);
  stroke(250);
  fill(150, 238, 33);
  // Rectangulo verde
  rect(-210, 395, 1368, 45);
  fill(268, 238, 33);
  // Rectangulos amarillos
  rect(1100, 395, 50, -100);
  rect(-200, 395, 30, -100);
  fill(255);
  textSize(30);
  text("Simulación M.A.S", 380, -160);
}
//----------------------------------------------

function movimiento() {
  //La amplitud maxima es  -140 y 140
  let x = map(cos(W0* t + Fase), -1, 1, -valorA, valorA);
  stroke(250);
  fill(129, 127, 256);
  line(-170, 370, x, 370);
  stroke(0, 0, 250);
  circle(x, 370, 48);
  stroke(250);
  fill(255);
  t += timer;
  textSize(15);
  let xd = x.toFixed(2);
  text("x(t) = " + xd, 0, 120);
  let v = map(-1 * W0 * sin(W0 * t + 20), -1, 1, -valorA, valorA);
  text("v(t) = " + v.toFixed(2), 0, 160);
  let a = map(-1 * sq(W0) * cos(W0* t + 20), -1, 1, -valorA, valorA);
  text("a(t) = " + a.toFixed(2), 0, 200);
}
//----------------------------------------------
