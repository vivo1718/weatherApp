import './App.css';
import { useState,useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the component
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { faDroplet, faSun, faUmbrella, faTemperatureThreeQuarters, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactSpeedometer from "react-d3-speedometer"
import {  Form, Button, Alert, Card } from 'react-bootstrap';

// Register required Chart.js components

import axios from 'axios';
function App() {
  const [city,setCity] = useState('');
  const now = 66;
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = '90fd1da48be08c5f4b96b5b6d6e68943';
  const [weatherData, setWeatherData] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const text = "Enter your city name..."; 
  const [chartData, setChartData] = useState(null);
  const getWeather = async () => {
    if (!city.trim()) {
        setError('Please enter a city name');
        setWeather(null);
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        setWeather(data);
        setError('');
    } catch (err) {
        setError(err.message);
        setWeather(null);
    }
};
  const handleCityChange = (e)=>{
    setCity(e.target.value);
  };

  const [time, setTime] = useState("");
  const labels = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [10, 11, 12, 13, 14, 15, 16, 18, ],
        fill: true,
        backgroundColor: '#1C56C8',
        borderColor: '#1C56C8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Function to format current time as HH:MM
    const getCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    // Set the initial time
    setTime(getCurrentTime());

    // Update time every minute
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000); // 60000ms = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
 

  

  useEffect(() => {
    let currentIndex = 0;

    const typeWriterEffect = () => {
      if (currentIndex < text.length) {
        setPlaceholder((prev) => prev + text[currentIndex]);
        currentIndex += 1;
        setTimeout(typeWriterEffect, 150); // Adjust typing speed (150ms per character)
      }
    };

    typeWriterEffect(); // Start typing effect

    // Clean up the timeout on component unmount
    return () => {
      currentIndex = text.length; // Stop typing if the component unmounts
    };
  }, [text]);
  const fetchWeatherData = async ()=>{
    if(city === '') return ;
    const apiKey = '90fd1da48be08c5f4b96b5b6d6e68943';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    try{
      const response = await axios.get(url);
      setWeatherData(response.data);
    }
    catch(error){
      alert.alert("Error","Unable to fetch Weather data");
      console.error("Error fetching data",error);
    }
    

  }
  return (
    
      
        <div className="App">
      <Row className="row1">
        <Col  md={3} className="col1">
        <div>
          <Col>
          <Row className='row2'>
          <Col><FontAwesomeIcon icon={faSquarePlus} color="white" size="1x" ></FontAwesomeIcon></Col>
          <Col><FontAwesomeIcon icon={faSquarePlus} color="white" size="1x" ></FontAwesomeIcon></Col>
          <Col> <p className="time">{time}</p></Col>
          </Row>
          <h2>Weather Glimpse</h2>
          <p className="subtitle">WeatherWise is your go-to app for accurate, real-time weather updates tailored to your location. With an intuitive interface and a sleek design, this app makes staying informed about weather conditions easier than ever. Whether you’re planning your day, heading out for a trip, or simply curious about the climate in different cities, WeatherWise has you covered.</p>
          <div><Form className="d-flex mt-3" onSubmit={(e) => { e.preventDefault(); getWeather(); }}>
                <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="me-2"
                />
                <Button variant="primary" onClick={getWeather}>
                    Search
                </Button>
            </Form>
            <br></br>
            </div>
            {weather && ( <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.description} 
      />)}
            {weather && (<h2 className="degree">{weather.main.temp}ºC</h2>)}
          { weather && (  <h4 className="wd">{weather.weather[0].description}</h4>)}
          </Col>
        </div>
        </Col>
        <Col className="col2" md ={9} sm={12}>
        <p className="title-col2">Welcome to weatherapp</p>
        <p className="title-col3">Check out todays weather forcast information</p>
        <div className="line"><Line data={data} options={options} /></div> 
         <p className='more'>More details of todays weather</p>
        
 <Row>
          <Col lg={4}md={6}sm={12}>
          <div className="boxes">
          <Row className="box_1">
              <Col><p>Humidity</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faDroplet} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            <br></br>
           {weather &&( <ProgressBar now={weather.main.humidity} label={`${weather.main.humidity}%`} />)}
            
          </div>
          
          </Col>
          <Col lg={4}md={6}sm={12} ><div className="boxes">
            <Col>
            <Row className="box_1">
              <Col><p>Wind</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faWind} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            { weather && (<div className="speed"><ReactSpeedometer
                  maxValue={100}
                  value={weather.main.temp}
                  height={90}
                  width={200}
                  ringWidth={20}
                  needleHeightRatio={0.5}
                  needleColor="#1E3E62"
                  startColor="green"
                  segments={4}
                  endColor="red"
              /></div>)}
            <div>
              
            </div>
            </Col>
            </div></Col>
          <Col lg={4}md={6}sm={12}><div className="boxes">
          <Row className="box_1">
              <Col><p>Pressure</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faSnowflake} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            <br></br>
            {weather && (<div className="feels"><h2>{weather.main.pressure}</h2></div>)}
            </div></Col>
         </Row>
         <br></br>
        <Row> 
        <Col lg={4}md={6}sm={12}><div className="boxes"><Row className="box_1">
              <Col><p>UV-Index</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faSun} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            <br></br>
            {weather && (<div className="feel"><h2>{weather.uvi}</h2></div>)}
            
            </div>
            </Col>
          <Col lg={4}md={6}sm={12}><div className="boxes"><Row className="box_1">
              <Col><p>Dew Point</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faUmbrella} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            <br></br>
            {weather && (<div className="feels"><h2>{weather.main.dew_point}</h2></div>)}
            
            </div>
            </Col>
          <Col  lg={4}md={6}sm={12}><div className="boxes"><Row className="box_1">
              <Col><p>Feels Like</p></Col>

              <Col><div className="icon_d"><FontAwesomeIcon icon={faTemperatureThreeQuarters} color="#fff" size="1x" ></FontAwesomeIcon></div></Col>

            </Row>
            <br></br>
            {weather && (<div className="feels"><h2>{weather.main.feels_like}</h2></div>)}
            </div>
            
            </Col>
        </Row>
        </Col>
      </Row>
      </div>
      
      
      
    
  );
  
}

export default App;
