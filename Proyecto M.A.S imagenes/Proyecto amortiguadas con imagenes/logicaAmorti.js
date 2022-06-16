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
  timer = 0.01,
  M2;
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
  entradaM = createSlider(1, 60, 1, 1);
  entradaM.position(250, 180);
  //--------------------------------------------------
  //Creacion de slider de constante k
  entradaK = createSlider(1, 100, 1, 1);
  entradaK.position(500, 180);
  //----------------------------------------------
  //Slider constante X0
  entradaX0 = createSlider(-20, 20, 1, 0.5);
  entradaX0.position(680, 180);
  //----------------------------------------------
  //Slider constante V0
  entradaV0 = createSlider(-20, 20, 1, 0.5);
  entradaV0.position(880, 180);
  //----------------------------------------------
  //Creacion de slider de b
  entradaA = createSlider(1, 50, 1, 1);
  entradaA.position(1080, 180);
   //----------------------------------------------
  //Slider del radio
  entradaR = createSlider(1, 20, 1, 1);
  entradaR.position(50, 180);
  //Creacion de slider de  velocidad
  velocidad = createSlider(0.001, 0.1, 0.005, 0.002);
  velocidad.position(XminSlider+180, YminSlider+100);
}
//----------------------------------------------

function calcularV2() {
  //toma el valor ingresado por el slider y lo almacena en una variable
  valorM = entradaM.value();
  valorK = entradaK.value();
  valorA = entradaA.value();
  valorX0 = entradaX0.value();
  valorV0 = entradaV0.value();
  valorR = entradaR.value();
  Gamma = valorA / (3*valorM * pow(valorR,2));
  W0 = sqrt((2 * valorK) / (3*valorM));
  resta = pow(Gamma, 2) - pow(W0, 2);
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
  text("Simulacion de oscilaciones amortiguadas ", 230, -160);
  textSize(15);
  text("Cte de amortiguamiento(N*s/m) = " + valorA, 830, -60);
  text("Masa(kg) = " + valorM, 80, -60);
  text("Cte de elasticidad (N/M) = " + valorK, 270, -60);
  text(" Gamma =" + Gamma.toFixed(2) + " s⁻¹", bordTxtX + 300, bordTxtY+30);
  text(" Wo =" + W0.toFixed(2) + " rad/seg",bordTxtX + 300, bordTxtY);
  text("X(0) = " + valorX0 +"m", 520, -60);
  text("V(0) = " + valorV0+"m/seg", 700, -60);
  text("Radio(m) = " + valorR, -120, -60);
  text("Velocidad de reproduccion", 0, -140);
}
//----------------------------------------------

//----------------------------------------------
function movimientoV2() {
  //dibuja la linea y el circulo , y controla su movimiento

  if (pow(Gamma, 2) < pow(W0, 2)) { //subamortiguado
    W = Math.sqrt(pow(W0, 2) - pow(Gamma, 2))
    if(valorX0 >0 && valorV0==0)
    {
      phi = atan(((valorV0/valorX0)+Gamma)/W)
      
    }else 
    {
      if(valorX0 == 0 && valorV0==0)
      {
        Constante = 0;
      }
      else 
      {
        phi = atan(((valorV0/valorX0)+Gamma)/W)
      }
    }
    /*
    //correccion del angulo
    //cos+ sen+ c1
    //Primer cuadrande, queda tal cual.
    //cos- sen+ c2
    if (cos(phi)<0 && sin (phi)>0)
      phi=(Math.PI/2)+phi;

    //cos- sen- c3
    if (cos(phi)<0 && sin (phi)<0)
      phi=Math.PI-phi;

    //cos+ sen- c4
    if (cos(phi)>0 && sin (phi)<0)
      phi=((2*Math.PI))-phi;*/

    phi = 2*Math.PI- Math.abs(phi)
    Constante = valorX0/(cos(Math.abs(phi)))
    x = Constante *pow(2.67, -Gamma * t) * cos(W * t + phi)
    text("x(t) = " +x.toFixed(2), bordTxtX, bordTxtY)
    text("Ampitud" + Constante.toFixed(2),bordTxtX, bordTxtY+60 )
    text("Phi = " + phi.toFixed(2),bordTxtX, bordTxtY+30)
    
  } else {
    if (pow(Gamma, 2) == pow(W0, 2)) { //criticamente amortiguado
      Constante1 = valorX0
      Constante2 = valorV0+ Constante1*Gamma
      x = (Constante1+Constante2 * t )* pow(2.71, -Gamma * t)
      text("x(t) = " +x.toFixed(2), bordTxtX, bordTxtY)
    } else if(pow(Gamma,2) > pow(W0, 2)) { //sobreamortiguado
      M1 = -Gamma - Math.sqrt(resta);
      M2 = -Gamma + Math.sqrt(resta);
      text("M1 = " + M1.toFixed(2), 700, 0);
      text("M2 = " + M2.toFixed(2), 700, 30);
      Constante2 = ( valorV0 - M1 *valorX0)/(M2+ M2*valorX0)
      Constante1 = valorX0 - Constante2;
      x = Constante1 * pow(2.71, M1 * t) + Constante2 * pow(2.71, M2 * t)
      text("x(t) = " +Math.abs(x.toFixed(2)), bordTxtX, bordTxtY)
    }
  }
 
  image(cir, (x*multiplicador+(Xmin+MuroW+ResorW-CirL/2)) , PosSuelo-CirL, CirL,CirL);
  if (!isNaN(x)) {
    //SI ES UN NUMERO HAGA ESTO
    image(resor, Xmin+MuroW, PosSuelo-ResorH-5, ResorW + x*multiplicador, ResorH);
    //image(url, posX, posY, width, height)
  }
    
  tint(255, 80);
  image(liquid, Xmin+MuroW, PosSuelo-LiquiH, LiquiW, LiquiH);
  noTint();
  t += timer;
}

//----------------------------------------------
