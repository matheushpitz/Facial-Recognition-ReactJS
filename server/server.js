const BodyParser = require('body-parser');
const fs = require('fs');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

module.exports = function(app, port) {

	function createTempImage(base64Image, callback) {
		// get the image data and extension.
		let dataFile = base64Image.split(';base64,');
		dataFile[0] = dataFile[0].split('/').pop();
		// generate filename.
		let filename = 'temp_'+((new Date()).getTime())+'.'+dataFile[0];
		// save the image temp.
		fs.writeFile('./temp/'+filename, dataFile[1], {encoding: 'base64'}, function(err) {
			if(err) {
				console.log('Error when create file.');
			} else {				
				console.log('File created '+filename);
				// call the callback
				callback(filename);
			}
		});	
	}
	
	function doDetectFaces(base64Image, callback) {
		// create the temp.
		createTempImage(base64Image, (filename) => {
			// initialize recognition instance.
			let visualRecognition = new VisualRecognitionV3({
				version: '2018-03-19',
				iam_apikey: process.env.IAM_APIKEY
			});				
			// instance parameters.
			let params = {
				images_file: fs.createReadStream('./temp/'+filename)
			};
			// call the API.
			visualRecognition.detectFaces(params, (err, res) => {
				if(err) {
					console.log(err);
				} else {
					// call the callback
					callback(res);	
					// remove the temp.
					fs.unlink('./temp/'+filename, (err) => {
						if(err != undefined)
							console.log('Error on remove temp file.');
					});
				}
			});
		});
	}
	
	// Allow CORS.
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if(req.method === 'OPTIONS') {
			res.status(200).send('success');
			return;
		}
		next();
	});
	
	app.use(BodyParser.json({limit: '10mb'}));
	app.use(BodyParser.urlencoded( {limit: '10mb', entended: true} ));
	
	app.post('', (req, res) => {
		// Detect faces API.
		doDetectFaces(req.body.image, (response) => {
			// send the response.
			res.send(response);
		});		
	});
	
	app.listen(port, () => console.log(`Listening on port ${port}`));
}