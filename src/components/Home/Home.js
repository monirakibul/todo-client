import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import AddTask from './AddTask';
import ListTask from './ListTask';

const Home = () => {
    const [user] = useAuthState(auth)

    // signout 
    const handleSignOut = () => {
        signOut(auth)
    }

    // getting task list 
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`https://secret-ravine-37756.herokuapp.com/task?email=${user.email}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [tasks])


    // task add 
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
            fetch('https://secret-ravine-37756.herokuapp.com/add', {
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


    // delete a task 
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
                const url = `https://secret-ravine-37756.herokuapp.com/delete/${id}`;
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        const remaining = tasks.filter(item => item._id !== id);
                        setTasks(remaining);
                        toast.error("Task has been Deleted")
                    })
            }
        })
    }


    // completed a task 
    const handleCompleted = id => {
        const url = `https://secret-ravine-37756.herokuapp.com/completed/${id}`;
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
            <div className="flex justify-between items-center shadow-lg p-5 ">
                <h1 className='text-2xl text-[#ff4546] font-extrabold ' ><FontAwesomeIcon icon={faRectangleList} /> Todo App</h1>
                <button onClick={() => handleSignOut()} class="btn btn-outline hover:bg-[#ff4546] text-[#ff4546] border-[#ff4546] hover:border-[#ff4546]">Log out</button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <AddTask handleTaskAdd={handleTaskAdd}></AddTask>
                <ListTask tasks={tasks} handleDelete={handleDelete} handleCompleted={handleCompleted}></ListTask>
            </div>

        </div>
    );
};

export default Home;