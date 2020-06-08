import React, { PureComponent } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
class EmployeeCreateEdit extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      id: "",
      employee_name: "",
      employee_salary: "",
      employee_age: "",
      profile_image: "",
      redirect: false,
      error: "",
    };
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const data = {
      employee_name: this.state.employee_name,
      employee_salary: +this.state.employee_salary,
      employee_age: +this.state.employee_age,
    };
    console.log(data);
    if (!this.props.match.params.id) {
      axios
        .post("http://dummy.restapiexample.com/api/v1/create", data)
        .then((respose) => {
          console.log(respose);
          this.setState({ redirect: true });
          ToastsStore.success("Employee Created Successfully!");
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: "Error in Creating Employee" });
          ToastsStore.error(this.state.error);
        });
    } else {
      axios
        .put("http://dummy.restapiexample.com/api/v1/update/", this.state.id)
        .then((respose) => {
          console.log(respose);
          this.setState({ redirect: true });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: "Error in Updating Employee",
            redirect: true,
          });
        });
    }
  };

  render() {
    const {
      employee_name,
      employee_salary,
      employee_age,
      redirect,
    } = this.state;
    console.log(redirect);
    if (redirect) {
      return (
        <div>
          <ToastsContainer
            position={ToastsContainerPosition.TOP_RIGHT}
            store={ToastsStore}
          />
          <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center">
                        {this.props.match.params.id ? (
                          <h1 className="h4 text-gray-900 mb-4">
                            {" "}
                            Edit Employee
                          </h1>
                        ) : (
                          <h1 className="h4 text-gray-900 mb-4">
                            {" "}
                            Create Employee
                          </h1>
                        )}
                      </div>
                      <form className="user" onSubmit={this.submitHandler}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="name"
                            value={employee_name}
                            placeholder="Name"
                            name="employee_name"
                            onChange={this.changeHandler}
                          ></input>
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            value={employee_salary}
                            name="employee_salary"
                            className="form-control form-control-user"
                            id="salary"
                            placeholder="Salary"
                            onChange={this.changeHandler}
                          ></input>
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            value={employee_age}
                            name="employee_age"
                            className="form-control form-control-user"
                            id="age"
                            placeholder="Age"
                            onChange={this.changeHandler}
                          ></input>
                        </div>
                        {!this.props.match.params.id ? (
                          <button
                            className="btn btn-primary btn-user btn-block"
                            type="submit"
                          >
                            Create Employee
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-user btn-block"
                            type="submit"
                          >
                            Edit Employee
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      {this.props.match.params.id ? (
                        <h1 className="h4 text-gray-900 mb-4">
                          {" "}
                          Edit Employee
                        </h1>
                      ) : (
                        <h1 className="h4 text-gray-900 mb-4">
                          {" "}
                          Create Employee
                        </h1>
                      )}
                    </div>
                    <form className="user" onSubmit={this.submitHandler}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="name"
                          value={employee_name}
                          placeholder="Name"
                          name="employee_name"
                          onChange={this.changeHandler}
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          value={employee_salary}
                          name="employee_salary"
                          className="form-control form-control-user"
                          id="salary"
                          placeholder="Salary"
                          onChange={this.changeHandler}
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          value={employee_age}
                          name="employee_age"
                          className="form-control form-control-user"
                          id="age"
                          placeholder="Age"
                          onChange={this.changeHandler}
                        ></input>
                      </div>
                      {this.props.match.params.id ? (
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Edit Employee
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          Create Employee
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(
          `http://dummy.restapiexample.com/api/v1/employee/` +
            this.props.match.params.id
        )
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ redirect: true, error: error });
          ToastsStore.error("Error in fetching Record");
        });
    }
  }
}

export default EmployeeCreateEdit;
