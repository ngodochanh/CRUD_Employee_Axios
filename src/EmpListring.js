import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api/employee";

const EmpListing = () => {
    const [empData, setEmpData] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate('/employee/edit/' + id);
    }

    const RemoveFunction = async (id) => {
        if (window.confirm('Do you want to remove?')) {
            try {
                await api.delete('employee/' + id)
                setEmpData(prevData => prevData.filter(item => item.id !== id));
                alert('Remove successfully');

            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const LoadDetail = (id) => {
        navigate('/employee/detail/' + id);
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await api.get('employee');
                if (response && response.data) {
                    setEmpData(response.data);
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else {
                    console.log('Error: ', error.message);
                }

            }
        }
        fetchEmployees();
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>

                <div className="card-body">
                    <div className="divbtn">
                        <Link className="btn btn-success" to="employee/create">Add New (+)</Link>
                    </div>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-center text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                        <tbody>
                            {empData &&
                                empData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }}
                                                className="btn btn-success me-2">
                                                Edit
                                            </a>

                                            <a onClick={() => { RemoveFunction(item.id) }}
                                                className="btn btn-danger me-2">
                                                Remove
                                            </a>

                                            <a onClick={() => { LoadDetail(item.id) }}
                                                className="btn btn-primary">
                                                Deteils
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmpListing;