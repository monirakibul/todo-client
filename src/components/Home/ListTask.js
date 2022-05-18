import { faFile, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Task from './Task';

const ListTask = ({ tasks, handleCompleted, handleDelete }) => {

    return (
        <div className="flex flex-col add-task py-10 px-5 lg:min-h-[calc(100vh-72px)] lg:px-10">
            <h2 className="text-xl text-[#FF4546] pb-4"><FontAwesomeIcon icon={faFile}></FontAwesomeIcon>  All Task</h2>
            <div className='flex flex-col lg:flex-grow lg:max-h-[calc(100vh-200px)] items-center w-full'>
                <div className="max-h-full lg:overflow-y-scroll w-full">
                    {
                        tasks.length === 0 ?
                            <p className='text-gray-500 p-5 text-center'>No Task Available</p>
                            :
                            tasks.map(task => <Task
                                task={task}
                                key={task._id}
                                handleDelete={handleDelete}
                                handleCompleted={handleCompleted}
                            ></Task>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ListTask;