import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { doLogOut } from '../../services/slices/AuthSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


const TopNavBar = () => {
    // logged in user & token
    const USER = JSON.parse(window.localStorage.getItem("user"));
    const TOKEN = JSON.parse(window.localStorage.getItem("token"));

    // decode jwt token
    const decodedJwt = jwtDecode(TOKEN);
    const isExpired = decodedJwt.exp < Date.now() / 1000;
    console.log(isExpired);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // logout func.
    const LOGOUT = () => {
        dispatch(doLogOut());
        navigate('/login');
    }


    // Componenet mount cycle
    useEffect(() => {
        // Check your session and logout after it's expired.
        if (isExpired) {
            dispatch(doLogOut());
            navigate('/login');
            // react toast message
            toast.success("Your Session Has Expired Please Login To Continue", {
                autoClose: 4500
            });
        }
    }, [isExpired, dispatch, navigate]);


    return (
        <>
            <Helmet>
                {/* <!-- Vendor JS Files --> */}
                <script src="/assets/vendor/apexcharts/apexcharts.min.js"></script>
                <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="/assets/vendor/chart.js/chart.min.js"></script>
                <script src="/assets/vendor/echarts/echarts.min.js"></script>
                <script src="/assets/vendor/quill/quill.min.js"></script>
                <script src="/assets/vendor/simple-datatables/simple-datatables.js"></script>
                <script src="/assets/vendor/tinymce/tinymce.min.js"></script>
                <script src="/assets/vendor/php-email-form/validate.js"></script>

                {/* <!-- Template Main JS File --> */}
                <script src="/assets/js/main.js"></script>
            </Helmet>

            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center">
                        <img src="/assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">NiceAdmin</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>
                {/* <!-- End Logo --> */}

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item dropdown pe-3">
                            <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                                <img src="/assets/img/profile-img.png" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{USER?.full_name}</span>
                            </Link>
                            {/* <!-- End Profile Iamge Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{USER?.full_name}</h6>
                                    <span>{USER?.department ? USER?.department?.department_name : "N/A"}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/profile-details">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link onClick={LOGOUT} className="dropdown-item d-flex align-items-center" to="/login">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </Link>
                                </li>

                            </ul>
                            {/* <!-- End Profile Dropdown Items --> */}
                        </li>
                        {/* <!-- End Profile Nav --> */}

                    </ul>
                </nav>
                {/* <!-- End Icons Navigation --> */}

            </header>
        </>
    )
}

export default TopNavBar