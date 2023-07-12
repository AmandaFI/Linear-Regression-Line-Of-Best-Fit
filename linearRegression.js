// https://www.varsitytutors.com/hotmath/hotmath_help/topics/line-of-best-fit

const width = 600;
const height = 610;
const regressionAreaXCoord = 10;
const regressionAreaYCoord = 10;
const regressionAreaWidth = 580;
const regressionAreaHeight = 510;

let data = [];
let data_real_x = [];
let data_real_y = [];

// y = ax + b
let a = 1;
let b = 0;

let cnv;
function setup() {
	var canvas = createCanvas(width, height);

	// Move the canvas so it’s inside our <div id="sketch-holder">.
	canvas.parent("sketch-holder");

	// background(255, 0, 200);
}

function mousePressed() {
	if (
		mouseX > regressionAreaXCoord &&
		mouseY > regressionAreaYCoord &&
		mouseX < regressionAreaWidth &&
		mouseY < regressionAreaHeight
	) {
		let x = mouseX;
		let y = regressionAreaHeight - mouseY;

		let point = createVector(x, y);
		data.push(point);

		// só para poder visualizar as coordenadas reais do click mais recente do mouse com o (0, 0) no canto superior esquerdo do canvas
		data_real_x.push(mouseX);
		data_real_y.push(mouseY);
		console.log(data);
	}
}

function drawLine() {
	let x1 = regressionAreaXCoord + 1;
	let y1 = regressionAreaHeight - (a * x1 + b);
	let x2 = regressionAreaHeight;
	let y2 = regressionAreaHeight - (a * x2 + b);

	console.log(`x1: ${x1}`);
	console.log(`y1: ${y1}`);
	console.log(`x2: ${x2}`);
	console.log(`y2: ${y2}`);

	stroke(255, 255, 0);
	line(x1, y1, x2, y2);
}

function linearRegression() {
	let xsum = 0;
	let ysum = 0;

	for (let i = 0; i < data.length; i++) {
		xsum += data[i].x;
		ysum += data[i].y;
	}

	// calculando x e y barra (média aritmetica)
	let xmean = xsum / data.length;
	let ymean = ysum / data.length;

	// para achar a precisa-se calcular o numerador e denominaor da formula

	// numerador
	let numerador = 0;
	for (let i = 0; i < data.length; i++) {
		x = data[i].x;
		y = data[i].y;
		numerador += (x - xmean) * (y - ymean);
	}

	// denominador
	let denominador = 0;
	for (let i = 0; i < data.length; i++) {
		x = data[i].x;
		denominador += (x - xmean) * (x - xmean);
	}

	a = numerador / denominador; // slope
	b = ymean - a * xmean; // y interceptor
}

function draw() {
	// função fica em loop, desenahndo os elemetnos toda hora
	background(51);
	fill(100);

	rect(regressionAreaXCoord, regressionAreaYCoord, regressionAreaWidth, regressionAreaHeight);

	//passando por todos os pontos que ja foram clicados e estao no array data e desenhando os pontos
	for (let i = 0; i < data.length; i++) {
		let x = data[i].x;
		let y = regressionAreaHeight - data[i].y;

		//desenha o ponto
		fill(255); // fundo da elipse
		stroke(255); // borda da elipse
		ellipse(x, y, 8, 8);
	}

	//só começa a desenhar a reta se tiver no míninmo 2 pontos
	if (data.length > 1) {
		linearRegression();
		drawLine();
	}

	if (data.length > 1) {
		textSize(15);
		fill(255);
		stroke(255);
		text(`f(x): ${a}*x + ${b}`, 10, regressionAreaHeight + 70);
		text(`Slope: ${a}`, 10, regressionAreaHeight + 30);
		text(`y-Interceptor: ${b}`, 10, regressionAreaHeight + 50);
	} else {
		textSize(15);
		fill(255);
		stroke(255);
		text(`f(x): `, 10, regressionAreaHeight + 70);
		text(`Slope: `, 10, regressionAreaHeight + 30);
		text(`y-Interceptor: `, 10, regressionAreaHeight + 50);
	}
}
