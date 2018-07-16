require('webduino-js');
require('webduino-blockly');

var dht, myData, pir;

function get_date(t) {
  var varDay = new Date(),
    varYear = varDay.getFullYear(),
    varMonth = varDay.getMonth() + 1,
    varDate = varDay.getDate();
  var varNow;
  if (t == "ymd") {
    varNow = varYear + "/" + varMonth + "/" + varDate;
  } else if (t == "mdy") {
    varNow = varMonth + "/" + varDate + "/" + varYear;
  } else if (t == "dmy") {
    varNow = varDate + "/" + varMonth + "/" + varYear;
  } else if (t == "y") {
    varNow = varYear;
  } else if (t == "m") {
    varNow = varMonth;
  } else if (t == "d") {
    varNow = varDate;
  }
  return varNow;
}

function get_time(t) {
  var varTime = new Date(),
    varHours = varTime.getHours(),
    varMinutes = varTime.getMinutes(),
    varSeconds = varTime.getSeconds();
  var varNow;
  if (t == "hms") {
    varNow = varHours + ":" + varMinutes + ":" + varSeconds;
  } else if (t == "h") {
    varNow = varHours;
  } else if (t == "m") {
    varNow = varMinutes;
  } else if (t == "s") {
    varNow = varSeconds;
  }
  return varNow;
}

/* Main */
boardReady({
  board: '', 
  device: '', 
  transport: 'mqtt'
}, 
function (board) {
  board.systemReset();
  board.samplingInterval = 500;
  dht = getDht(board, 14);
  pir = getPir(board, 8);
  myData = {};
  myData.sheetUrl = 'GOOGLE-SHEETS-URL';
  myData.sheetName = 'SHEET-NAME';
  dht.read(function(evt){
    //console.log(['溫度：',dht.temperature,'度<br>濕度：',dht.humidity,'%<br>'].join(''));
    myData.column0 = get_date("ymd");
    myData.column1 = get_time("hms");
    myData.column2 = '房間';
    myData.column3 = dht.temperature;
    myData.column4 = dht.humidity;
    writeSheetData(myData);
  }, 10000);
});
