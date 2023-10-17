export default function Login() {
    return (
        <section>
            <form>

                <h3 className="fw-normal mb-3 pb-3">Log in</h3>

                <div className="form-outline mb-4">
                    <input type="email" id="form2Example18" className="form-control form-control-lg" />
                    <label className="form-label">Email address</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example28" className="form-control form-control-lg" />
                    <label className="form-label">Password</label>
                </div>

                <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block" type="button">Login</button>
                </div>

                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p>
            </form>
        </section >
    )
}