// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCharts);

const resultChartOptions = {
  backgroundColor: { fill:'transparent' },
  width:'100%',
  height:80,
  legend: 'none',
  isStacked: true,
  hAxis: {
    textPosition: 'none',
    viewWindow:{
      max:100,
      min:0
    }
  },
  series: {
    0:{color:'#7db22e'},
    1:{color:'#d84762'}
  },
  'tooltip' : {
    trigger: 'none'
  }
}

const cantonChartOptions = {
  backgroundColor: { fill:'transparent' },
  width:'100%',
  height:80,
  legend: 'none',
  isStacked: true,
  hAxis: {
    textPosition: 'none',
    viewWindow:{
      max:23,
      min:0
    }
  },
  series: {
    0:{color:'#7db22e'},
    1:{color:'#d84762'}
  },
  'tooltip' : {
    trigger: 'none'
  }
}

const turnoutChartOptions = {
  backgroundColor: { fill:'transparent' },
  width:'100%',
  height: 80,
  legend: 'none',
  isStacked: true,
  hAxis: {
    textPosition: 'none',
    viewWindow:{
      max:100,
      min:0
    }
  },
  series: {
    0:{color:'#2d78b7'},
    1:{color:'#cfcfcf'}
  },
  'tooltip' : {
    trigger: 'none'
  }
}

const cantonResultsOptions = {
  region: 'CH',
  resolution: 'provinces',
  backgroundColor: 'transparent',
  datalessRegionColor: 'transparent',
  colorAxis: {
    values: [30,50,70],
    colors: ['#d84762','#ffffff','#7db22e']},
  tooltip: {
  }
}

const cantonTurnOutOptions = {
  region: 'CH',
  resolution: 'provinces',
  backgroundColor: 'transparent',
  datalessRegionColor: 'transparent',
  colorAxis: {
    values: [40,60],
    colors: ['#ffffff','#2d78b7']},
  tooltip: {
  }
}

