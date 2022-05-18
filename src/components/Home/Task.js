import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Task = ({ task, handleCompleted, handleDelete }) => {
    const { _id, title, description, isCompleted } = task;
    return (
        <div className="card bg-base-100 border border-gray-100 lg:mx-5 my-3 shadow">
            <div className="flex justify-between items-center px-5 py-2">
                <div className='w-10/12 break-words'>
                    <h2 className={`text-xl font-bold ${isCompleted && 'line-through text-red-700'}`}>{title}</h2>
                    <p className={`${isCompleted && 'line-through text-red-700'}`}>{description}</p>
                </div>
                <div className="w-2/12 card-actions justify-end">
                    <button onClick={() => handleCompleted(_id)} className="btn btn-circle btn-sm bg-green-500 border-none hover:bg-green-700">
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-sm bg-rose-700 border-none hover:bg-red-900">
                        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;