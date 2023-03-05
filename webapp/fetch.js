setInterval(function() {
  const lineCanvas = document.getElementById("lineCanvas");
  const lineChart = new Chart(lineCanvas, {
    type: "line",
    data: {
        labels: ["T-7", "T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "T"],
        datasets: [{
            label: "Temperature",
            data: [240,120,140,130,122,182,79,81],
            borderColor: "green",
            backgroundColor: "lightgreen",
        },
        {
            label: "Humidity",
            data: [28,47,141,72,121,109,175,97],
            borderColor: "crimson",
            backgroundColor: "red",
        },
        {
          label: "Pressure",
          data: [997,1012,1014,986,980,1001,1013,970],
          borderColor: "blue",
          backgroundColor: "lightblue",
        },
        {
          label: "VPD",
          data: [543,722,615,621,599,701,775,804],
          borderColor: "cyan",
          backgroundColor: "darkcyan",
        },
        {
          label: "Dew point",
          data: [439,362,364,358,392,417,492,426],
          borderColor: "darkorchid",
          backgroundColor: "darkmagenta",
        }]
    },
    options: {
      tension: 0.3
    }
});
}, 2000);

setInterval(function() {
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

      }
    };
    xhr.send();
  }, 2000);