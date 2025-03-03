const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
	console.log(req.headers);
	const token = req.header('authorization');
	if (!token) return res.status(401).send('Access Denied');

	try {
		req.user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
		next();
	} catch (error) {
		res.status(401).send('Invalid Token');
	}
}

module.exports = authenticateToken;
