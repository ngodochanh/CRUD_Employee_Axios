import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/employee";

const EmpEdit = () => {
    const { empid } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get('employee/' + empid)
                if (response && response.data) {
                    setId(response.data.id || '');
                    setName(response.data.name || '');
                    setEmail(response.data.email || '');
                    setPhone(response.data.phone || '');
                    setActive(response.data.active || false);
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

        fetchEmployee();
    }, [])

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [active, setActive] = useState(true);
    // Lưu dữ input đã được tương tác hay chưa?
    const [inputTouched, setInputTouched] = useState(false);
    const navigate = useNavigate();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('employee/' + empid, { id, name, email, phone, active });
            alert('Save successfully');
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlerSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h2>Employee Edit</h2>
                        </div>

                        <div className="card-body text-start">
                            <div className="row">
                                <div className="col-lg-12">
                                    <label>ID</label>
                                    <input value={id} disabled className="form-control" />
                                </div>

                                <div className="col-lg-12">
                                    <label>Name</label>

                                    <input value={name} required
                                        onChange={e => {
                                            setName(e.target.value.trim());

                                            // nếu name rỗng thì flase như vậy sẽ không hiện thị để người dùng tiếp
                                            // tục nhập (loại bỏ khi xóa hết ký tự)
                                            if (name !== "") {
                                                setInputTouched(false);
                                            }
                                        }}
                                        // khi blur ra thì cập nhật lại là true để hiện thị
                                        onBlur={() => setInputTouched(true)}
                                        className="form-control" />


                                    { // hiện thị sẽ phụ thuộc vào name khi blur còn change inputTouched
                                        inputTouched && name.length === 0 &&
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

export default EmpEdit;