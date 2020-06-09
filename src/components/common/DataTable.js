import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
var temp;
class DataTable extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      data: props.data,
      error: "",
    };
    temp = this;
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props);
    //it will return either null or new state(used: when state depende props)
    return props;
  }

  deleteHandler = (id) => {
    console.log(id);
    axios
      .delete(`http://dummy.restapiexample.com/api/v1/employee/` + id)
      .then((respose) => {
        console.log(respose);
        ToastsStore.success("Employee Deleted Successfully!");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Error in Deleting Employee",
        });
        ToastsStore.error(this.state.error);
      });
  };

  render() {
    const { data, error } = this.state;
    console.log(data);
    if (error) {
      return (
        <div>
          <ToastsContainer
            position={ToastsContainerPosition.TOP_RIGHT}
            store={ToastsStore}
          />
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                    <th>Options</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((d) => (
                    <Row key={d.id} data={d} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Age</th>
                <th>Options</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Age</th>
                <th>Options</th>
              </tr>
            </tfoot>
            <tbody>
              {data.map((d) => (
                <Row key={d.id} data={d} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Row = ({ data }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {" "}
        <Link to={`/employee/Edit/${data.id}`}>{data.employee_name}</Link>
      </td>
      <td>{data.employee_salary}</td>
      <td>{data.employee_age}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => temp.deleteHandler(data.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DataTable;
