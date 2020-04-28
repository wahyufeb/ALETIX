module.exports = async (req, res, next) => {
    let  role = await req.admin.role;
    try {
        if(role != "admin"){
            return res.json({
                sucess:false,
                message:"Access Denied"
            });
        }
        next();
    } catch (err) {
        res.json({err})
    }
}