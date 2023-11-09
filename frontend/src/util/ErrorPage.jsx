import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <main>
                <div className="container">

                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>401</h1>
                        <h2>You are not authorized to access the requested page.</h2>
                        <Link className="btn" to="/">Back to home</Link>
                        <img src="./assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found" />
                    </section>

                </div>
            </main>
        </>
    )
}

export default ErrorPage