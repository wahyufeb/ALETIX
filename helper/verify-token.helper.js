const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        return res.json({
            sucess:false,
            message:"Access Denied"
        });
    }

    try {
        const verifed = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = verifed;
        next();
    } catch (err) {
        res.json({err})
    }
}