let button,
  entradaM,
  masa,
  k,
  simular = false,
  timer = 0.01,
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
  Fase = 0;
  band=true;

function setup() {
  //createCanvas(displayWidth, displayHeight);
  createCanvas(ResX, ResY);
  botonesControl();
  sliderEntrada();
  imagenes();
} //----------------------------------------------
function imagenes() {
  img = loadImage("Fondos M.A.S/piso.png");
  piso = loadImage("Fondos M.A.S/piso.png");
  cir = loadImage("Fondos M.A.S/circulo.gif");
  cir2 = loadImage("Fondos M.A.S/circulo2.gif");
  resor = loadImage("Fondos M.A.S/prueba.png");
  bg = loadImage("/Fondos M.A.S/background.jpg")
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
function sliderEntrada() {
  //Creacion de slider de  masa
  entradaM = createSlider(1, 30, 1, 1);
  entradaM.position(180, 180);
  //----------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(450, 180);
  //----------------------------------------------
  //Creacion de slider de phi
  entradaVel = createSlider(0, TWO_PI, 0, 0.5);
  entradaVel.position(950, 180);
  //----------------------------------------------}
  //Creacion de slider de amplitud
  entradaX0 = createSlider(0, 10, 1, 0.1);
  entradaX0.position(700, 180);

  //Creacion de slider de  velocidad
  velocidad = createSlider(0.001, 0.1, 0.01, 0.002);
  velocidad.position(XminSlider+180, YminSlider+100);
  
}

function obtener() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorX0 = entradaX0.value();
  ValorV0 = entradaVel.value();
  timer = velocidad.value();
}
//----------------------------------------------

//----------------------------------------------

function draw() {
  obtener();
  entorno();
  // condicional que controla cuando se ejecutara el programa
  if (simular) {
    movimiento();
  }
}
//----------------------------------------------
function entorno() {
  // disenio de todo el entorno del programa
  background(bg,10,10);
  translate(200, 200);
  image(piso, Xmin, PosSuelo, PisoW, PisoH);
  image(img, Xmin, PosSuelo-MuroH, MuroW, MuroH);
  image(img, Xmax-MuroW, PosSuelo-MuroH,MuroW, MuroH);
  fill(255);
  stroke(255)
  textSize(30);
  text("Simulación M.A.S", 380, -165);
  textSize(15);
  text("X(0) = " + valorX0, 550, -60);
  text("Masa(kg) = " + valorM, 0, -60);
  text("Constante de elasticidad (N/M) = " + valorK, 230, -60);
  text("V(0) = " + ValorV0, 780, -60);
  text("Velocidad de reproducción",0,-140);
  //text("band "+cos(3)+" "+sin(3),0,80);
}
//----------------------------------------------

function movimiento() {
  //dibuja la linea y el ciruclo , y controla su movimiento
  //calculo de variables
  W0 = sqrt((2 * valorK) / (3*valorM));
  valorA=sqrt(pow(valorX0,2)+pow(ValorV0,2)/pow(W0,2));
  fase=atan((ValorV0/valorX0)/W0);
  //cos+ sen+ c1
  //Primer cuadrande, queda tal cual.
  //cos- sen+ c2
  if (cos(fase)<0 && sin (fase)>0)
    fase=(Math.PI/2)+fase;

  //cos- sen- c3
  if (cos(fase)<0 && sin (fase)<0)
    fase=Math.PI+fase;

  //cos+ sen- c4
  if (cos(fase)>0 && sin (fase)<0)
    fase=((3*Math.PI)/2)+fase;

  const Xt = valorA*cos(W0 * t + Fase);
  const Vt = (-valorA * W0 * sin(W0 * t + Fase)); 
  const At =(valorA * pow(W0,2) * cos(W0 * t + Fase)); 
  const Amax=valorA;
  
  
  //if(Xt.toFixed(4)==valorA.toFixed(4))
  //console.log(Math.abs(Xt.toFixed(4))+" "+Math.abs( valorA.toFixed(4)));

  if (Math.abs(Xt.toFixed(4))==Math.abs(valorA.toFixed(4)) && band){

    band=false;
  }else if (Math.abs(Xt.toFixed(4))==Math.abs(valorA.toFixed(4)) && band==false){
    band=true;
  }
  if (band){
    image(cir, (Xt*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, CirL,CirL);
    image(cir2, (Xt*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, 1,1);
  }
  if (band==false){
    image(cir2, (Xt*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, CirL,CirL);
    image(cir, (Xt*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, 1,1);
  }
  if (!isNaN(Xt)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, Xmin+MuroW, PosSuelo-ResorH-5, ResorW + Xt*multiplicador, ResorH);
    //image(url, posX, posY, width, height)
  }
  
  t += timer;
  text("Wo =   " + W0.toFixed(2) + "rad/seg", bordTxtX + 300, bordTxtY);
  let T = (2 * PI) / W0;
  text("T =   " + T.toFixed(2) + "seg", bordTxtX + 300, bordTxtY+30);
  text("A = "+ Amax,bordTxtX+300,bordTxtY+60);
  text("X(t) = " + Xt.toFixed(2) + " m", bordTxtX, bordTxtY);
  text("V(t) = " + Vt.toFixed(2) + " m/seg", bordTxtX, bordTxtY+30);
  text("A(t) = " + At.toFixed(2) + " m/seg²", bordTxtX, bordTxtY+60);
  

}
//----------------------------------------------
