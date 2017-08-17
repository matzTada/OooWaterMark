var fs = require('fs');
var randomWords = require('random-words');

//main
var outputFilePath = "../WaterMarkGUI/public/json_after/output.json";
var outputPrevFilePath = "../WaterMarkGUI/public/json_prev/output_prev.json";
var data = {
  detected_watermark: '',
  extract_bits: '',
	data_list: []
};

setInterval(function(){

  var newWard = randomWords() + randomWords();
  newWard = newWard.substring(0, 4);
  data.detected_watermark = newWard;

  var newWardBinStr = '';
  for (var i = 0; i < newWard.length; i++) {
    if (newWard.charCodeAt(i).toString(2).length > 8) newWardBinStr += ('0000000000000000' + newWard.charCodeAt(i).toString(2)).slice(-16);
    else newWardBinStr += ('00000000' + newWard.charCodeAt(i).toString(2)).slice(-8);
  }
  data.extract_bits = newWardBinStr;

  var newDataList = [];
  for (var i = 0; i < newWardBinStr.length; i++){
    newDataList.push(Math.random());
  }
  data.data_list = newDataList;

  console.log(JSON.stringify(data, null, '  '));
  console.log(write(outputFilePath, JSON.stringify(data, null, '  ')));

  newWardBinStr = '';
  for (var i = 0; i < newWard.length * 8; i++) newWardBinStr += '0';
  data.extract_bits = newWardBinStr;
  data.detected_watermark = '    ';
  console.log(write(outputPrevFilePath, JSON.stringify(data, null, '  ')));

}, 1000);


//functions
function write(filePath, stream) {
  var result = false;
  try {
    fs.writeFileSync(filePath, stream);
    return true;
  } catch(err) {
    return false;
  }
}

