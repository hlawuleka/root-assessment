import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const xAxisLabels = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const xAxisGrid = Array(16).fill("x");
  const yAxisGrid = [...xAxisLabels];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const [parkData, setparkData] = useState([]);

  const fetchParkData = async () => {
    console.log("Making call...");
    const requestParkData = (
      await axios.get("https://dinoparks.net/nudls/feed")
    ).data;
    console.log("After call...");
    setparkData(requestParkData);
    return requestParkData;
  };

  useEffect(() => {
    // console.log(fetchParkData());
  }, []);

  return (
    <>
      <div className="logo">
        <img src="dinoparks-logo.png" alt="logo'" />
      </div>
      <div className="grid-parent--container">
        <div className="grid-header">
          <div className="park-name">Park Zones</div>
          <div className="date-label">
            {new Date().getDate() +
              " " +
              month[new Date().getMonth()] +
              " " +
              new Date().getFullYear()}
          </div>
        </div>
        <div className="grid-container">
          <div className="y-axis-label">
            {xAxisGrid.map((axixLabel, index) => (
              <div>{index + 1}</div>
            ))}
          </div>
          <div className="parent-grid">
            {yAxisGrid.map((outer, index) => (
              <>
                <div>
                  {xAxisGrid.map((inner, innerIndex) => (
                    <div
                      className={`grid-x-axis ${
                        (index === 8 && innerIndex === 3) ||
                        (index === 4 && innerIndex === 2)
                          ? "safe"
                          : ""
                      } ${index === 12 && innerIndex === 1 ? "unsafe" : ""} ${
                        index === 4 && innerIndex === 2
                          ? "needs--maintenance"
                          : ""
                      }`}
                    >
                      {index === 4 && innerIndex === 2 && (
                        <img src="dino-parks-wrench.png" alt="logo'" />
                      )}
                    </div>
                  ))}
                  <span className="x-axis-label">{outer.toUpperCase()}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
