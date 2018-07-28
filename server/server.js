module.exports = function(app, port) {
	
	app.get('', (req, res) => {
		res.send({ result: 'Hello world' });
	});
	
	app.listen(port, () => console.log(`Listening on port ${port}`));
}