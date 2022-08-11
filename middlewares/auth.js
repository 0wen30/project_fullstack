const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env;

const refreshToken = async(req, res) => {

    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;
        const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const id = decoded.id;
        const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 1000 });
        //return res.json({accessToken});
        return res.redirect("post/home");
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
};

const validarToken = (req, res, next) => {

    console.log(req.body)

    const {accessToken} = req.body || req.query || req.headers;

    if (!accessToken) {
        return res.status(403).send("El token es requerido para acceder");
    }
    
    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token Invalido");
    }
    return next();
};
module.exports = {
    refreshToken,validarToken
};

