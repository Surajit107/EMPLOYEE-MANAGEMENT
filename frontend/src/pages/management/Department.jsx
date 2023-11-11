import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { allDepartment, allEmployee } from '../../services/slices/UtilitySlice';
import Loader from '../../util/Loader';

const Department = () => {
    const dispatch = useDispatch();
    const { employee_data, department_data, loading } = useSelector(state => state.utilitySlice);
    const [structuredData, setStructuredData] = useState([]);


    // groupedEmployee function.
    const groupedEmployee = useCallback(() => {
        const DATA = department_data?.map((department) => {
            const EMP = employee_data?.filter(employee => employee?.department === department?._id)
            // console.log(EMP);
            return {
                department_id: department?._id,
                department_name: department?.department_name,
                employees: EMP,
            }
        })
        // console.log(DATA);
        setStructuredData(DATA);
    }, [department_data, employee_data]);


    // Componenet mount life cycle
    useEffect(() => {
        dispatch(allEmployee());
        dispatch(allDepartment());
    }, [dispatch]);


    // Componenet update life cycle
    useEffect(() => {
        groupedEmployee();
    }, [groupedEmployee]);

    // console.log(structuredData);

    return (
        <>
            {/* Loader */}
            {loading && <Loader />}

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Departmet</h1>
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
                                {
                                    structuredData?.map((item, index) => {
                                        return (
                                            <div className="card-body" key={index}>
                                                <div className='d-flex align-item-center justify-content-between'>
                                                    <h5 className="card-title">{item?.department_name}</h5>
                                                </div>

                                                <ol className="list-group list-group-numbered">
                                                    {
                                                        item?.employees?.length > 0 ?
                                                            item?.employees?.map((emp, index) => {
                                                                return (
                                                                    <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                                                                        <div className="ms-2 me-auto">
                                                                            <div className="fw-bold">{emp?.full_name}</div>
                                                                            {emp?.location_city}
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                            :
                                                            <li className="list-group d-flex justify-content-between align-items-start">
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">No employees assigned so far.</div>
                                                                </div>
                                                            </li>
                                                    }
                                                </ol>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default Department