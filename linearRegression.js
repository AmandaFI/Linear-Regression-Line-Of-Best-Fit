// https://www.varsitytutors.com/hotmath/hotmath_help/topics/line-of-best-fit

const width = 600;
const height = 610;
const regressionAreaXCoord = 0;
const regressionAreaYCoord = 0;
const regressionAreaWidth = 600;
const regressionAreaHeight = 510;

// y = slope*x + yInterceptor
let slope = 1;
let yInterceptor = 0;
let pointsInsideCanvas = [];

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
	let secondPointXCoord = regressionAreaWidth;
	let secondPointYCoord = regressionAreaHeight - (slope * secondPointXCoord + yInterceptor);

	stroke(0, 255, 0);
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

showCalculatedValues = () => {
	const s = pointsInsideCanvas.length > 1 ? slope : "?";
	const y = pointsInsideCanvas.length > 1 ? yInterceptor : "?";
	textSize(15);
	fill(0, 255, 0);
	stroke(0, 255, 0);
	text("Click 2 or more times on the area above to define a line.", 10, regressionAreaHeight + 20);
	fill(255);
	stroke(0, 0, 0);
	text(`f(x): ${s}*x + ${y}`, 10, regressionAreaHeight + 50);
	text(`Slope: ${s}`, 10, regressionAreaHeight + 70);
	text(`y-Interceptor: ${y}`, 10, regressionAreaHeight + 90);
};

draw = () => {
	background(51);
	fill(100);
	stroke(51);
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
	}
	stroke(0, 0, 0);
	fill(23, 28, 38);
	rect(0, regressionAreaHeight, regressionAreaWidth, height);
	showCalculatedValues();
};
