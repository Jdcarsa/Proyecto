let entradaM,
  masa,
  k,
  timer = 0.001,
  simularV2 = false,
  t = 0,x,img, piso,circulo,piso2,resor;
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
  img = loadImage("Fondos/pared.png");
  piso = loadImage("Fondos/piso.png");
  piso2 = loadImage("Fondos/piso2.png");
  cir =loadImage("Fondos/circulo.png");
  resor = loadImage("Fondos/prueba.png")

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
  background(225);
  translate(200, 200);
  stroke(0);
  fill(150, 238, 33);
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
  text("Simulacion de oscilaciones amortiguadas ", 230, -160);
  fill(0);
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
  stroke(0);
  fill(129, 17, 256);
  line(-157, 370, x + 380, 370);
  stroke(0, 0, 250);
  image(cir, x+372, 345);
  cir.resize(50, 50);
  if (!isNaN(x)){
    //SI ES UN NUMERO HAGA ESTO
    
    image(resor, 160, 345, 225+x, 50);
    
    //image(url, posX, posY, width, height)
    //resor.resize(225+x, 90);
  }
  //circle(x + 400, 370, 48);
  //Liquido idea
  stroke(0, 120, 240, 70);
  fill(0, 120, 240, 70);
  rect(-158, 395, 1264, -60);
  //
  t += timer;
}


//----------------------------------------------
/*
  tint(255, 127); // Mostrar a media opacidad
  image(img, offset, 0);
*/