'use client'

import React, { useEffect, useState } from 'react'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'

import { useAppSelector } from '../lib/hooks'
import page from '@/app/page'
import PaymentsModal from './paymentsModal'

export default function DisplayReservations() {
  // Fetching reservations from the Redux state
  const reservations = useAppSelector(state => state.reservationData.data)

  // State variables
  const [openModal, setOpenModal] = useState(false)
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [row, setRow] = useState(0)
  const [resultList, setResultList] = useState(reservations) // Initial result list
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [resultsFound, setResultsFound] = useState(true) // Initially true since we're displaying all reservations
  const [propertyFromDropdown, setPropertyFromDropdown] = useState('')
  const [searchArray, setSearchArray] = useState([])

  const modalHandler = () => {
    setOpenModal(!openModal)
  }

  const paymentsModalHandler = () => {
    setOpenPaymentModal(!openPaymentModal)
  }

  useEffect(() => {
    setResultList(reservations) // Update result list whenever reservations change
  }, [reservations])

  // Handle Search by Property Name, ID, or Visitor Name
  const handleSearch = (term: string) => {
    setLoading(true)
    setTimeout(() => {
      if (!term) {
        setResultList(reservations) // Show all reservations if search is empty
        setResultsFound(true)
      } else {
        const resultsArray = reservations.filter(
          el =>
            el.propertyName.toLowerCase().includes(term.toLowerCase()) ||
            el.id.toString().includes(term.toLowerCase()) ||
            el.detailedUser.details[0].firstName.toLowerCase().includes(term.toLowerCase()) ||
            el.detailedUser.details[0].lastName.toLowerCase().includes(term.toLowerCase())
        )

        setResultList(resultsArray)
        setResultsFound(resultsArray.length > 0)
      }

      setLoading(false)
    }, 500)
  }

  // Handle Search by City
  const handleSearchForProperties = (term: string) => {
    if (!term) {
      setResultList(reservations)
      setResultsFound(true)
    } else {
      const resultsArray = reservations.filter(el => el.city.toLowerCase().includes(term.toLowerCase()))

      setResultList(resultsArray)
    }
  }

  // Handle Option Click for City Dropdown
  const handleOptionClick = (city: string) => {
    setPropertyFromDropdown(city)
    setIsOpenDropdown(false)

    const filteredResults = reservations.filter(el => el.city.toLowerCase().includes(city.toLowerCase()))

    setResultList(filteredResults)
  }

  // Search By Date (Current Year, Month, or Day)
  const searchByDate = (date: string) => {
    setLoading(true)

    setTimeout(() => {
      const resultsArray = reservations.filter(el => {
        const arrivalDate = el.tripDetails[0].arrivalDate.replace(/[^\d\/\n]/g, '')

        const departureDate = el.tripDetails[0].departureDate.replace(/[^\d\/\n]/g, '')

        const dates = arrivalDate.split('\n')

        const currentDate = new Date()
        const currentDay = currentDate.getDate()
        const currentMonth = currentDate.getMonth() + 1
        const currentYear = currentDate.getFullYear()

        return dates.some(dateStr => {
          const [day, month, year] = dateStr.split('-').map(Number)

          if (!day || !month || !year) return false

          switch (date) {
            case 'Current Year':
              return year === currentYear
            case 'Current Month':
              return month === currentMonth && year === currentYear
            case 'Current Day':
              return day === currentDay && month === currentMonth && year === currentYear
            default:
              return false
          }
        })
      })

      setResultList(resultsArray)
      setResultsFound(resultsArray.length > 0)
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <div className='container mx-auto pt-4 pb-4'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>List of Reservations</h2>

        <div className='pt-5'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <input
              className='border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none'
              type='search'
              placeholder='Search by Property name, ID or visitor'
              onChange={e => handleSearch(e.target.value)}
            />
            <div className='relative'>
              <input
                className='w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none'
                type='search'
                placeholder='Search by City'
                value={propertyFromDropdown}
                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                onChange={e => {
                  setPropertyFromDropdown(e.target.value)
                  handleSearchForProperties(e.target.value)
                  setIsOpenDropdown(true)
                }}
              />
              {isOpenDropdown && (
                <ul className='absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-10'>
                  {reservations
                    .map(el => el.city)
                    .filter((city, index, self) => self.indexOf(city) === index)
                    .filter(city => city.toLowerCase().includes(propertyFromDropdown.toLowerCase()))
                    .map((city, index) => (
                      <li
                        key={index}
                        className='px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-600 transition-all'
                        onClick={() => handleOptionClick(city)}
                      >
                        {city}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <select
              name='account'
              id='account'
              defaultValue=''
              className='border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500 transition-all outline-none'
              onChange={e => searchByDate(e.target.value)}
            >
              <option value='' disabled>
                Select Date
              </option>
              <option value='Current Year'>Current Year</option>
              <option value='Current Month'>Current Month</option>
              <option value='Current Day'>Current Day</option>
            </select>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>PROPERTY</TableCell>
                  <TableCell align='left'>CITY</TableCell>
                  <TableCell align='left'>A/A</TableCell>
                  <TableCell align='left'>ARRIVAL DATE</TableCell>
                  <TableCell align='left'>DEPARTURE DATE</TableCell>
                  <TableCell align='left'>NIGHTS</TableCell>
                  <TableCell align='left'>VISITOR</TableCell>
                  <TableCell align='left'>TOTAL AMOUNT</TableCell>
                  <TableCell align='left'>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultList.map(row => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='left'>{row.propertyName}</TableCell>

                    <TableCell component='th' scope='row'>
                      {row.city}
                    </TableCell>
                    <TableCell align='left'>{row.id}</TableCell>
                    <TableCell align='left'>{row.tripDetails[0].arrivalDate}</TableCell>
                    <TableCell align='left'>{row.tripDetails[0].departureDate}</TableCell>
                    <TableCell align='left'>
                      {' '}
                      {(() => {
                        const arrivalDate = new Date(row.tripDetails[0].arrivalDate)
                        const departureDate = new Date(row.tripDetails[0].departureDate)

                        // const nights = (departureDate - arrivalDate) / (1000 * 60 * 60 * 24);
                        const nights = (departureDate - arrivalDate) / (24 * 60 * 60 * 1000)

                        return nights
                      })()}
                    </TableCell>

                    <TableCell align='left'>
                      {' '}
                      {row.detailedUser ? row.detailedUser.details[0].firstName : ''}{' '}
                      {row.detailedUser ? row.detailedUser.details[0].lastName : ''}
                    </TableCell>
                    <TableCell align='left'>€{row.total_amount}</TableCell>
                    <TableCell align='left'>
                      {' '}
                      <div
                        className={`p-1 flex justify-center text-white rounded ${row.status === 'Pre Check-in' ? ' bg-blue-500' : 'bg-green-500'}`}
                      >
                        {row.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <div className='flex flex-col'>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
              <thead>
                <tr className='bg-gray-100 border-b'>
                  <th className='text-left p-4 text-gray-60 font-semibold'>PROPERTY</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>CITY</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>A/A</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>DETAILS</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>NIGHTS</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>VISITOR</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>TOTAL AMOUNT</th>
                  <th className='text-left p-4 text-gray-600 font-semibold'>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className='text-center p-4'>
                      Loading...
                    </td>
                  </tr>
                ) : resultList.length > 0 ? (
                  resultList.map((reservation, index) => (
                    <tr
                      key={index}
                      className='border-b cursor-pointer'
                      onClick={() => {
                        modalHandler()
                        setRow(index)

                        // console.log(`reservatiomn ${reservations.}`);
                      }}
                    >
                      <td className='p-4'>{reservation.propertyName}</td>
                      <td className='p-4'>{reservation.city}</td>
                      <td className='p-4'>{reservation.id}</td>
                      <td className='p-4'>
                        <div className='grid-2'>
                          <div>{reservation.tripDetails[0].arrivalDate} </div>
                          <div>{reservation.tripDetails[0].departureDate}</div>
                        </div>
                      </td>
                      <td className='p-4'>
                        {(() => {
                          const arrivalDate = new Date(reservation.tripDetails[0].arrivalDate)
                          const departureDate = new Date(reservation.tripDetails[0].departureDate)

                          // const nights = (departureDate - arrivalDate) / (1000 * 60 * 60 * 24);
                          const nights = (departureDate - arrivalDate) / (24 * 60 * 60 * 1000)

                          return nights
                        })()}
                      </td>

                      <td className='p-4'>
                        {reservation.detailedUser ? reservation.detailedUser.details[0].firstName : ''}{' '}
                        {reservation.detailedUser ? reservation.detailedUser.details[0].lastName : ''}
                      </td>
                      <td className='p-4'>€{reservation.total_amount}</td>
                      <td className='p-4'>
                        {' '}
                        <div
                          className={`p-1 flex justify-center text-white rounded ${reservation.status === 'Pre Check-in' ? ' bg-blue-500' : 'bg-green-500'}`}
                        >
                          {reservation.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className='text-center p-4'>
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}

        </div>
        <Button variant='tonal' onClick={() => paymentsModalHandler()}>
            Payment
          </Button>
      </div>


      <div
        className={`fixed inset-0 z-10 transition-all duration-500 ease-in-out
          ${openPaymentModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        `}
      >
        <PaymentsModal open={openPaymentModal} modalHandler={paymentsModalHandler} />
      </div>

      {/* {openModal && (
        <PropertiesModal properties={resultList} openModal={openModal} row={row} modalHandler={modalHandler} />
      )} */}
    </>
  )
}
