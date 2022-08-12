const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env;

const refreshToken = async(req, res) => {

    if (req.cookies?.refresh) {
        const refreshToken = req.cookies.refresh;
        const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const id = decoded.id;
        const accessToken = await jsonwebtoken.sign({id},secret,{expiresIn: "5m"});
        res.cookie('refresh', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 1000 });
        return res.json({accessToken});
    } else {
        return res.status(406).json({ message: 'No autorizado' });
    }
};

const validarToken = (req, res, next) => {

    const {token} = req.headers || req.body || req.query;

    console.log(token)

    if (!token) {
        return res.status(403).send("El token es requerido para acceder");
    }
    
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token Invalido");
    }
    return next();
};
module.exports = {
    refreshToken,validarToken
};

