import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddTask = ({ handleTaskAdd }) => {

    return (
        <div className="add-task bg-[#FF4546] py-10 px-5  lg:min-h-[calc(100vh-72px)] lg:px-20 lg:py-20">
            <div className="add-task__title">
                <img
                    className="add-task__title__icon"
                    src="./svg/add-task.svg"
                    alt=""
                />
                <h2 className="text-xl text-white pb-4"><FontAwesomeIcon icon={faFilePen}></FontAwesomeIcon>  Make New Task</h2>
            </div>
            <form onSubmit={handleTaskAdd} className="add-task__inputs">
                <div>
                    <input
                        name='title'
                        className="input input-bordered w-full mb-4"
                        type="text"
                        placeholder="Task Topic"
                    />
                </div>
                <div>

                    <textarea
                        name='description'
                        className="textarea textarea-bordered h-48 w-full mb-4"
                        type="text"
                        placeholder="Task Description"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-outline btn-wide text-center bg-[#FF4546] text-white border-white"
                    >
                        Create New Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;