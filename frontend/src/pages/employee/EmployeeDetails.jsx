import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeDetails = () => {
    // logged in user
    const USER = JSON.parse(window.localStorage.getItem("user"));

    return (
        <>
            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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
                                    <h2>{USER?.full_name}</h2>
                                    <h3>{USER?.department ? USER?.department?.department_name : "N/A"}</h3>

                                </div>
                            </div>

                        </div>

                        <div className="col-xl-8">

                            <div className="card">
                                <div className="card-body pt-3">
                                    {/* <!-- Bordered Tabs --> */}
                                    <ul className="nav nav-tabs nav-tabs-bordered">

                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">

                                            <h5 className="card-title">Profile Details</h5>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                                <div className="col-lg-9 col-md-8">{USER?.full_name}</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Location/City</div>
                                                <div className="col-lg-9 col-md-8">{USER?.location_city}</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{USER?.email}</div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Department</div>
                                                <div className="col-lg-9 col-md-8">{USER?.department ? USER?.department?.department_name : "N/A"}</div>
                                            </div>

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

export default EmployeeDetails