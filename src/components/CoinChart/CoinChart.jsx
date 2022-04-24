import axios from "axios";
import React, { useState, useLayoutEffect, useContext } from "react";
import './CoinChart.css'
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";
import RingLoading from "../Loading/RingLoading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/ChartDays";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ coin, id }) => {
  const { currencyValue, symbol } = useContext(CurrencyContext);

  const [days, setDays] = useState(1);
  const [chart, setChart] = useState();

  const fetchChartData = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currencyValue}&days=${days}`
    );

    setChart(data.prices);
  };

  useLayoutEffect(() => {
    fetchChartData();   
  }, [currencyValue, days]);

  return (
    <div>
      {!chart ? (
        <RingLoading />
      ) : (
        <Line
          data={{
            labels: chart.map((coin) => {
              let date = new Date(coin[0]);

              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: chart.map((coin) => coin[1]),
                label: `Price (past ${days} days) in ${currencyValue} ${symbol}${
                  coin.market_data?.current_price &&
                  coin.market_data.current_price[
                    currencyValue.toLowerCase()
                  ].toLocaleString()
                }`,
                borderColor: "#c29b0c",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
      <div className="chartBtns">
          {
              chartDays.map(day => {
                  return <button key={day.value} className="chartBtn" onClick={() => setDays(day.value)}>{day.label}</button>
              })
          }
      </div>
    </div>
  );
};

export default CoinChart;
