export default class baseChart {
  constructor(canvas) {
    this.canvas = canvas;
    this.dpr = window.devicePixelRatio;

    this.context = this.canvas.getContext("2d");
    this.offsetT = 0;
    this.offsetR = 0;
    this.offsetB = 0;
    this.offsetL = 0;
    this.thick = 5;
    this.convertedData = {};
  }

  init() {
    this.resizing();
    this.addEvent();
    return this;
  }

  scale(n = [], o = []) {
    if (n == [] || o == []) return 1;
    const g = n[0],
      z = n[1],
      k = o[0],
      v = o[1];
    return {
      get: (o) => {
        return ((o - g) / (z - g)) * (v - k) + k;
      },
    };
  }

  text({ text, x, y, fontSize, fillStyle, textAlign, textBaseline }) {
    this.context.save();
    this.context.fillStyle = fillStyle || "black";
    this.context.font =
      `${fontSize} Arial san-serif` || `0.8rem Arial san-serif`;
    this.context.textAlign = textAlign || "center";
    this.context.textBaseline = textBaseline || "middle";
    this.context.globalAlpha = 1;
    this.context.fillText(text, x, y);
    this.context.restore();
  }
  line({ sx, sy, ex, ey, strokeStyle, lineWidth, globalAlpha }) {
    this.context.save();

    const linePath = new Path2D();
    this.context.strokeStyle = strokeStyle || "black";
    this.context.lineWidth = lineWidth || 1;
    this.context.globalAlpha = globalAlpha || 1;
    this.context.beginPath();
    this.context.setLineDash([1000, 1000]);
    linePath.moveTo(sx, sy);
    linePath.lineTo(ex, ey);
    this.context.stroke(linePath);
    this.context.closePath();
    this.context.restore();

    return linePath;
  }
  circle({ x, y, radius, fillStyle }) {
    this.context.save();
    this.context.fillStyle = fillStyle || "black";
    this.context.beginPath();
    this.context.arc(x, y, radius || 1, 0, 2 * Math.PI);
    this.context.fill();
    this.context.restore();
  }
  rect({ x, y, w, h, fillStyle }) {
    this.context.save();
    this.context.fillStyle = fillStyle || "black";
    this.context.fillRect(x, y, w, h);
    this.context.restore();
  }

  redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  resizing() {
    const r = window.devicePixelRatio;
    console.log(r);
    this.canvas.width = this.canvas.parentNode.clientWidth * r;
    this.canvas.height = this.canvas.parentNode.clientHeight * r;
    // this.canvas.width = this.canvas.parentNode.clientWidth;
    // this.canvas.height = this.canvas.parentNode.clientHeight;
    this.canvas.style.display = "block";
    this.canvas.style.width = this.canvas.parentNode.clientWidth + "px";
    this.canvas.style.height = this.canvas.parentNode.clientHeight + "px";
    this.canvas.style.boxSizing = "border-box";
  }
  convertData() {
    return;
  }

  addEvent() {
    window.addEventListener(
      "resize",
      (e) => {
        this.resizing();
        this.redraw();
        this.convertedData = this.convertData(this.data);
      },
      false
    );
    // this.canvas.addEventListener(
    //   "mouseover",
    //   (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   },
    //   false
    // );
    // this.canvas.addEventListener(
    //   "mousemove",
    //   (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const cb = this.canvas.getBoundingClientRect();
    //     this.mx = (e.clientX - cb.left) * this.dpr;
    //     this.my = (e.clientY - cb.top) * this.dpr;
    //     this.convertedData.lineArr.map((el, i) => {
    //       const { linePath } = el;
    //       if (this.context.isPointInStroke(linePath, this.mx, this.my)) {
    //         this.convertedData.lineArr[i].strokeStyle = "red";
    //       } else {
    //         this.convertedData.lineArr[i].strokeStyle = "blue";
    //       }
    //     });

    //     this.redraw();
    //   },
    //   false
    // );
  }
  setThick(t = 20) {
    this.thick = t;
    this.redraw();
    return this;
  }
  mPosDist(cx, cy, dx, dy) {
    const diffX = dx - cx;
    const diffY = dy - cy;
    const d = Math.abs(Math.sqrt(diffX * diffX + diffY * diffY));
    return d;
  }
}
