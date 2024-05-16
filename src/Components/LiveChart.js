//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import { useEffect, useState } from "react";
import axios from "axios";
import FormatChart from "./FormatChart";
import ReactApexChart from "react-apexcharts";

// const apiKey=process.env.key
//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
function LiveChart ({symbol}) {
    const url=`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${"IBM"}&interval=5min&apikey=demo`;
    const [stockData,setStockData] = useState({});
    
    async function fetchStockData(symbol) {
        try {
            const { data } = await axios.get(url);
            const timeSeriesData = data["Time Series (5min)"];
            setStockData(timeSeriesData);
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
    }
    useEffect(()=>{
        fetchStockData(symbol);
    },[]);
    
    const candleStickOptions = {
        chart: {
            type: "candlestick",
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };
    const plotData = FormatChart({stockData});
    return (
        <ReactApexChart
            series={
                [
                    {
                        data: plotData
                    }
                ]
            }
            options={candleStickOptions}
            type="candlestick"
        />
    );
}

export default LiveChart;