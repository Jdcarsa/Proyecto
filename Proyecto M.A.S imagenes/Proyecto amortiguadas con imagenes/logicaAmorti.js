let entradaM,
  masa,
  k,
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
  M2,
  timer = 0.01;
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
  entradaM = createSlider(1, 60, 1, 1);
  entradaM.position(250, 220);
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
  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(500, 220);
  //----------------------------------------------
  entradaC1 = createSlider(1, 40, 1, 1);
  entradaC1.position(680, 220);
  //----------------------------------------------
  entradaC2 = createSlider(1, 40, 1, 1);
  entradaC2.position(890, 220);
  //----------------------------------------------
  //Creacion de slider de b
  entradaA = createSlider(1, 100, 1, 1);
  entradaA.position(1080, 220);
  entradaR = createSlider(1, 20, 1, 1);
  entradaR.position(50, 220);
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    timer = 0.5;
  } else if (checkbox2.checked()) {
    timer = 0.005;
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
  valorC1 = entradaC1.value();
  valorC2 = entradaC2.value();
  valorR = entradaR.value();
  Gamma = valorA / (3 * valorM * valorR);
  W0 = sqrt((2 * valorK) / (3 * valorM));
  resta = pow(2 * Gamma, 2) - pow(W0, 2);

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
  image(img, 1050, 255, 105, 160);
  image(img, -230, 255, 105, 160);
  fill(255);
  stroke(255);
  textSize(30);
  text("Simulacion de oscilaciones amortiguadas ", 230, -160);
  textSize(15);
  text("Cte de amortiguamiento(N*s/m) = " + valorA, 830, -30);
  text("Masa(kg) = " + valorM, 80, -30);
  text("Cte de elasticidad (N/M) = " + valorK, 270, -30);
  text(" Gamma =" + Gamma.toFixed(2) + " s⁻¹", 300, 180);
  text(" Wo =" + W0.toFixed(2) + " rad/seg", 500, 180);
  text("Rapido", -80, -140);
  text("Lento", -80, -100);
  text("Cte A = " + valorC1, 520, -30);
  text("Cte B = " + valorC2, 720, -30);
  text("Radio(m) = " + valorR, -120, -30);
}
//----------------------------------------------

//----------------------------------------------
function movimientoV2() {
  //dibuja la linea y el circulo , y controla su movimiento
  if (pow(Gamma, 2) < pow(W0, 2)) {
    x = map(
      8 *
        pow(2.67, -Gamma * t) *
        cos((pow(W0, 2) - pow(2 * Gamma, 2)) * t + 20),
      -1,
      1,
      50,
      100
    );
    text("x(t) = " +x.toFixed(2), 100,180)
  } else {
    if (pow(Gamma, 2) == pow(W0, 2)) {
      x = map(
        cos((valorC1 + valorC2 * t) * pow(2.71, -Gamma * t)),
        -1,
        1,
        0,
        300
      );
      text("x(t) = " +x.toFixed(2), 100,180)
    } else {
      M1 = -Gamma - Math.sqrt(resta);
      M2 = -Gamma + Math.sqrt(resta);
      text("M1 = " + M1.toFixed(2), 700, 180);
      text("M2 = " + M2.toFixed(2), 800, 180);
      x = map(
        cos(valorC1 * pow(2.71, M1 * t) + valorC2 * pow(2.71, -M2 * t)),
        -1,
        1,
        0,
        300
      );
      text("x(t) = " +x.toFixed(2), 100,180)
    }
  }
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, -130, 340, 225 + x, 40);
    //image(url, posX, posY, width, height)
  }
  image(cir, x + 70, 335, 55, 55);
  image(img, -230, 255, 105, 160);
  //Liquido idea
  tint(255, 80);
  image(liquid, -133, 315, 1188, 80);
  noTint();
  t += timer;
}

//----------------------------------------------
