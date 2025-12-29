/* eslint-disable jsx-a11y/anchor-is-valid */
const Signup = () => {
    return (
        <section className="position-relative overflow-hidden vh-100">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                        <div className="py-4 text-center">
                            <a className="d-inline-block mb-4" href="#">
                                <img
                                    className="img-fluid"
                                    src="yofte-assets/logos/yofte-logo.svg"
                                    alt=""
                                />
                            </a>
                            <h2 className="mb-3">Signing up</h2>
                            <p className="mb-4">Please, do not hesitate</p>
                            <form>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="Repeat password"
                                    />
                                </div>
                                <div className="mb-4 form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="agreeCheckbox"
                                    />
                                    <label
                                        className="form-check-label small"
                                        htmlFor="agreeCheckbox"
                                    >
                                        By signing up, you agree to our Terms, Data Policy and
                                        Cookies.
                                    </label>
                                </div>
                                <button className="btn btn-dark btn-lg btn-block mb-2">
                                    JOIN
                                </button>
                            </form>
                        </div>
                        <img
                            className="d-lg-none w-100"
                            style={{ height: "384px" }}
                            src="yofte-assets/images/placeholder-sign.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div
                className="d-none d-lg-block position-absolute top-0 bottom-0 end-0 col-lg-6"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
        </section>
    );
};

export default Signup;