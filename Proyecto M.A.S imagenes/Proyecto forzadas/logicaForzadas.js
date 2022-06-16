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
  band=false, delta=0;
let imagen;

function setup() {
  createCanvas(ResX, ResY);
  botonesControl();
  SliderEntrada();
  fondos();
}

function fondos() {
  img = loadImage("/Fondos M.A.S/piso.png");
  piso = loadImage("/Fondos M.A.S/piso.png");
  cir = loadImage("/Fondos M.A.S/circulo.gif");
  cir2 = loadImage("/Fondos M.A.S/circulo2.gif");
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
  entradaM.position(850, 180);
  //----------------------------------------------
  // Slider frencuencia del torque
  //entradaW = createSlider(1,10,1,1);
  entradaW=createInput();
  entradaW.position(400,180)
  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(630, 180);
  //----------------------------------------------
  //Slider del torque
  entradaT = createSlider(1, 100, 1, 1);
  entradaT.position(10, 180);
  //----------------------------------------------
  //Creacion de slider de b
  entradaA = createSlider(1, 200, 1, 1);
  entradaA.position(1100, 180);
   //----------------------------------------------
  //Creacion de Slider de radio
  entradaR = createSlider(1, 10, 1, 1);
  entradaR.position(200, 180);
  
  //Creacion de slider de  velocidad
  velocidad = createSlider(0.001, 0.1, 0.01, 0.002);
  velocidad.position(XminSlider+180, YminSlider+100);
}
//----------------------------------------------

function calcularV2() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  valorT = entradaT.value();
  valorW = entradaW.value();
  if(valorW=="")
    valorW=0;
  valorR = entradaR.value();
  Gamma = valorA/ (3* valorM * pow(valorR,2) );
  W0 = sqrt((2 * valorK) / (3*valorM));
  timer = velocidad.value();
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
  background(bg,10 ,10);
  translate(200, 200);
  image(piso, Xmin, PosSuelo, PisoW, PisoH);
  image(img, Xmin, PosSuelo-MuroH, MuroW, MuroH);
  image(img, Xmax-MuroW, PosSuelo-MuroH,MuroW, MuroH);
  fill(255);
  stroke(255);
  textSize(30);
  text("Simulacion de oscilaciones forzadas ", 230, -160);
  textSize(15);
  text("Cte de amortiguamiento(N*s/m) = " + valorA, 840, -60);
  text("Masa(kg) = " + valorM, 680, -60);
  text("Cte de elasticidad (N/M) = " + valorK, 400, -60);
  text(" Gamma =" + Gamma.toFixed(2)+ " s⁻¹", 500, 120);
  text(" Wo =" + W0.toFixed(2)+" rad/seg", 700, 120);
  text("Torque(N/m) = "+ valorT, -170,-60);
  text("Frecuencia del torque(rad) = "+valorW,180,-60);
  text("Radio(m) = "+valorR,30,-60);
  text("Velocidad",0,-140);
}
//----------------------------------------------

//----------------------------------------------
function movimientoV2() {
  Wr=sqrt((W0*W0)-(2*(Gamma*Gamma))); //resonancia
  console.log(valorW+" "+Wr.toFixed(2));
  if(valorW == Wr.toFixed(2))
  {
   D = ((valorT*2)/(3*valorM*pow(valorR,2)))/((2*Gamma*valorW));
   delta = atan((Gamma*valorW)/(pow(W0,2)-pow(valorW,2)));
   text("Amplitud(m) = " +D.toFixed(2),300,120);
    text("delta(rad) = " + delta.toFixed(2),150,120);
  } else 
  {
    delta = atan((Gamma*valorW)/(pow(W0,2)-pow(valorW,2)));
    delta=Math.PI-Math.abs(delta);
    D = (valorT*2/3*valorM*pow(valorR,2))/(Math.sqrt(pow(pow(W0,2)-pow(valorW,2),2)+(pow(2*Gamma*valorW,2))));
    text("Amplitud(m) = " +D.toFixed(2),300,120);
    text("delta(rad) = " + delta.toFixed(2),150,120);
  }
  if(D >= 15)
  {
    x = 15*cos(valorW * t - delta);
    xP = D*cos(valorW * t - delta);
    text("x(t) = " +xP.toFixed(2) +" m",0,120)
  } else if(D < 150) 
  {
    x = D*cos(valorW * t - delta);
    text("x(t) = " +x.toFixed(2) +" m",0,120)
  }
  if (Math.abs(x.toFixed(4))==Math.abs(D.toFixed(4)) && band){
    band=false;
  }else if (Math.abs(x.toFixed(4))==Math.abs(D.toFixed(4)) && band==false){
    band=true;
  }
  if (band){
    image(cir, (x*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, CirL,CirL);
    image(cir2, (x*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, 1,1);
  }
  if (band==false){
    image(cir2, (x*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, CirL,CirL);
    image(cir, (x*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, 1,1);
  }
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, Xmin+MuroW, PosSuelo-ResorH-5, ResorW + x*multiplicador, ResorH);
    //image(url, posX, posY, width, height)
  }
  tint(255, 80);
  image(liquid, Xmin+MuroW, PosSuelo-LiquiH, LiquiW, LiquiH);
  noTint();
  text("Ecuacion de movimiento x(t) = " +D.toFixed(2)+"*" +"Cos(" + valorW//.toFixed(2)
  +"*"+t.toFixed(1)+ "-" + delta.toFixed(2)+")", 0,200 )
  t += timer;
}
//----------------------------------------------
//----------------------------------------------