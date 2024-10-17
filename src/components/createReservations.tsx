import React, { useEffect, useRef } from 'react'

import { Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { reservationDataActions } from '@/lib/features/reservationData/reservationDataSlice'
import CustomTextField from '@/@core/components/mui/TextField'

export default function CreateReservation() {
  const formRefs = useRef([])
  const array = useAppSelector(state => state.reservationData.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(array)
  })

  const inputFields = [
    { name: 'Property Name', type: 'text' },
    { name: 'City', type: 'text' },
    { name: 'Arrival Date', type: 'date' },
    { name: 'Departure Date', type: 'date' },
    { name: 'Visitor First Name', type: 'text' },
    { name: 'Visitor Last Name', type: 'text' },
    { name: 'Total Amount', type: 'number' }
  ]

  const handleSubmit = e => {
    e.preventDefault()

    const newReservation = {
      propertyName: formRefs.current[0].value,
      city: formRefs.current[1].value,
      tripDetails: [
        {
          arrivalDate: formRefs.current[2].value,
          departureDate: formRefs.current[3].value,
          arrivalCheckbox: false,
          arrivalTime: '',
          arrivalLocation: '',
          arrivalFlightNumber: '',
          arrivalNotes: '',
          departureCheckbox: false,
          departureTime: '',
          departureLocation: '',
          departureFlightNumber: '',
          departureNotes: ''
        }
      ],
      id: array.length + 1,
      detailedUser: {
        details: [
          {
            firstName: formRefs.current[4].value,
            lastName: formRefs.current[5].value
          }
        ],
        user: 0
      },
      kidsAges: [],
      total_amount: parseFloat(formRefs.current[6].value) || 0,
      numOfAdults: 1,
      numOfKids: 0
    }

    dispatch(reservationDataActions.saveReservationData({ resData: newReservation, status: 'Pre Check-in' }))
  }

  return (
    <div className='pt-5 max-w-xl '>
      <form className='flex flex-col gap-5'>
        <h2 className='text-lg font-bold mb-4'>Create Reservation</h2>
        <div className='grid grid-cols-1 gap-4'>
          {inputFields.map((field, index) => (
            <CustomTextField
              key={index}
              type={field.type}
              fullWidth
              label={field.name}
              placeholder={field.name}
              ref={el => (formRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className='pt-4'>
          <Button variant='tonal' onClick={handleSubmit}>
            Save reservation
          </Button>
        </div>
      </form>
    </div>
  )
}
