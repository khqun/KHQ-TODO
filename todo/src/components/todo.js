import { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

const SubmitSchema = Yup.object().shape({
    todo: Yup.string().required('Required')
})
export default function MyTodoList() {
    const [todo, setTodo] = useState();
    const [listTrue, setListTrue] = useState(false);
    const mytodo = [];
    const [fakeTodo, setFakeTodo] = useState([]);

    // submit action
    const handleSubmit = (data) => {
        const localIndex = localStorage.getItem('index') || 0;
        localStorage.setItem('index', Number(localStorage.getItem('index')) + 1 || 1)
        localStorage.setItem(`todo ${localIndex}`, data);
        setTodo('');
    }

    // change
    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    // check exist list
    const isList = () => {
        setListTrue(!listTrue);
        console.log(mytodo);
    }
    // get list
    const renderList = () => {
        for (let i = 0; i < localStorage.length; i++) {
            let a = localStorage.getItem(`todo ${i}`);
            mytodo.push(a);
            setFakeTodo(mytodo)
        }
    }
    // render list
    const renderMytodo = () => {
        return (
            fakeTodo.map((asdd, index) => {
                return (
                    <p key={index}>{asdd}</p>
                )
            })
        )
    }
    // html
    return (
        <div className="App">
            <h1>TODOLIST</h1>
            <input onChange={handleChange} value={todo} />
            <button onClick={() => {
                handleSubmit();
            }}>submit</button>
            <button onClick={() => {
                isList();
                renderList();
            }}>List</button>
            {listTrue ? renderMytodo() : null}
        </div>
    );
}
