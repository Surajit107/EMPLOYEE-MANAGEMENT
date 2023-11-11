import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allEmployee, filterLocation, filterName } from '../../services/slices/UtilitySlice';
import Pagination from '../../util/Pagination';
import Loader from '../../util/Loader';

const AllEmployee = () => {
    // logged in user
    const user = JSON.parse(window.localStorage.getItem('user'));
    const USER_TYPE = user?.user_type;
    const [pageNumber, setPageNumber] = useState(0);
    const [employeeData, setEmployeeData] = useState(null);

    const dispatch = useDispatch();
    const { employee_data, loading } = useSelector(state => state.utilitySlice);

    // pagination
    const userPerPage = 5;
    const pagesVisited = pageNumber * userPerPage;
    const DATA = employeeData?.slice(pagesVisited, pagesVisited + userPerPage);
    const pageCount = Math.ceil((employeeData?.length || 0) / userPerPage);

    const changePage = (newData) => {
        setPageNumber(newData?.selected)
    }

    // Componenet mount life cycle
    useEffect(() => {
        dispatch(allEmployee());
    }, [dispatch]);


    // Componenet update life cycle
    useEffect(() => {
        setEmployeeData(employee_data)
    }, [employee_data]);


    return (
        <>
            {/* Loader */}
            {loading && <Loader />}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Employees</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Action</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-7">

                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex align-item-center justify-content-between'>
                                        <h5 className="card-title">All Employee</h5>
                                        <div className="dropdown mt-3">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Filter
                                            </button>
                                            <ul className="dropdown-menu">
                                                {/* Name */}
                                                <li onClick={() => dispatch(filterName({ type: "asc" }))}>
                                                    <Link className="dropdown-item" to="#">Name (A-Z)</Link>
                                                </li>
                                                <li onClick={() => dispatch(filterName({ type: "dsc" }))}>
                                                    <Link className="dropdown-item" to="#">Name (Z-A)</Link>
                                                </li>

                                                {/* Location */}
                                                <li onClick={() => dispatch(filterLocation({ type: "asc" }))}>
                                                    <Link className="dropdown-item" to="#">Location (A-Z)</Link>
                                                </li>
                                                <li onClick={() => dispatch(filterLocation({ type: "dsc" }))}>
                                                    <Link className="dropdown-item" to="#">Location (Z-A)</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <ol className="list-group list-group-numbered">
                                        {
                                            DATA?.map((item) => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={item?._id}>
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">Name: {item?.full_name}</div>
                                                            Location: {item?.location_city}
                                                        </div>
                                                        {
                                                            USER_TYPE === "admin" ?
                                                                <Link to={`/edit-employee/${item?._id}`} className="btn btn-sm btn-primary rounded">
                                                                    <i className='bx bxs-edit'></i>
                                                                </Link>
                                                                : null
                                                        }

                                                    </li>
                                                )
                                            })
                                        }
                                    </ol>

                                    {/* Pagination */}
                                    <Pagination
                                        data={DATA}
                                        pageCount={pageCount}
                                        changePage={changePage}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default AllEmployee