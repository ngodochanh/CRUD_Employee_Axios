import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/employee";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empData, setEmpData] = useState({});
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get('employee/' + empid);
                setEmpData(response.data);
            } catch (error) {
                console.log(error.message);
            }
   
        }
        fetchEmployee();
    }, [])

    return (
        <div className="container mt-3">
            <h2>Employee Detail</h2>
            {
                empData &&
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex align-items-center">
                        <h6 className="mb-0">Full Name:</h6>
                        <p className="mb-0 mx-2">{empData.name}</p>
                    </li>
                    <li class="list-group-item d-flex align-items-center">
                        <h6 className="mb-0">Email:</h6>
                        <p className="mb-0 mx-2">{empData.email}</p>
                    </li>
                    <li class="list-group-item d-flex align-items-center">
                        <h6 className="mb-0">Number Phone:</h6>
                        <p className="mb-0 mx-2">{empData.phone}</p>
                    </li>

                </ul>
            }
            <Link to="/" className="btn btn-danger">Back to Listring</Link>
        </div>
    );
}

export default EmpDetail;