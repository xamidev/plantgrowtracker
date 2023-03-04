setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'bme.txt', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var measures = xhr.responseText.split('\n\n');
        var lastMeasures = measures[measures.length - 1];
        lastMeasures = lastMeasures.split('\n');
        document.getElementById('temperature').innerHTML = lastMeasures[lastMeasures.length - 5]
        document.getElementById('pressure').innerHTML = lastMeasures[lastMeasures.length - 4]
        document.getElementById('humidity').innerHTML = lastMeasures[lastMeasures.length - 3]
      }
    };
    xhr.send();
  }, 2000);