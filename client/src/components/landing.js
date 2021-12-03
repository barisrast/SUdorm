import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Fragment>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>SUdorm</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />

        <script
          src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
          crossorigin="anonymous"
        ></script>

        <link
          href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i"
          rel="stylesheet"
        />
      </head>
      <body id="page-top">
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container px-5">
            <a className="navbar-brand" href="#page-top">
              SUdorm
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead text-center text-white">
          <div className="masthead-content">
            <div className="container px-5">
              <h1 className="masthead-heading mb-0">SUdorm</h1>
              <h2 className="masthead-subheading mb-0">
                Find your best roommate!
              </h2>
              <a
                className="btn btn-light btn-xl rounded-pill mt-5"
                href="#scroll"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
        </header>

        <section id="scroll">
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src="../img/01.jpg"
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Do you want to find a roommate?</h2>
                  <p>
                    By matching roommates based on certain parameters, our
                    website will help you to find most compatible roommate to
                    you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src="./img/02.jpg"
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <h2 className="display-4">Do not take risks!</h2>
                  <p>
                    Prevent possible conflicts with your roommates by matching
                    with people that have similar preferences with you. Don't
                    battle with your roommates, focus on your studies!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src="../img/03.jpg"
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Have the best stay!</h2>
                  <p>
                    Enjoy the company of your roommates. Have your best stay at
                    Sabanci University!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-5 bg-black">
          <div className="container px-5">
            <p className="m-0 text-center text-white small">
              Copyright &copy; SUdorm 2021
            </p>
          </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </Fragment>
  );
};
export default Landing;
