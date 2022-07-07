import React, { useEffect, useRef } from "react";
import Layout from "@components/layout";
import styled from "styled-components";
import lineChart from "./LineChartImp";
import axios from "axios";
const Div = styled.div`
  width: 600px;
  height: 300px;
  border: 1px solid black;
`;
const Canvas = styled.canvas`
  // width: 100%;
  // height: 100%;
  // box-sizing: border-box;
  // display: block;
`;

const LineChart = () => {
  const wrapperRef = useRef();
  const canvasRef = useRef();
  console.log();
  useEffect(() => {
    axios
      .get("http://192.168.1.100:5000/api/visualize/academy/getYearCnt", {
        headers: { Authorization: "alkcn122123qalkn3jnvjel34tj79g3sajsnck678" },
      })
      .then((resp) => {
        const { data } = resp.data;
        const labels = [];
        const datasets = [
          {
            label: "학원 수",
            data: [],
            fill: false,
            borderColor: "#1976de", // Add custom color border (Line)
            backgroundColor: "#1976de", // Add custom color background (Points and Fill)
            borderWidth: 1,
            datalabels: {
              labels: {
                value: {
                  color: "#1976de",
                },
              },
            },
          },
        ];
        const nw = data.map((d) => {
          const no = {};
          labels.push(d["year"]);
          datasets[0].data.push(d["count"]);
          no["x"] = d["year"];
          no["y"] = d["count"];
          return no;
        });

        const canvas = canvasRef.current;
        const bc = new lineChart(canvas, {
          title: "연도별 학원 수",
          data: nw,
          offset: { t: 48, r: 50, b: 50, l: 50 },
          xAxis: {
            lineWidth: 0.5,
          },
          yAxis: {
            lineWidth: 0.5,
            grid: {
              display: false,
              count: 8,
            },
          },
          options: {
            title: {
              fontSize: "18px",
            },
          },
        });
        bc.init();
        myChart(wrapperRef.current.getContext("2d"), datasets, labels);
      });
  }, []);
  return (
    <Layout>
      <Div>
        <Canvas id="lineChart" ref={canvasRef}></Canvas>
      </Div>
      <Div>
        <Canvas id="lineChart" ref={wrapperRef}></Canvas>
      </Div>
    </Layout>
  );
};

export default LineChart;

const data = [
  {
    x: "2015",
    y: 8521,
  },
  {
    x: "2016",
    y: 10000,
  },
  {
    x: "2017",
    y: 11000,
  },
  {
    x: "2018",
    y: 10000,
  },
  {
    x: "2019",
    y: 10000,
  },
  {
    x: "2020",
    y: 10000,
  },
  {
    x: "2021",
    y: 21563,
  },
  {
    x: "2022",
    y: 13500,
  },
];
Chart.register(ChartDataLabels);
const myChart = (ctx, datasets, labels = []) => {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      plugins: {
        datalabels: {
          clip: false,
          dispaly: "auto",
          anchor: "start",
          align: "end",
          clamp: true,
          /* formatter */
          formatter: function (value, context) {
            console.log(value);
            if (context.dataIndex % 2 == 0) {
              value = "";
            }
            return value.toLocaleString();
          },
        },
      },

      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var tooltipValue =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return parseInt(tooltipValue).toLocaleString();
          },
        },
      },
      scales: {},
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
    },
  });
};
