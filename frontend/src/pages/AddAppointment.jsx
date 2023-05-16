import React, { useContext, useState } from 'react'
import { BsPersonFillAdd } from 'react-icons/bs'
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom'
function AddAppointment() {
    const navigate = useNavigate();
    const { addAppointment } = useContext(DataContext);
    let [toggleForm, setToggleForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { ownerName, petName, aptDate ,aptTime,aptNotes} = e.target.elements;
        const item = {
            id: new Date().getTime().toString(),
            ownerName: ownerName.value,
            petName:petName.value,
            aptDate:aptDate.value,
            aptTime:aptTime.value,
            aptNotes:aptNotes.value,
        }
        if (item) {
            addAppointment(item);
            navigate(0);
            setToggleForm(false);
        }       
    }

    return (
        <div >

            <div className="fixed bottom-10 z-10 right-10 cursor-pointer">
                <BsPersonFillAdd
                    onClick={() => setToggleForm(!toggleForm)}
                    color='green' size='40'
                />
            </div>
            {
                toggleForm && (

                    <div className="fixed  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
                        <div className="relative w-full max-w-xl max-h-full">
                            <div className="relative bg-slate-50 opacity-100 rounded-lg shadow-lg">

                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900  text-center">Appointment Form</h3>
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className='flex space-x-2'>
                                            <input type="text" name="ownerName" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 " placeholder="Owner name"  />
                                            <input type="text" name="petName" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 " placeholder="Pet name"  />
                                        </div>
                                        <div className='flex space-x-2 my-4'>
                                            <input type="date" name="aptDate" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 " placeholder="Select date" />
                                            <input type="time" name="aptTime" className="bg-transparent border border-gray-500 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full p-2.5 " placeholder="Select time"  />
                                        </div>
                                        <div>
                                            <textarea
                                                className='bg-transparent w-full border border-gray-700 px-2 '
                                                name="aptNotes" cols="30"
                                                rows="10"
                                                placeholder='Detailed comments about the condition'
                                           
                                            ></textarea>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <button type="submit" className=" font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-green-600 dark:bg-green-600 hover:bg-green-500">Submit</button>
                                            <button className=" font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-red-600 dark:bg-red-600 hover:bg-red-500" onClick={() => setToggleForm(false)}>Cancle</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default AddAppointment;