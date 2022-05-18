import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import AddTask from './AddTask';
import ListTask from './ListTask';

const Home = () => {
    const [user] = useAuthState(auth)

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/task?email=${user.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [tasks])


    const handleTaskAdd = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;

        if (!title) {
            toast.error('Enter Task Topic')
        }
        if (!description) {
            toast.error('Enter Task Description')
        }
        const task = { title, description, email: user.email, isDone: false };

        if (title && description) {
            fetch('http://localhost:5000/add', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Task Added");
                    e.target.reset();
                    console.log(data)
                    tasks.push(task)
                })
        }
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `http://localhost:5000/delete/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        const remaining = tasks.filter(item => item._id !== id);
                        setTasks(remaining);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                    })
            }
        })
    }


    const handleCompleted = id => {
        const url = `http://localhost:5000/completed/${id}`;
        fetch(url, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                toast.success("Task Completed")
            })
    }

    return (
        <div>
            <h1 className='text-2xl text-[#ff4546] font-extrabold shadow-lg p-5 text-left' ><FontAwesomeIcon icon={faRectangleList} /> Todo App</h1>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <AddTask handleTaskAdd={handleTaskAdd}></AddTask>
                <ListTask tasks={tasks} handleDelete={handleDelete} handleCompleted={handleCompleted}></ListTask>
            </div>

        </div>
    );
};

export default Home;