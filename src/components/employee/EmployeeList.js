import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "../common/DataTable";

class EmployeeList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      employee: [],
      copyofEmp: [],
      error: "",
      filterString: "",
    };
  }
  applyFilter = (event) => {
    console.log();
    this.setState({
      filterString: event.target.value,
    });

    let employees = [];
    this.state.copyofEmp.forEach((element) => {
      if (
        element.employee_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        employees.push(element);
      }
    });
    console.log(employees);
    this.setState({
      employee: employees,
    });
  };

  render() {
    const { employee, error, filterString } = this.state;
    console.log(employee);

    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  name="search"
                  value={filterString}
                  placeholder="Search for..."
                  onChange={this.applyFilter}
                ></input>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    Search
                  </button>
                </div>
              </div>
            </form>

            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block"></div>

              <Link to="/employee/create">
                <button className="btn btn-primary btn-user btn-block">
                  Create
                </button>
              </Link>
            </ul>
          </nav>

          <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Employees</h6>
              </div>
              {employee.length ? <DataTable data={employee} /> : null}
            </div>
          </div>
        </div>

        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2019</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then((respose) => {
        console.log(respose);
        console.log(respose.data.data);
        this.setState({
          employee: respose.data.data,
          copyofEmp: respose.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error in retreiving data" });
      });
  }
}

export default EmployeeList;
