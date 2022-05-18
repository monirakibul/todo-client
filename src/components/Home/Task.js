import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Task = ({ task, handleCompleted, handleDelete }) => {
    const { _id, title, description, isCompleted } = task;
    return (
        <div class="card bg-base-100 border border-gray-100 lg:mx-5 my-3 shadow">
            <div class="flex justify-between items-center px-5 py-2">
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className={`${isCompleted && 'line-through'}`}>{description}</p>
                </div>
                <div class="card-actions justify-end">
                    <button onClick={() => handleCompleted(_id)} class="btn btn-circle btn-sm bg-green-500 border-none hover:bg-green-700">
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </button>
                    <button onClick={() => handleDelete(_id)} class="btn btn-circle btn-sm bg-rose-700 border-none hover:bg-red-900">
                        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;