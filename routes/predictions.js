var express = require('express');
var router = express.Router();
var childProcess = require('child_process'),
     jav;

router.get('/', function(req, res, next) {
  
  var idModel = req.query.idModel,
    predResult;

  jav = childProcess.exec('java -jar C:\\Users\\AegisLabs\\irfan-db\\Dropbox\\THESIS\\c0d3\\TwitterPredictionWithSVR\\dist\\TwitterPredictionWithSVR.jar '+idModel+' jml_respon_pertahap timestamp', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }

    predResult = JSON.parse(stdout);
    res.json(predResult);
  });

  jav.on('exit', function (code) {
    console.log('Child process exited with exit code '+ code);
    //res.send(predResult);
  });
});

router.get('/listHashtag', function(req, res, next){

  var idUser = req.query.idUser;

  var UserHashtag = [
    [{'id' : 999, 'label' : 'pilih tagar', 'id' : 0, 'label' : '#bebasLembab', 's' : '02:06:33', 'e': ' 02:56:33'}, {'id' : 3, 'label' : '#hostForInfinity', 's': '13:27:53', 'e': '14:17:53'}],
    [{'id' : 999, 'label' : 'pilih tagar', 'id' : 1, 'label' : '#pestaKeluargaErtiga', 's': '16:48:25', 'e': '17:38:25'}],
    [{'id' : 999, 'label' : 'pilih tagar', 'id' : 2, 'label' : '#jkw4p', 's' : '18:11:58', 'e' : '19:01:58'}],
    [{'id' : 999, 'label' : 'pilih tagar', 'id' : 4, 'label' : '#happynest', 's' : '19:49:50', 'e' : '20:39:50'}]
  ]

  res.json(UserHashtag[idUser]);
});

module.exports = router;
