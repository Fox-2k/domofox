import { useEffect, useRef, useState } from "react";
import Block from "./block";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { getTraces } from "@/features/traces/tracesSlice";
import { useAppSelector } from "@/hooks";

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export default function Graph() {
  const chartRef = useRef<ChartJS<'line', { x: string, y: number }[]>>(null);
  const traces = useAppSelector(getTraces)
  const [chartData, setChartData] = useState<ChartData<'line', { x: string, y: number }[]>>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'line'>>({} as ChartOptions);
  const [gradients, setGradients] = useState<{ orangeGradient?: CanvasGradient, redGradient?: CanvasGradient }>({});


  useEffect(() => {

    const ctx = chartRef.current?.ctx;
    if (!ctx) return;

    const orangeGradient = ctx.createLinearGradient(0, 25, 0, 256);
    orangeGradient.addColorStop(0, 'rgba(255, 99, 132, 0.8)');
    orangeGradient.addColorStop(1, 'orange');
    const redGradient = ctx.createLinearGradient(0, 25, 0, 256);
    redGradient.addColorStop(0, 'rgba(255, 50, 90, 0.8)');
    redGradient.addColorStop(1, 'red');

    setGradients({
      orangeGradient,
      redGradient
    })

  }, []);

  useEffect(() => {
    setChartData({
      datasets: [
        {
          label: 'Setpoint',
          data: traces.SETPOINT,
          borderColor: 'white',
          borderWidth: 1,
          stepped: true,
          pointRadius: 0,
          pointHitRadius: 10,
        },
        {
          label: 'Heater',
          data: traces.HEATER,
          borderColor: 'red',
          backgroundColor: gradients.redGradient ?? 'red',
          borderWidth: 1,
          stepped: true,
          pointRadius: 0,
          pointHitRadius: 10,
          fill: true,
          yAxisID: 'yheaterAxis'
        },
        {
          label: 'T°',
          data: traces.AVG_TEMP,
          backgroundColor: gradients.orangeGradient ?? 'orange',
          borderColor: 'orange',
          borderWidth: 0,
          tension: 0.3,
          pointRadius: 0,
          pointHitRadius: 10,
          fill: true,
        },
      ]
    })

    setChartOptions({
      responsive: true,
      interaction: {
        mode: "index" as "index",
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: "time" as "time",
          min: DateTime.now().minus({ hours: 24 }).valueOf(),
          time: {
            //   unit: 'hour',
            parser: (value: unknown) => DateTime.fromSQL(value as string).valueOf(),
            displayFormats: {
              minute: "H'h'",
              hour: "H'h'",
              day: "dd/MM"
            }
          },
          ticks: {
            color: "rgba(200,200,200)",
          },
          grid: {
            color: "rgba(255,255,255,0.05)"
          }
        },
        y: {
          min: Math.min(...traces.AVG_TEMP.map(t => t.y)) - 1,
          max: Math.max(...traces.AVG_TEMP.map(t => t.y)) + 1,
          ticks: {
            color: "rgba(200,200,200)",
          },
          grid: {
            color: "rgba(255,255,255,0.25)"
          }
        },
        yheaterAxis: {
          min: 0,
          max: 10,
          display: false,
          ticks: {
            color: "rgba(200,200,200)",
          },
          grid: {
            color: "rgba(255,255,255,0.25)"
          }
        }
      }
    })

  }, [traces]);


  return (
    <Block width={420} icon={<ShowChartIcon />} sx={{ pt: 3 }}>
      <Line ref={chartRef} data={chartData} options={chartOptions} width="388" height="140" />
    </Block>
  )
}
