import React, { useContext, useState } from 'react'
import { BsPersonFillAdd } from 'react-icons/bs'
import { DataContext } from '../context/DataContext';
import { redirect, useNavigate } from 'react-router-dom'

function EditAppointment({ appointment, setToggleForm }) {
    const navigate = useNavigate();
    const { updateAppointment } = useContext(DataContext);
    let date = appointment.aptDate.split("T")[0];

    const [ownerName, setOwnerName] = useState(appointment.ownerName);
    const [petName, setPetName] = useState(appointment.petName);
    const [aptDate, setDate] = useState(date);
    const [aptTime, setTime] = useState(appointment.aptTime);
    const [aptNotes, setNotes] = useState(appointment.aptNotes);

    const item = {
        id: appointment.appointmen_id,
        ownerName,
        petName,
        aptDate,
        aptTime,
        aptNotes,
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (item) {

            updateAppointment(appointment.appointmen_id, item);
            navigate(0)
        }
    }
    return (
        <>
            <div className="fixed  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
                <div className="relative w-full max-w-xl max-h-full">
                    <div className="relative bg-slate-50 opacity-100 rounded-lg shadow-lg">

                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900  text-center">Appointment Form</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className='flex space-x-2'>
                                    <input type="text" name="ownerName" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 "
                                        value={ownerName}
                                        onChange={(e) => setOwnerName(e.target.value)}
                                    />
                                    <input type="text" name="petName" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5"
                                        value={petName}
                                        onChange={(e) => setPetName(e.target.value)}
                                    />
                                </div>
                                <div className='flex space-x-2 my-4'>
                                    <input type="date" name="aptDate" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 "
                                        value={aptDate.split("T")[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <input type="time" name="aptTime" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 "
                                        value={aptTime}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        className='bg-transparent w-full border border-gray-700 px-2 '
                                        name="aptNotes" cols="30"
                                        rows="10"
                                        value={aptNotes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <button type="submit" className=" font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-green-600 dark:bg-green-600 hover:bg-green-500">Make Change</button>
                                    <button className=" font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-red-600 dark:bg-red-600 hover:bg-red-500" onClick={() => setToggleForm(false)}>Cancle</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAppointment;