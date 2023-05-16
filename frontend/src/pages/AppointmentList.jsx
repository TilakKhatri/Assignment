import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiTrash, FaUserEdit } from 'react-icons/all'
import EditAppointment from './EditAppointment'

function AppointmentList({ appointment }) {
    let [toggleForm, setToggleForm] = useState(false);
    const navigate = useNavigate();
    function removeAppointment(id) {
        axios.delete(`http://localhost:8000/api/posts/${id}`).then((response) => {
            console.log(response)
            navigate(0);
        }).catch((err) => console.log(err));
    }
    return (
        <>
        <li className="px-3 py-3 flex items-center mx-4">

            <div className='flex flex-col space-y-3'>
                <button
                    onClick={() => removeAppointment(appointment.appointmen_id)}
                    type="button"
                    className="p-1.5 mr-3.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-offset-2"
                >
                    <BiTrash />
                </button>
                <button
                  onClick={()=>setToggleForm(true)}
                    type="button"
                    className="p-1.5 mr-3.5 mt-1 rounded text-white bg-green-500 hover:bg-yellow-700 focus:outline-none focus:ring-offset-2"
                >
                    <FaUserEdit />
                </button>
            </div>
            <div className="flex-grow  hover:bg-gray-100 rounded-md p-5 bg-slate-300 shadow-lg">
                <div className="flex items-center justify-between">
                    <span className="flex-none font-medium text-xl text-gray-600">
                        Pet:{" "}{appointment.petName}
                    </span>
                    <div className='flex flex-col'>
                        <span className="flex-grow text-right">Date:{" "}{appointment.aptDate.split("T")[0]}</span>
                        <span className="flex-grow text-right">Time:{" "}{appointment.aptTime}</span>
                    </div>
                </div>
                <div>
                    <b className="font-bold text-gray-600">Owner:</b>{" "}
                    {appointment.ownerName}
                </div>
                <div className="leading-tight"><span className='text-md text-gray-600 mr-2'>Condition:</span>{appointment.aptNotes}</div>
            </div>
            </li>
            {
                toggleForm && <EditAppointment appointment={appointment} setToggleForm = {(toggleForm)=>setToggleForm(!toggleForm)} />
            }
        </>
    )
}



export default AppointmentList