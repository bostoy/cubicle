module.exports = (req, res, next) => {
    if (req.cookies['USER_SESSION']) {
        return res.redirect('/')
    }
    next()
}