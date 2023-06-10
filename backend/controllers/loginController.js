const adminLogin = (req, res) => {
    if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
        res.status(200).json({ isAuth: true });
    } else {
        res.status(401).json({ message: "The entered credentials are Invalid!" });
    }
}

module.exports = {
    adminLogin,
}