import { IEmployee } from "./Employee.type";
import "./EmployeeModal.style.css";

type Props = {
    onClose: () => void;
    data: IEmployee;
}

const EmployeeModal = (props: Props) => {
    const { onClose, data } = props;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>Employee Data</h1>
                <div>
                    <label>First Name : {data.firstName}</label>
                </div>
                <div>
                    <label>Last Name : {data.lastName}</label>
                </div>
                <div>
                    <label>E-mail : {data.email}</label>
                </div>
                <p>
                  <button type="button" onClick={onClose}>Close</button>
                </p>
            </div>
        </div>
    );
}

export default EmployeeModal;