function drawCharts(){
  resultCharts = document.getElementsByClassName("vote__results");
  cantonCharts = document.getElementsByClassName("vote__cantons");
  turnoutCharts = document.getElementsByClassName("vote__turnout");
  cantonResults = document.getElementsByClassName("canton_results");
  cantonTurnOut = document.getElementsByClassName("canton_turnOut");

  for(var i = 0; i < resultCharts.length; i++){
    let yes = parseInt(resultCharts.item(i).dataset.yes);
    let no = parseInt(resultCharts.item(i).dataset.no);

    let data = new google.visualization.arrayToDataTable([
      ['', '', { role: 'annotation' }, '', { role: 'annotation' }],
      ['Stimmen', yes, 'Ja (' + yes + '%)', no, 'Nein (' + no + '%)'],
    ]);

    let chart = new google.visualization.BarChart(resultCharts.item(i));
    chart.draw(data, resultChartOptions);
  }

  for(var i = 0; i < cantonCharts.length; i++){
    let yes = parseFloat(cantonCharts.item(i).dataset.yes);
    let no = parseFloat(cantonCharts.item(i).dataset.no);
    
    let data = new google.visualization.arrayToDataTable([
      ['', '', { role: 'annotation' }, '', { role: 'annotation' }],
      ['Stände', yes, 'Ja (' + yes + ')', no, 'Nein (' + no + ')'],
    ]);

    let chart = new google.visualization.BarChart(cantonCharts.item(i));
    chart.draw(data, cantonChartOptions);
  }

  for(var i = 0; i < turnoutCharts.length; i++){
    let percent = parseInt(turnoutCharts.item(i).dataset.percent);

    var data = new google.visualization.arrayToDataTable([
      ['', '', { role: 'annotation' }, '', { role: 'annotation' }],
      ['Beteiligung', percent, percent + '%', 100-percent, ''],
    ]);

    let chart = new google.visualization.BarChart(turnoutCharts.item(i));
    chart.draw(data, turnoutChartOptions);
  }

  for(var i = 0; i < cantonResults.length; i++){
    var cantonalValues = cantonResults.item(i).dataset.percent;
    var cantonalValues = cantonalValues.split(",");
    var data = google.visualization.arrayToDataTable([
        ['Canton','Ja in Prozent'],
        ['CH-AG', parseInt(cantonalValues[0])],
        ['CH-AR', parseInt(cantonalValues[1])],
        ['CH-AI', parseInt(cantonalValues[2])],
        ['CH-BL', parseInt(cantonalValues[3])],
        ['CH-BS', parseInt(cantonalValues[4])],
        ['CH-BE', parseInt(cantonalValues[5])],
        ['CH-FR', parseInt(cantonalValues[6])],
        ['CH-GE', parseInt(cantonalValues[7])],
        ['CH-GL', parseInt(cantonalValues[8])],
        ['CH-GR', parseInt(cantonalValues[9])],
        ['CH-JU', parseInt(cantonalValues[10])],
        ['CH-LU', parseInt(cantonalValues[11])],
        ['CH-NE', parseInt(cantonalValues[12])],
        ['CH-NW', parseInt(cantonalValues[13])],
        ['CH-OW', parseInt(cantonalValues[14])],
        ['CH-SH', parseInt(cantonalValues[15])],
        ['CH-SZ', parseInt(cantonalValues[16])],
        ['CH-SO', parseInt(cantonalValues[17])],
        ['CH-SG', parseInt(cantonalValues[18])],
        ['CH-TG', parseInt(cantonalValues[19])],
        ['CH-TI', parseInt(cantonalValues[20])],
        ['CH-UR', parseInt(cantonalValues[21])],
        ['CH-VS', parseInt(cantonalValues[22])],
        ['CH-VD', parseInt(cantonalValues[23])],
        ['CH-ZG', parseInt(cantonalValues[24])],
        ['CH-ZH', parseInt(cantonalValues[25])],
      ]);

    let chart = new google.visualization.GeoChart(cantonResults.item(i));
    chart.draw(data, cantonResultsOptions);
  }

  for(var i = 0; i < cantonTurnOut.length; i++){
    var cantonalValues = cantonTurnOut.item(i).dataset.percent;
    var cantonalValues = cantonalValues.split(",");
    var data = google.visualization.arrayToDataTable([
        ['Canton','Wahlbeteiligung'],
        ['CH-AG', parseInt(cantonalValues[0])],
        ['CH-AR', parseInt(cantonalValues[1])],
        ['CH-AI', parseInt(cantonalValues[2])],
        ['CH-BL', parseInt(cantonalValues[3])],
        ['CH-BS', parseInt(cantonalValues[4])],
        ['CH-BE', parseInt(cantonalValues[5])],
        ['CH-FR', parseInt(cantonalValues[6])],
        ['CH-GE', parseInt(cantonalValues[7])],
        ['CH-GL', parseInt(cantonalValues[8])],
        ['CH-GR', parseInt(cantonalValues[9])],
        ['CH-JU', parseInt(cantonalValues[10])],
        ['CH-LU', parseInt(cantonalValues[11])],
        ['CH-NE', parseInt(cantonalValues[12])],
        ['CH-NW', parseInt(cantonalValues[13])],
        ['CH-OW', parseInt(cantonalValues[14])],
        ['CH-SH', parseInt(cantonalValues[15])],
        ['CH-SZ', parseInt(cantonalValues[16])],
        ['CH-SO', parseInt(cantonalValues[17])],
        ['CH-SG', parseInt(cantonalValues[18])],
        ['CH-TG', parseInt(cantonalValues[19])],
        ['CH-TI', parseInt(cantonalValues[20])],
        ['CH-UR', parseInt(cantonalValues[21])],
        ['CH-VS', parseInt(cantonalValues[22])],
        ['CH-VD', parseInt(cantonalValues[23])],
        ['CH-ZG', parseInt(cantonalValues[24])],
        ['CH-ZH', parseInt(cantonalValues[25])],
      ]);

    let chart = new google.visualization.GeoChart(cantonTurnOut.item(i));
    chart.draw(data, cantonTurnOutOptions);
  }

  loading = document.getElementById("loading");
  loading.setAttribute("style", "display: none");
}
