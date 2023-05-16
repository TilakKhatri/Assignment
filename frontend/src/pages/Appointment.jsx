import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchAppointment from '../components/SearchAppointment'
import AddAppointment from './AddAppointment'
import AppointmentList from './AppointmentList';



function Appointment() {

  const [appointmentList, setAppointmentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("ownerName");
  const [orderBy, setOrderBy] = useState("asc");
  
  const filterData = appointmentList.filter((apt, index) => {
    return (apt.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.aptNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }).sort((a, b) => {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      if (valueA < valueB) {
        return orderBy === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return orderBy === 'asc' ? 1 : -1;
      }
      return 0;
    })
  

  const fetchData = useCallback(() => {
    axios.get('http://localhost:8000/api/posts').then((response) => {
      setAppointmentList(response.data);
    }).catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(sortBy, orderBy); checking onclick is working or not?
  return (
    <div className="py-5  mx-auto max-w-xl">
      <Header title={"Appointment system"} />
      <AddAppointment />

      <SearchAppointment
        searchQuery={searchQuery}
        onSearchQueryChange={(query) => setSearchQuery(query)}
        sortBy={sortBy}
        onChangeSortHandler={(sort) => setSortBy(sort)}
        orderBy={orderBy}
        onChangeOrderHandler={(order)=>setOrderBy(order)}
      />

      <div>
        <ul className="divide-y divide-gray-200 ml-3 mr-3">
          {
            filterData.length > 0 ? filterData.map((appointment,index) => (
              <AppointmentList
                key={index}
                appointment={appointment}
              />
            )):"No data available"
          }
        </ul>
      </div>
    </div>
  )
}

export default Appointment