import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allEmployee } from '../../services/slices/UtilitySlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../util/Loader';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { employee_data, loading } = useSelector(state => state.utilitySlice);

    // Componenet mount life cycle
    useEffect(() => {
        dispatch(allEmployee());
    }, [dispatch]);

    return (
        <>
            {/* Loader */}
            {loading && <Loader />}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">


                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-12">
                            <div className="row">


                                {/* <!-- Sales Card --> */}
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">

                                        <div className="card-body">
                                            <h5 className="card-title">Total Employees</h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{employee_data?.length}</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* <!-- End Sales Card --> */}

                            </div>
                        </div>
                        {/* <!-- End Left side columns --> */}

                    </div>
                </section>
            </main>
        </>
    )
}

export default Dashboard