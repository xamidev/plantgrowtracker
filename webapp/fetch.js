var temperaturesArray = [];
var pressuresArray = [];
var humidityArray = [];
var vpdArray = [];
var dewPointArray = [];

setInterval(function() {

    /* Get data from the log file */
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bme.txt', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var measures = xhr.responseText.split('\n\n');
        var lastMeasures = measures[measures.length - 1];
        lastMeasures = lastMeasures.split('\n');
        document.getElementById('temperature').innerHTML = lastMeasures[0]
        document.getElementById('pressure').innerHTML = lastMeasures[1]
        document.getElementById('humidity').innerHTML = lastMeasures[2]
        document.getElementById('airvpd').innerHTML = lastMeasures[3]
        document.getElementById('leafvpd').innerHTML = lastMeasures[4]
        document.getElementById('dewpoint').innerHTML = lastMeasures[5]
        
        /* Chart.js : data fetching for chart curves */

        temperaturesArray.push(lastMeasures[0].slice(0,-3));
        humidityArray.push(lastMeasures[2].slice(0,-2));
        /* pressuresArray.push(lastMeasures[1].slice(0,-4)); */
        vpdArray.push(lastMeasures[3].slice(0,-4));
        dewPointArray.push(lastMeasures[5].slice(0,-3));

        /* Drawing the chart */

        const lineCanvas = document.getElementById("lineCanvas");
        const lineChart = new Chart(lineCanvas, {
          type: "line",
          data: {
              labels: ["T-7", "T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "T"],
              datasets: [{
                  label: "Temperature",
                  data: temperaturesArray,
                  borderColor: "green",
                  backgroundColor: "lightgreen",
              },
              {
                  label: "Humidity",
                  data: humidityArray,
                  borderColor: "crimson",
                  backgroundColor: "red",
              },
              /*{
                label: "Pressure",
                data: pressuresArray,
                borderColor: "blue",
                backgroundColor: "lightblue",
              },*/
              {
                label: "VPD",
                data: vpdArray,
                borderColor: "cyan",
                backgroundColor: "darkcyan",
              },
              {
                label: "Dew point",
                data: dewPointArray,
                borderColor: "darkorchid",
                backgroundColor: "darkmagenta",
              }]
          },
          options: {
            tension: 0.3
          }
        });
      }
    };
    xhr.send();
}, 2000);