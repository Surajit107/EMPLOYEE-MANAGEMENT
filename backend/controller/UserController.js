const UserModel = require('../model/User');
const DepartmentModel = require('../model/Department');
const bcryptjs = require('bcryptjs');
const CreateToken = require('../config/createToken');
const SecurePassword = require('../config/securePassword');



// user-register (SIGN UP)
exports.registerUser = async (req, res) => {
    // console.log(req.body);
    // return;
    const { full_name, email, location_city, password } = req.body;
    try {
        if (!(full_name && email && location_city && password)) {
            return res.status(203).json({ success: false, message: "All Fields Are required" });
        } else if (!full_name) {
            return res.status(203).json({ success: false, message: "Full name is required" });
        } else if (!email) {
            return res.status(203).json({ success: false, message: "Email Id is required" });
        } else if (!password) {
            return res.status(203).json({ success: false, message: "Password is required" });
        } else if (!location_city) {
            return res.status(203).json({ success: false, message: "Location/City is required" });
        }

        const Email = await UserModel.findOne({ email });

        if (Email) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        } else {
            const setPassword = await SecurePassword(password);
            const NewUser = new UserModel({
                full_name,
                email,
                location_city,
                password: setPassword,
                department: null,
                type: "user"
            });

            const USERDATA = await NewUser.save();
            const tokenData = await CreateToken(USERDATA._id);
            return res.status(200).json({ success: true, message: "Registered Successfully", data: USERDATA, token: tokenData });
        }
    } catch (exc) {
        console.log("Error:", exc);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: exc });
    }
};


// user-login (LOGIN)
exports.userLogin = async (req, res) => {
    // console.log(req.body);
    // return;
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(203).json({ success: false, message: "Email ID Is Required" });
        } else if (!password) {
            return res.status(203).json({ success: false, message: "A Password Is Required" });
        }

        const existingUser = await UserModel.findOne({ email: email });


        if (!existingUser) {
            return res.status(203).json({ success: false, message: "User Not Found" });
        } else {
            const existingDepartment = await DepartmentModel.findOne({ _id: existingUser.department });
            const USERDATA = {
                id: existingUser._id,
                full_name: existingUser.full_name,
                email: existingUser.email,
                location_city: existingUser.location_city,
                user_type: existingUser.type,
                isDeleted: existingUser.isDeleted,
                department: existingDepartment || null,
            };
            if (existingUser && (bcryptjs.compareSync(password, existingUser.password))) {
                const tokenData = await CreateToken(existingUser._id);
                return res.status(200).json({ success: true, message: "Login Successfully", data: USERDATA, token: tokenData });
            } else {
                return res.status(203).json({ success: false, message: "Invalid Credentials. Please try again" })
            }
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// add-department (CREATE)
exports.addDepartment = async (req, res) => {
    const { department_name } = req.body;
    try {
        if (!department_name) {
            return res.status(203).json({ message: 'Missing required fields' });
        }
        // Check if the department name already exists in the database
        let existingDepartment = await DepartmentModel.findOne({ department_name: { $regex: new RegExp(department_name, "i") } });

        if (existingDepartment) {
            if (existingDepartment.isDeleted) {
                existingDepartment.isDeleted = false;
                await existingDepartment.save();
                return res.status(200).json({ success: true, message: 'Department added successfully' });
            } else {
                return res.status(203).json({ success: false, message: 'Department name already exists' });
            }
        } else {
            const newDepartment = new DepartmentModel({
                department_name,
                isDeleted: false
            });

            await newDepartment.save();
            return res.status(201).json({ success: true, message: 'Department added successfully' });
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


// get-all-department (READ)
exports.getAllDepartment = async (req, res) => {
    try {
        const allDepartment = await DepartmentModel.find({ isDeleted: false });
        return res.status(200).json({ success: true, message: 'Department fetched successfully', data: allDepartment });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// update-department (UPDATE)
exports.updateDepartment = async (req, res) => {
    // console.log(req.body);
    // return;
    const { department_name, isDeleted } = req.body;
    const department_Id = req.params.id;
    try {
        if (!department_name) {
            return res.status(203).json({ message: 'Missing required fields' });
        }

        const existingDepartment = await DepartmentModel.findById({ _id: department_Id });
        if (!existingDepartment) {
            return res.status(404).json({ success: true, message: 'Department Not Found' });
        }

        existingDepartment.department_name = department_name;
        existingDepartment.isDeleted = isDeleted;

        await existingDepartment.save();
        return res.status(201).json({ success: true, message: 'Department Updated Successfully' });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


// (soft)delete-department (DELETE)
exports.deleteDepartment = async (req, res) => {
    // console.log(req.params.id);
    // return;
    try {
        if (!req.params.id) {
            return res.status(203).json({ message: "Can't Get The ID" });
        }
        const department = await DepartmentModel.findByIdAndUpdate(req.params.id, { isDeleted: true });

        if (!department) {
            return res.status(404).json({ success: false, message: "Data Not Found" });
        } else {
            return res.status(200).json({ success: true, message: "Department Deleted Successfully" });
        }
    } catch (exc) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// get-all-employees (READ)
exports.getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await UserModel.find({ isDeleted: false, type: "user" });
        return res.status(200).json({ success: true, message: 'Employees fetched successfully', data: allEmployees });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// update-user-department (UPDATE)
exports.updateUserDepartment = async (req, res) => {
    // console.log(req.body);
    // return;
    const { full_name, email, location_city, department, isDeleted } = req.body;
    const user_Id = req.params.id;
    try {
        if (!(full_name && email && location_city && department)) {
            return res.status(203).json({ success: false, message: "All Fields Are required. Please Select A Department" });
        }

        const existingUser = await UserModel.findById({ _id: user_Id });
        if (!existingUser) {
            return res.status(404).json({ success: true, message: 'User Not Found' });
        }

        existingUser.full_name = full_name;
        existingUser.email = email;
        existingUser.location_city = location_city;
        existingUser.department = department;
        existingUser.isDeleted = isDeleted;

        await existingUser.save();
        return res.status(201).json({ success: true, message: 'Department Updated Successfully' });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


// Name Filter (A-Z & Z-A)
exports.filterName = async (req, res) => {
    // console.log(req.params.filter_type);
    // return;
    try {
        const allEmployees = await UserModel.find({ isDeleted: false, type: "user" });
        var DATA;
        if (req.params.filter_type === "asc") {
            DATA = allEmployees.sort((a, b) => a.full_name.localeCompare(b.full_name));
        } else {
            DATA = allEmployees.sort((a, b) => b.full_name.localeCompare(a.full_name));
        }
        return res.status(200).json({ success: true, message: 'Employees fetched successfully', data: DATA });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


// Location Filter (A-Z & Z-A)
exports.filterLocation = async (req, res) => {
    // console.log(req.params.filter_type);
    // return;
    try {
        const allEmployees = await UserModel.find({ isDeleted: false, type: "user" });
        var DATA;
        if (req.params.filter_type === "asc") {
            DATA = allEmployees.sort((a, b) => a.location_city.localeCompare(b.location_city));
        } else {
            DATA = allEmployees.sort((a, b) => b.location_city.localeCompare(a.location_city));
        }
        return res.status(200).json({ success: true, message: 'Employees fetched successfully', data: DATA });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}