const checkRole = (role) =>{
    return function(req, res, next) {
        if(req.user && req.user.role === role){
            return next()
        }else{
            res.status(403).json({
                status: 'failed',
                message: 'permission denied'
            })
        }
    }
}


module.exports = checkRole