const UserModel = require('../model/User');

// duplicateCheck
exports.duplicateUserCheck = async (req, res, next) => {
    // console.log(req.body);
    // return;
    try {
        const { email } = req.body;
        const existingUser = await UserModel.findOne({ email: email });

        if (existingUser) {
            return res.status(403).json({ success: false, message: `Email: '${email}' Already Exsists.` });
        }

    } catch (exc) {
        return res.status(500).json({ success: false, message: "Data Not Found" })
    }

    return next();
}