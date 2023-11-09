import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { allDepartment, updateUserDepartment } from '../../services/slices/UtilitySlice';

const EditEmployee = () => {
    // header
    const header = {
        headers: {
            Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
        }
    }

    const { e_id } = useParams();
    const DATA = JSON.parse(window.localStorage.getItem("all_employee_data"));
    const EMPLOYEE_DATA = DATA?.filter((item) => item?._id === e_id);


    const [departmentData, setDepartmentData] = useState(null);
    const DEPARTMENT_NAME = departmentData?.filter((item) => item?._id === EMPLOYEE_DATA[0]?.department)[0]?.department_name || null;


    const [formValues, setFormValues] = useState({
        full_name: EMPLOYEE_DATA[0]?.full_name || "",
        email: EMPLOYEE_DATA[0]?.email || "",
        location_city: EMPLOYEE_DATA[0]?.location_city || "",
        department: "",
        isDeleted: EMPLOYEE_DATA[0]?.isDeleted || false
    });

    const dispatch = useDispatch();
    const { department_data } = useSelector(state => state.utilitySlice);

    // handleChange function
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    // handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            full_name: EMPLOYEE_DATA[0]?.full_name || "",
            email: EMPLOYEE_DATA[0]?.email || "",
            location_city: EMPLOYEE_DATA[0]?.location_city || "",
            department: formValues?.department,
            isDeleted: EMPLOYEE_DATA[0]?.isDeleted,
        }
        const id = EMPLOYEE_DATA[0]?._id;
        // console.log({ id, data, header });
        dispatch(updateUserDepartment({ id, data, header }))
    }




    // Component mount life cycle
    useEffect(() => {
        dispatch(allDepartment());
    }, [dispatch]);

    // Component update life cycle
    useEffect(() => {
        setDepartmentData(department_data || []);
    }, [department_data]);


    return (
        <>
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to="/all-employee">Employees</Link></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>

                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">

                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                    <img src="/assets/img/profile-img.png" alt="Profile" className="rounded-circle" />
                                    <h2>{EMPLOYEE_DATA[0]?.full_name}</h2>
                                    <h3>Dept.- {DEPARTMENT_NAME ? DEPARTMENT_NAME : "N/A"}</h3>

                                </div>
                            </div>

                        </div>

                        <div className="col-xl-8">

                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* <!-- Bordered Tabs --> */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">

                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">

                                            {/* <!-- Profile Edit Form --> */}
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-3">
                                                    <label htmlFor="full_name" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="full_name"
                                                            type="text"
                                                            className="form-control"
                                                            id="full_name"
                                                            value={formValues?.full_name}
                                                            onChange={handleChange}
                                                            readOnly
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label htmlFor="location_city" className="col-md-4 col-lg-3 col-form-label">Location/City</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="location_city"
                                                            type="text"
                                                            className="form-control"
                                                            id="location_city"
                                                            value={formValues?.location_city}
                                                            onChange={handleChange}
                                                            readOnly
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            value={formValues?.email}
                                                            onChange={handleChange}
                                                            readOnly
                                                            disabled
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label htmlFor="department" className="col-md-4 col-lg-3 col-form-label">Assign Department</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <select
                                                            className="form-select"
                                                            aria-label="Default select example"
                                                            name='department'
                                                            value={formValues?.department}
                                                            onChange={handleChange}
                                                        >
                                                            <option>Select One...</option>
                                                            {departmentData?.map((department, index) => (
                                                                <option key={index} value={department?._id}>
                                                                    {department?.department_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>
                                            {/* <!-- End Profile Edit Form --> */}

                                        </div>

                                    </div>
                                    {/* <!-- End Bordered Tabs --> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default EditEmployee