// https://www.varsitytutors.com/hotmath/hotmath_help/topics/line-of-best-fit

const width = 600;
const height = 610;
const regressionAreaXCoord = 10;
const regressionAreaYCoord = 10;
const regressionAreaWidth = 580;
const regressionAreaHeight = 510;

let pointsInsideCanvas = [];
let data_real_x = [];
let data_real_y = [];

// y = slope*x + yInterceptor
let slope = 1;
let yInterceptor = 0;
let cnv;

setup = () => {
	var canvas = createCanvas(width, height);
	canvas.parent("sketch-holder");
};

checkClickArea = () => {
	return (
		mouseX > regressionAreaXCoord &&
		mouseY > regressionAreaYCoord &&
		mouseX < regressionAreaWidth &&
		mouseY < regressionAreaHeight
	);
};

mousePressed = () => {
	if (checkClickArea) {
		// By default y-axis encreases from top-down while the trigonometric y-axis, used on this project, encreases from botton-up
		const trigonometricY = regressionAreaHeight - mouseY;

		const point = createVector(mouseX, trigonometricY);
		pointsInsideCanvas.push(point);
	}
};

drawLine = () => {
	let firstPointXCoord = regressionAreaXCoord + 1;
	let firstPointYCoord = regressionAreaHeight - (slope * firstPointXCoord + yInterceptor);
	let secondPointXCoord = regressionAreaHeight;
	let secondPointYCoord = regressionAreaHeight - (slope * secondPointXCoord + yInterceptor);

	stroke(255, 255, 0);
	line(firstPointXCoord, firstPointYCoord, secondPointXCoord, secondPointYCoord);
};

linearRegression = () => {
	const xCoordsSum = pointsInsideCanvas.reduce((acc, value) => acc + value.x, 0);
	const yCoordSum = pointsInsideCanvas.reduce((acc, value) => acc + value.y, 0);
	const nPoints = pointsInsideCanvas.length;

	const xCoordsMean = xCoordsSum / nPoints;
	const yCoordMean = yCoordSum / nPoints;

	// slope = n/d
	const n = pointsInsideCanvas.reduce((acc, value) => acc + (value.x - xCoordsMean) * (value.y - yCoordMean), 0);
	const d = pointsInsideCanvas.reduce((acc, value) => acc + (value.x - xCoordsMean) ** 2, 0);

	slope = n / d;
	yInterceptor = yCoordMean - slope * xCoordsMean;
};

draw = () => {
	background(51);
	fill(100);

	rect(regressionAreaXCoord, regressionAreaYCoord, regressionAreaWidth, regressionAreaHeight);

	pointsInsideCanvas.forEach((point) => {
		const canvasY = regressionAreaHeight - point.y;
		fill(255);
		stroke(255);
		ellipse(point.x, canvasY, 8, 8);
	});

	// Min of 2 points to draw a line
	if (pointsInsideCanvas.length > 1) {
		linearRegression();
		drawLine();
		textSize(15);
		fill(255);
		stroke(200);
		text(`f(x): ${slope}*x + ${yInterceptor}`, 10, regressionAreaHeight + 70);
		text(`Slope: ${slope}`, 10, regressionAreaHeight + 30);
		text(`y-Interceptor: ${yInterceptor}`, 10, regressionAreaHeight + 50);
	} else {
		textSize(15);
		fill(255);
		stroke(200);
		text(`f(x): `, 10, regressionAreaHeight + 70);
		text(`Slope: `, 10, regressionAreaHeight + 30);
		text(`y-Interceptor: `, 10, regressionAreaHeight + 50);
	}
};
