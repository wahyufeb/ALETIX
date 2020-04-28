module.exports = async (req, res, next) => {
    const role = req.admin.role;
    try {
        if(role !== "petugas"){
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