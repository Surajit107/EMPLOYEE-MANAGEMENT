import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addDepartment, allDepartment, deleteDepartment, updateDepartment } from '../../services/slices/UtilitySlice';
import { useDispatch, useSelector } from 'react-redux';

const ManageDepartment = () => {
  // header
  const header = {
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
    }
  }
  const [editIndex, setEditIndex] = useState(-1);
  const [departmentData, setDepartmentData] = useState(null);
  const [formValues, setFormValues] = useState({ department_name: "" });
  const [updateFormValues, setupdateFormValues] = useState([]);

  const dispatch = useDispatch();
  const { department_data } = useSelector(state => state.utilitySlice);


  //  handleEdit function.
  const handleEdit = (index) => {
    setEditIndex(index);
  };


  // handleChange function.
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }


  // handleSubmit function.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      department_name: formValues?.department_name
    }
    dispatch(addDepartment({ data, header }));
    setFormValues({ ...formValues, department_name: "" });
  }


  // handleUpdate function.
  const handleUpdate = (e) => {
    e.preventDefault()
    const updatedDepartmentData = [...updateFormValues]
    updatedDepartmentData[editIndex] = { ...updateFormValues[editIndex] };
    setupdateFormValues(updatedDepartmentData);
    const data = {
      department_name: updatedDepartmentData[editIndex]?.department_name,
      isDeleted: updatedDepartmentData[editIndex]?.isDeleted
    }
    const id = updatedDepartmentData[editIndex]?._id;
    dispatch(updateDepartment({ id, data, header }));
    setEditIndex(-1);
  };


  // handleDelete function.
  const handleDelete = (d_id, deleteIndex) => {
    const updatedDepartmentData = [...updateFormValues]
    const id = updatedDepartmentData[deleteIndex]?._id || d_id;
    dispatch(deleteDepartment({ id, header }));
  }


  // Component mount life cycle
  useEffect(() => {
    dispatch(allDepartment());
  }, [dispatch]);


  // Component update life cycle
  useEffect(() => {
    setDepartmentData(department_data || []);
    setupdateFormValues(
      department_data?.map((item) => ({
        _id: item?._id || '',
        department_name: item?.department_name || '',
        isDeleted: item?.isDeleted,
      })) || []
    );
  }, [department_data]);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Management</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Action</li>
            </ol>
          </nav>
        </div>

        {/* Add Department Section (CREATE) */}
        <section className="section">
          <div className="row">
            <div className="col-lg-9">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add Departmet</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control"
                          name='department_name'
                          placeholder='Enter Department'
                          value={formValues?.department_name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-sm-4">
                        <button type="submit" className="btn btn-success">
                          <i className="bx bxs-memory-card"></i>
                        </button>
                      </div>

                    </div>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* List All Department Section (READ-DELETE-UPDATE) */}
        <section className="section">
          <div className="row">
            <div className="col-lg-9">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">All Departmet</h5>
                  {
                    departmentData?.map((item, index) => {
                      return (
                        <div className="row mb-3" key={item?._id}>
                          <div className="col-sm-4">
                            <input
                              type="text"
                              className="form-control"
                              name='department'
                              value={updateFormValues[index]?.department_name}
                              onChange={(e) => {
                                const updatedFormValues = [...updateFormValues];
                                updatedFormValues[index].department_name = e.target.value;
                                setupdateFormValues(updatedFormValues);
                              }}
                              disabled={editIndex !== index}
                            />
                          </div>

                          <div className="col-sm-4">
                            {editIndex !== index ? (
                              <button
                                onClick={() => handleEdit(index)}
                                type="button"
                                className="btn btn-warning"
                              >
                                <i className="bx bxs-edit"></i>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleUpdate}
                              >
                                <i className="bx bxs-memory-card"></i>
                              </button>
                            )}

                            <button
                              type="button"
                              className="btn btn-danger mx-2"
                              onClick={() => handleDelete(item?._id, index)}
                            >
                              <i className="bx bxs-trash"></i>
                            </button>
                          </div>

                        </div>
                      )
                    })
                  }

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default ManageDepartment