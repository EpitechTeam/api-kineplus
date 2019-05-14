import jwt from 'jsonwebtoken'

export default function ensureAuthorized (req, res, next) {
	let bearerToken
	let bearerHeader = req.headers["authorization"]

	if (typeof bearerHeader !== 'undefined') {
		let bearer = bearerHeader.split(" ")
		bearerToken = (bearer[1]) ? bearer[1] : bearerHeader
		jwt.verify(bearerToken,  "shhhhh", (err, decoded) => {
			if (err || !decoded) {
				return res.status(401).json(err)
			}
      else {
				req.token = bearerToken
				next()
			}
		})
	}
  else {
    res.sendStatus(403)
  }
}
