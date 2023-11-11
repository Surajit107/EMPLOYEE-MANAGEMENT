import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../services/slices/AuthSlice';

const Signup = () => {

  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    location_city: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handleChange func.
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  // handleSubmit func.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      full_name: formValues?.full_name,
      email: formValues?.email,
      location_city: formValues?.location_city,
      password: formValues?.password
    }
    // console.log({ data });
    dispatch(userSignup({ data, navigate }));
  }

  return (
    <>
      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <Link to="/" className="logo d-flex align-items-center w-auto">
                      <img src="./assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">NiceAdmin</span>
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your personal details to create account</p>
                      </div>

                      <form onSubmit={handleSubmit} className="row g-3 needs-validation">

                        {/* full_name */}
                        <div className="col-12">
                          <label htmlFor="full_name" className="form-label">Your Name*</label>
                          <input
                            type="text"
                            name="full_name"
                            className="form-control"
                            id="full_name"
                            pattern="[A-Za-z\s]+"
                            title="Please enter only alphabetic characters and spaces"
                            value={formValues?.full_name}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">Please, enter your name!</div>
                        </div>

                        {/* email */}
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Your Email*</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            value={formValues?.email}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                        </div>

                        {/* location */}
                        <div className="col-12">
                          <label htmlFor="location_city" className="form-label">Location/City*</label>
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="location_city"
                              className="form-control"
                              id="location_city"
                              value={formValues?.location_city}
                              onChange={handleChange}
                            />
                            <div className="invalid-feedback">Please enter your location.</div>
                          </div>
                        </div>

                        {/* password */}
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password*</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            value={formValues?.password}
                            onChange={handleChange}
                          />
                          <div className="invalid-feedback">Please enter your password!</div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">Create Account</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
    </>
  )
}

export default Signup