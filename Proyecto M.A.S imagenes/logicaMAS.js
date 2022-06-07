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

function setup() {
  createCanvas(displayWidth, displayHeight);
  botonesControl();
  sliderEntrada();
  imagenes();
} //----------------------------------------------
function imagenes() {
  img = loadImage("Fondos M.A.S/piso.png");
  piso = loadImage("Fondos M.A.S/piso.png");
  cir = loadImage("Fondos M.A.S/circulo.png");
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
    //Creacion de Checkbox
  checkbox = createCheckbox('', false);
  checkbox.position(100,80)
  checkbox.changed(myCheckedEvent);
  //--------------------------------------------------
  checkbox2 = createCheckbox('', false);
  checkbox2.position(100,120)
  checkbox2.changed(myCheckedEvent);
  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(450, 180);
  //----------------------------------------------
  //Creacion de slider de phi
  entradaF = createSlider(0, TWO_PI, 0.5, 0.5);
  entradaF.position(950, 180);
  //----------------------------------------------}
  //Creacion de slider de amplitud
  entradaA = createSlider(1, 300, 1, 1);
  entradaA.position(700, 180);
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    timer = 0.05;
  } else if (checkbox2.checked()){
    timer = 0.001;
  } else if((checkbox2.checked()== false ||checkbox.checked()== false ))
  {
    timer = 0.01;
  }
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
  background(bg);
  translate(200, 200);
  image(piso, -380, 368, 1650, 100);
  image(img, -230, 255, 107, 160);
  image(img, 1050, 255, 107, 160);
  fill(255);
  stroke(255)
  textSize(30);
  text("Simulación M.A.S", 380, -165);
  textSize(15);
  text("Amplitud(m) = " + valorA, 550, -60);
  text("Masa(kg) = " + valorM, 0, -60);
  text("Constante de elasticidad (N/M) = " + valorK, 230, -60);
  text("Desfase(rad) = " + Fase, 780, -60);
  text("Rapido",-80,-140)
  text("Lento",-80,-100)
}
//----------------------------------------------

function movimiento() {
  //dibuja la linea y el ciruclo , y controla su movimiento
  const x = map(cos(W0 * t + Fase), -1, 1, 0, valorA);
  const v = (valorA * W0 * cos(W0 * t + Fase)); 
  const a =(valorA * pow(W0,2) * cos(W0 * t + Fase)); 
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, -130, 340, 225 + x, 40);
    //image(url, posX, posY, width, height)
  }
  //line(-157, 370, x + 380, 370);
  image(cir, x+70 , 335, 55, 55);
  t += timer;
  W0 = sqrt((2 * valorK) / (3 * valorM));
  text("Wo = "+ W0.toFixed(2) + "rad/seg", 600, 120);
  let T = (2 * PI) / W0;
  text("T = " + T.toFixed(2) + "seg", 800, 120);
  text("x(t) = " + x.toFixed(2) + " m", 0, 120);
  text("v(t) = " + v.toFixed(2) + " m/seg", 200, 120);
  text("a(t) = " + a.toFixed(2) + " m/seg²", 400, 120);
  
 /*
  text("X(t) = Cos("+W0.toFixed(2)+"*" + t.toFixed(2)+"+"
  +Fase.toFixed(2)+") = "+ x.toFixed(2)+ " m",-150,120);
  text("V(t) = "+valorA+" * "+ W0.toFixed(2) +"* Cos("+W0.toFixed(2)+"*" + t.toFixed(2)+"+"
  +Fase.toFixed(2)+") = "+ v.toFixed(2)+ " m/seg",200,120)
  */
  
}
//----------------------------------------------
