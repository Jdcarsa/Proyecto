let entradaM,
  masa,
  k,
  timer = 0.001,
  simularV2 = false,
  t = 0,x;
var valorK = 0,
  valorM = 0,
  valorA = 0,
  W0,
  Fase = 0,
  Gamma,
  resta,
  M1,
  M2;

function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  SliderEntrada();
}


  

//----------------------------------------------

function botonesControl() {
  stop = createButton("Reiniciar");
  stop.position(800, 60);
  stop.mousePressed(() => (window.location.reload()));
  amort = createButton("Simular");
  amort.position(500, 60);
  amort.mousePressed(() => (simularV2 = true));
}
//----------------------------------------------
function SliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(5, 20, 1, 1);
  entradaM.position(140, 160);
  //----------------------------------------------

  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(10, 80, 1, 1);
  entradaK.position(520, 160);
  //----------------------------------------------
  //----------------------------------------------}
  //Creacion de slider de b
  entradaA = createSlider(30, 100, 1, 1);
  entradaA.position(900, 160);
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
  // disenio de todo el entorno del programa
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
  text("Simulacion de oscilaciones amortiguadas ", 230, -160);
  fill(255);
  textSize(15);
  text("Constante de amortiguamiento(N*s/m) = " + valorA, 640, -50);
  text("Masa(kg) = " + valorM, 0, -50);
  text("Constante de elasticidad (N/M) = " + valorK, 300, -50);
  text(" Gamma ="+Gamma.toFixed(2),300 , 120)
  text(" Wo ="+W0.toFixed(2),600 , 120)
}
//----------------------------------------------

//----------------------------------------------
// prueba que se puede hacer otro, con el mismo detener
function movimientoV2() {
  //dibuja la linea y el circulo , y controla su movimiento
  if(pow(Gamma,2)< pow(W0,2))
  {
   x = map(pow(2.67,-Gamma*t)* cos((pow(W0, 2) - pow(2 * Gamma, 2))*t + 20),-1,1,-300,300)
  }
  else 
  {
    if(pow(Gamma,2) == pow(W0,2))
  {
    x = map(cos((10 + 80*t)*pow(2.71,-Gamma*t )),-1,1,-300,300)
  }
  else 
  {
    x = map(cos(10 * pow(2.71, M1 * t) + 80 * pow(2.71,-M2* t)),-1,1,-300,300);
  }
  }
  stroke(250);
  fill(129, 17, 256);
  line(-170, 370, x + 380, 370);
  stroke(0, 0, 250);
  circle(x + 400, 370, 48);
  stroke(250);
  //Liquido idea
  fill(0, 120, 240, 70);
  rect(-170, 395, 1270, -60);
  fill(255);
  t += timer;
  textSize(15);
}


//----------------------------------------------
