module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({error: "you're not logged in"});
    }
    next();
}
