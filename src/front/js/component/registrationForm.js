import React from "react";
export const RegistrationForm = () => {
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Join Now
      </button>

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5
                className="modal-title text-light text-center"
                id="exampleModalLabel"
              >
                Join Now to Fit Central
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form de Registro */}
              <form className="row g-3">
                <div className="col-md-6">
                  <label for="inputName" className="form-label text-light">
                    Name
                  </label>
                  <input type="email" className="form-control" id="inputName" />
                </div>
                <div className="col-md-6">
                  <label for="inputLastName" className="form-label text-light">
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label text-light">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6">
                  <label for="inputPassword4" className="form-label text-light">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-12">
                  <label for="registerAs" className="form-label text-light">
                    Register As
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label text-light"
                      for="flexRadioDefault1"
                    >
                      User
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label
                      className="form-check-label text-light"
                      for="flexRadioDefault2"
                    >
                      Coach
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="text-light">Gender</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Choose One
                    </option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                </div>
              </form>
              {/* Fin de Form de Registro */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-warning">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
