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
  resor,D;
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
  img = loadImage("/Fondos M.A.S/piso.png");
  piso = loadImage("/Fondos M.A.S/piso.png");
  cir = loadImage("/Fondos M.A.S/circulo.png");
  resor = loadImage("/Fondos M.A.S/prueba.png");
  liquid = loadImage("/Fondos M.A.S/gif.gif");
  bg = loadImage("/Fondos M.A.S/background.jpg");
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
  entradaM = createSlider(1, 40, 1, 1);
  entradaM.position(850, 220);
  //----------------------------------------------
  //Creacion de Checkbox
  checkbox = createCheckbox("", false);
  checkbox.position(100, 80);
  checkbox.changed(myCheckedEvent);
  //--------------------------------------------------
  checkbox2 = createCheckbox("", false);
  checkbox2.position(100, 120);
  checkbox2.changed(myCheckedEvent);
  //--------------------------------------------------
  entradaW = createSlider(1,80,1,1);
  entradaW.position(400,220)
  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(630, 220);
  //----------------------------------------------
  entradaT = createSlider(1, 100, 1, 1);
  entradaT.position(10, 220);
  //----------------------------------------------
  //Creacion de slider de b
  entradaA = createSlider(1, 100, 1, 1);
  entradaA.position(1100, 220);
  entradaR = createSlider(1, 20, 1, 1);
  entradaR.position(200, 220);

}

function myCheckedEvent() {
  if (checkbox.checked()) {
    timer = 0.05;
  } else if (checkbox2.checked()) {
    timer = 0.001;
  } else if (checkbox2.checked() == false || checkbox.checked() == false) {
    timer = 0.01;
  }
}

//----------------------------------------------

function calcularV2() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  valorT = entradaT.value();
  valorW = entradaW.value();
  valorR = entradaR.value();
  Gamma = valorA / (3 * valorM * valorR);
  W0 = sqrt((2 * valorK) / (3 * valorM));
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
  image(piso, -380, 368, 1650, 100);
  image(img, 1100, 255, 105, 160);
  image(img, -230, 255, 60, 160);
  fill(255);
  stroke(255);
  textSize(30);
  text("Simulacion de oscilaciones forzadas ", 230, -160);
  textSize(15);
  text("Cte de amortiguamiento(N*s/m) = " + valorA, 840, -30);
  text("Masa(kg) = " + valorM, 680, -30);
  text("Cte de elasticidad (N/M) = " + valorK, 400, -30);
  text(" Gamma =" + Gamma.toFixed(2)+ " s⁻¹", 500, 120);
  text(" Wo =" + W0.toFixed(2)+" rad/seg", 700, 120);
  text("Rapido",-80,-140);
  text("Lento",-80,-100);
  text("Torque(N/m) = "+ valorT, -170,-30);
  text("Frecuencia del torque(rad) = "+valorW,180,-30);
  text("Radio(m) = "+valorR,30,-30);
}
//----------------------------------------------

//----------------------------------------------
function movimientoV2() {
  if(valorW == W0)
  {
   D = valorT/(2*valorM*Gamma*W0)
   delta = HALF_PI;
   text("Amplitud(m) = " +D.toFixed(2),300,120)
  text("delta = " + delta.toFixed(2),150,120)
  } else 
  {
   delta = atan((Gamma*valorW)/pow(W0,2)-pow(valorW,2));
   D = (valorT/((3/2)*valorM*pow(valorR,2)))/(Math.sqrt(pow(pow(W0,2)-pow(valorW,2),2)+(Gamma*pow(valorW,2))));
   text("Amplitud(m) = " +D.toFixed(2),300,120)
   text("delta = " + delta.toFixed(2),150,120)
  }
  x = map(D*cos(valorW * t - delta), -1, 1, 1, 100);
  text("x(t) = " +x.toFixed(2) +" m",0,120)
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, -280, 345, 225 + x, 40);
    //image(url, posX, posY, width, height)
  }
  image(cir, x-100, 335, 60, 60);
  image(img, -230, 255, 60, 160);
  tint(255, 80);
  image(liquid, -173, 315, 1280, 80);
  noTint();
  t += timer;
}
//----------------------------------------------
