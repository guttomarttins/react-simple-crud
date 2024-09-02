import { useEffect, useState } from "react";
import "./Home.style.css"
import { IEmployee, PageEnum } from "./Employee.type";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const Home = () => {
    const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
    const [showPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

    useEffect(() => {
        const listInString = window.localStorage.getItem("EmployeeList");
        if(listInString){
            _setEmployeeList(JSON.parse(listInString));
        }
    }, [])
    
    const onAddEmployeeClickHnd = () => {
        setShowPage(PageEnum.add)
    }

    const showListPage = () => {
        setShowPage(PageEnum.list)
    }

    const _setEmployeeList = (list: IEmployee[]) => {
        setEmployeeList(list);
        window.localStorage.setItem("EmployeeList", JSON.stringify(list));
    }

    const addEmployee = (data: IEmployee) => {
        _setEmployeeList([...employeeList, data]);
    }

    const deleteEmployee = (data: IEmployee) => {
        const indexToDelete = employeeList.indexOf(data);
        const tempList = [ ...employeeList];
        tempList.splice(indexToDelete, 1);
        _setEmployeeList(tempList);
    }

    const editEmployeeData = (data: IEmployee) => {
        setShowPage(PageEnum.edit);
        setDataToEdit(data);
    }

    const updateData = (data: IEmployee) => {
        const filteredData = employeeList.filter(x => x.id === data.id)[0];
        const indexOfRecord = employeeList.indexOf(filteredData);
        const temData = [...employeeList];
        temData[indexOfRecord] = data;
        _setEmployeeList(temData);
    } 

    return (
        <>
            <article className="article-header">
                <header>
                    <h1>React: Simple CRUD Application</h1>
                </header>
            </article>

            <section className="section-content">
                {showPage === PageEnum.list && (
                    <>
                        <input 
                            type="button" 
                            value="Add Employee" 
                            onClick={onAddEmployeeClickHnd} 
                            className="add-employee-btn"/>

                        <EmployeeList 
                            list={employeeList} 
                            onDeleteClickHnd={deleteEmployee}
                            onEdit={editEmployeeData}/>
                    </>
                )}

                {showPage === PageEnum.add && (
                    <AddEmployee 
                       onBackBtnClickHnd={showListPage} 
                       onSubmitClickHnd={addEmployee}
                    />
                )}

                {showPage === PageEnum.edit && <EditEmployee data={dataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateData}/>}
            </section>
        </>
    );
};

export default Home;