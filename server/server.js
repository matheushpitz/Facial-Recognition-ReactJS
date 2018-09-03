const bodyParser = require('body-parser');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const temp = require('./TempHandle');

module.exports = (app, port) => {
    // Start TempHandle
    temp.startTempHandle();
	
	function doDetectFaces(base64Image) {
		return new Promise((resolve, reject) => {
            temp.createTempBase64(base64Image).then((id) => {
				// initialize recognition instance.
				let visualRecognition = new VisualRecognitionV3({
					version: '2018-03-19',
					iam_apikey: process.env.IAM_APIKEY
				});
                // instance parameters.
                let params = {
                    images_file: temp.readTemp(id)
                };
                // call the API.
                visualRecognition.detectFaces(params, (err, res) => {
                    if(err) {
                        console.log(err);
                        // Reject it
                        reject(err);
                    } else {
                        // Resolve it
                        resolve(res);
                        // delete the temp file.
                        temp.deleteTemp(id).catch(() => {
                            console.log('Error on remove temp file.');
                        });
                    }
                });
			}).catch((err) => {
			    console.log('Error when it tried to create the Temp File. '+err);
			    reject(err);
            });
		});
	}
	
	// Allow CORS.
	app.use(function(req, res, next) {
	    // Just allow for our application and POST requests.
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if(req.method === 'OPTIONS') {
		    // If it is a OPTION request, send a 200 response.
			res.status(200).send('success');
			return;
		}
		// If it is not a OPTION request, keep going.
		next();
	});
	// Parse our body to JSON and limit it at most 10MB.
	app.use(bodyParser.json({limit: '10mb'}));

	// Create our service.
	app.post('', (req, res) => {
		// Detect faces API.
		doDetectFaces(req.body.image).then((response) => {
			// send the response.
			res.send(response);
		}).catch((err) => {
		    // Send 500 status
		    res.status(500).send('Internal Error');
        });
	});
	
	app.listen(port, () => console.log(`Listening on port ${port}`));
}