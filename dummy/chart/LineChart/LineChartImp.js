import baseChart from "../core/base";

export default class lineChart extends baseChart {
  constructor(canvas, config = { offset: { t: 10 } }) {
    super(canvas);
    this.title = config.title || "";
    this.xAxisConfig = {
      lineWidth: 2,
      grid: { display: true, count: 10 },
      ...config.xAxis,
    };
    this.yAxisConfig = config.yAxis || {
      lineWidth: 2,
      grid: { display: true, count: 10 },
    };
    this.yGridDraw = config.yGrid || true;
    this.xThickDraw = config.xThick || true;
    this.yThickDraw = config.yThick || true;
    this.offsetT = (config.offset && config.offset.t) || 10;
    this.offsetR = (config.offset && config.offset.r) || 10;
    this.offsetB = (config.offset && config.offset.b) || 10;
    this.offsetL = (config.offset && config.offset.l) || 10;
    this.circleRadius = (config.cicle && config.cicle.r) || 5;
    this.options = config.options || { title: { fontSize: "16px" } };
    this.data = config.data || [];

    this.a = 0;
  }
  init() {
    this.resizing();
    this.convertedData = this.convertData(this.data);
    this.redraw();
    this.addEvent();

    window.requestAnimationFrame(() => {
      this.update();
    });

    return this;
  }
  redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.title &&
      this.text({
        text: this.title,
        x: this.canvas.width / 2,
        y: this.offsetT / 2,
        fontSize: this.options.title.fontSize,
      });
    // console.log(convertedData);
    this.xAxis();
    this.yAxis();
    this.yAxisConfig.grid.display && this.xGrid(this.convertedData);
    this.xAxisConfig.grid.display && this.yGrid(this.convertedData);
    this.xThickDraw && this.xThick(this.convertedData);
    this.yThickDraw && this.yThick(this.convertedData);
    this.graphDraw();
  }
  update() {
    this.a += 1;
    // window.requestAnimationFrame(() => {
    //   this.update();
    // });
  }

  graphDraw() {
    this.convertedData.lineArr.map((el, i) => {
      this.convertedData.lineArr[i]["linePath"] = this.line(el);
    });
    this.convertedData.circleArr.map((el) => {
      this.circle(el);
      if (el.annotation && el.annotation.text) {
        this.text({
          text: el.annotation.text,
          x: el.x,
          y: el.y - 10,
          fontSize: "10px",
        });
      }
    });
    this.convertedData.xTextArr.map((el) => {
      this.text(el);
    });
    this.convertedData.yTextArr.map((el) => {
      this.text(el);
    });
  }

  xAxis() {
    this.line({
      sx: this.offsetL,
      sy: this.canvas.height - this.offsetB,
      ex: this.canvas.width - this.offsetR,
      ey: this.canvas.height - this.offsetB,
      lineWidth: this.xAxisConfig.lineWidth || 2,
    });
  }
  yAxis() {
    this.line({
      sx: this.offsetL,
      sy: this.offsetT,
      ex: this.offsetL,
      ey: this.canvas.height - this.offsetB,
      lineWidth: this.yAxisConfig.lineWidth || 2,
    });
  }
  yGrid(data = [], strokeStyle = "gray") {
    const cnt = data.xArr.length;
    for (var i = 1; i <= cnt; i++) {
      this.line({
        sx:
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * i -
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * 0.5,
        sy: this.offsetT,
        ex:
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * i -
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * 0.5,
        ey: this.canvas.height - this.offsetB,
        lineWidth: 0.5,
        strokeStyle: strokeStyle,
        globalAlpha: 0.5,
      });
    }
  }
  xGrid(strokeStyle = "gray") {
    const cnt = this.yAxisConfig.grid.count;
    for (var i = 1; i <= cnt; i++) {
      this.line({
        sx: this.offsetL,
        sy:
          this.canvas.height -
          this.offsetB -
          ((this.canvas.height - this.offsetB - this.offsetT) / cnt) * i,
        ex: this.canvas.width - this.offsetR,
        ey:
          this.canvas.height -
          this.offsetB -
          ((this.canvas.height - this.offsetB - this.offsetT) / cnt) * i,
        lineWidth: 0.2,
        strokeStyle: strokeStyle,
        globalAlpha: 0.5,
      });
    }
  }
  yThick(strokeStyle = "gray") {
    const cnt = this.yAxisConfig.grid.count;
    for (var i = 1; i <= cnt; i++) {
      this.line({
        sx: this.offsetL,
        sy:
          this.canvas.height -
          this.offsetB -
          ((this.canvas.height - this.offsetB - this.offsetT) / cnt) * i,
        ex: this.offsetR - this.thick,
        ey:
          this.canvas.height -
          this.offsetB -
          ((this.canvas.height - this.offsetB - this.offsetT) / cnt) * i,
        lineWidth: 1,
        strokeStyle: strokeStyle,
        globalAlpha: 0.5,
      });
    }
  }
  xThick(data = [], strokeStyle = "gray") {
    const cnt = data.xArr.length;
    for (var i = 1; i <= cnt; i++) {
      this.line({
        sx:
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * i -
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * 0.5,
        sy: this.canvas.height - this.offsetB,
        ex:
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * i -
          ((this.canvas.width - this.offsetL - this.offsetR) / cnt) * 0.5,
        ey: this.canvas.height - this.offsetB + this.thick,
        lineWidth: 1,
        strokeStyle: strokeStyle,
        globalAlpha: 0.5,
      });
    }
  }
  convertData(data) {
    const circleArr = [],
      lineArr = [],
      xTextArr = [],
      yTextArr = [];
    if (data === []) {
      return {
        xArr: [],
        yArr: [],
        circleArr: [],
        lineArr: [],
        xTextArr: [],
        yTextArr: [],
      };
    } else {
      const xArr = data.map((e) => e.x);
      const yArr = data.map((e) => e.y);
      const { range, step } = this.yArange(yArr);
      console.log(this.canvas.height - this.offsetT);
      const yScale = this.scale(range, [
        this.canvas.height - this.offsetB,
        this.offsetT,
      ]);

      for (var e = 0; e < data.length; e++) {
        const v = data[e];
        let xp =
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / xArr.length) *
            (e + 1) -
          ((this.canvas.width - this.offsetL - this.offsetR) / xArr.length) *
            0.5;

        const cy = yScale.get(v.y);
        circleArr.push({
          x: xp,
          y: cy,
          radius: this.circleRadius,
          fillStyle: "blue",
          annotation: { text: v.y },
        });

        xTextArr.push({
          text: v.x,
          x: xp,
          y: this.canvas.height - this.offsetB + this.thick + 10,
        });

        if (e === data.length - 1) {
          break;
        }
        let nxp =
          this.offsetL +
          ((this.canvas.width - this.offsetL - this.offsetR) / xArr.length) *
            (e + 2) -
          ((this.canvas.width - this.offsetL - this.offsetR) / xArr.length) *
            0.5;
        const nextV = data[e + 1];
        lineArr.push({
          sx: xp,
          sy: cy,
          ex: nxp,
          ey: yScale.get(nextV.y),
          lineWidth: 2,
          strokeStyle: "blue",
          globalAlpha: 0.5,
        });
      }
      for (var i = 0; i < this.yAxisConfig.grid.count + 1; i++)
        yTextArr.push({
          text: Math.max(...range) - step * i,
          x: this.offsetL - this.thick - 20,
          y:
            this.offsetT +
            ((this.canvas.height - this.offsetB - this.offsetT) /
              this.yAxisConfig.grid.count) *
              i,
        });

      return {
        xArr: xArr,
        yArr: yArr,
        circleArr: circleArr,
        lineArr: lineArr,
        xTextArr: xTextArr,
        yTextArr: yTextArr,
      };
    }
  }
  yArange(arr = [], init) {
    if (arr === [] || !arr) {
      return arr;
    }
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const maxLength = String(max).length;
    const minLength = String(min).length;
    const maxCeil =
      Math.ceil(max / 10 ** (maxLength - 2)) * 10 ** (maxLength - 2);
    const minFloor =
      init || init === 0
        ? init
        : Math.floor(min / 10 ** (minLength - 2)) * 10 ** (minLength - 2);
    console.log(init, arr, minFloor);
    const diffMaxMin = maxCeil - minFloor;

    return {
      range: [minFloor, maxCeil],
      step: diffMaxMin / this.yAxisConfig.grid.count,
    };
  }
}
