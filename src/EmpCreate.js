import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from './api/employee';

const EmpCreate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [active, setActive] = useState(true);
    const [inputTouched, setInputTouched] = useState(false);
    const navigate = useNavigate();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('employee', { name, email, phone, active })
            alert('Save successfully');
            navigate('/');
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlerSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h2>Employee Create</h2>
                        </div>

                        <div className="card-body text-start">
                            <div className="row">
                                <div className="col-lg-12">
                                    <label>ID</label>
                                    <input disabled className="form-control" />
                                </div>

                                <div className="col-lg-12">
                                    <label>Name</label>
                                    <input value={name} required
                                        onChange={e => {
                                            setName(e.target.value);
                                            if (name !== '') {
                                                setInputTouched(false);
                                            }
                                        }}
                                        onBlur={() => setInputTouched(true)}
                                        className="form-control" />
                                    {inputTouched && name.length === 0 &&
                                        <span className="text-danger">Enter the name</span>}
                                </div>

                                <div className="col-lg-12">
                                    <label>Email</label>
                                    <input type="email" required value={email}
                                        onChange={e => setEmail(e.target.value)} className="form-control" />
                                </div>

                                <div className="col-lg-12">
                                    <label>Phone</label>
                                    <input type="tel" required value={phone}
                                        onChange={e => setPhone(e.target.value)} className="form-control"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                                </div>

                                <div className="col-lg-12">
                                    <input type="checkbox" checked={active}
                                        onChange={e => setActive(e.target.checked)} className="form-check-input" />
                                    <label className="form-check-label">Is Active</label>
                                </div>

                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-success">Save</button>
                                    <Link className="btn btn-danger ms-2" to="/">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmpCreate;