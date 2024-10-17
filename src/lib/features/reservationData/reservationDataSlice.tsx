import { createSlice } from '@reduxjs/toolkit'

import type { ReservationData } from '../../types'

// checkboxArrival: boolean;
// FlightArrivalDate: string;
// FlightArrivalTime: string;
// LocationArrival: string;
// FlightArrivalNumber: string;
// NotesArrival: string;
// checkboxDeparture: boolean;
// FlightDepartureDate: string;
// FlightDepartureTime: string;
// LocationDeparture: string;
// FlightDepartureNumber: string;
// NotesDeparture: string;

const initialState: ReservationData = {
  data: [
    {
      propertyName: 'Villa Aroma',
      id: 1,
      tripDetails: [
        {
          arrivalDate: '2024-9-10',
          departureDate: '2024-9-11',
          arrivalCheckbox: true,
          arrivalTime: '11:50',
          arrivalLocation: '',
          arrivalFlightNumber: '',
          arrivalNotes: '',
          departureCheckbox: false,
          departureTime: '',
          departureLocation: '',
          departureFlightNumber: '10101',
          departureNotes: '123'
        }
      ],

      detailedUser: { details: [{ firstName: 'Charis', lastName: 'Mavr' }], user: 0 },
      numOfKids: 1,
      numOfAdults: 2,
      total_amount: 1000,
      status: 'Confirmed',
      city: 'Rethymno',
      kidsAges: [{ value: 2, help: false }],

      totalAmount: 0
    },
    {
      propertyName: 'Euphoria',
      id: 2,
      tripDetails: [
        {
          arrivalDate: '2024-10-20',
          departureDate: '2024-11-26',
          arrivalCheckbox: true,
          arrivalTime: '11:50',
          arrivalLocation: 'Turkey',
          arrivalFlightNumber: '111111',
          arrivalNotes: 'asd',
          departureCheckbox: true,
          departureTime: '12:50',
          departureLocation: 'Greece',
          departureFlightNumber: '10101',
          departureNotes: '123'
        }
      ],
      detailedUser: {
        details: [
          { firstName: 'Giannis', lastName: 'Zoub' },
          { firstName: 'Titos', lastName: 'Chan' }
        ],
        user: 0
      },
      numOfKids: 3,
      numOfAdults: 2,
      total_amount: 1500,
      status: 'Pre Check-in',
      city: 'Chania',
      kidsAges: [
        { value: 10, help: true },
        { value: 15, help: false },
        { value: 2, help: false }
      ]
    }
  ]
}

const reservationDataSlice = createSlice({
  name: 'reservationData',
  initialState,
  reducers: {
    saveReservationData(state, action) {
      const { resData, status } = action.payload

      console.log('saveReservation data', resData)

      state.data.push({ ...resData, status: status })

      console.log('array reservation', state.data)
    },
    changeStatus(state, action) {
      const { index } = action.payload

      console.log(index)
      state.data[index].status = 'Confirmed'
    },

    update(state, action) {
      const { propertyName, city, numOfAdults, numOfKids, kidsAges, index, arrivalDate, departureDate } = action.payload

      if (propertyName !== undefined) state.data[index].propertyName = propertyName
      if (city !== undefined) state.data[index].city = city
      if (numOfAdults !== undefined) state.data[index].numOfAdults = parseInt(numOfAdults)

      if (numOfAdults > state.data[index].detailedUser.details.length) {
        const missingUsers = numOfAdults - state.data[index].detailedUser.details.length

        for (let i = 0; i < missingUsers; i++) {
          state.data[index].detailedUser.details.push({ firstName: '', lastName: '' })
        }
      }

      if (kidsAges !== undefined) state.data[index].kidsAges = kidsAges

      if (numOfKids !== undefined) {
        if (numOfKids > state.data[index].kidsAges.length) {
          const missingKids = numOfKids - state.data[index].kidsAges.length

          for (let i = 0; i < missingKids; i++) {
            state.data[index].kidsAges.push({ value: 0, help: false })
          }
        }

        state.data[index].numOfKids = numOfKids
      }

      if (arrivalDate !== undefined) state.data[index].tripDetails[0].arrivalDate = arrivalDate
      if (departureDate !== undefined) state.data[index].tripDetails[0].departureDate = departureDate
    },

    saveKids(state, action) {
      const { help, kids, index, row } = action.payload

      console.log(action.payload)

      // while (state.data[index].kidsAges.length <= index) {
      //   state.data[index].kidsAges.push({ value: 0, help: false });
      // }
      // state.data[index].kidsAges[kidId] = { value: age, help };
      console.log(kids)

      // console.log(state.data[row - 1].propertyName);

      state.data[row - 1].kidsAges = kids

      console.log(state.data[row - 1].kidsAges[index])

      // console.log(state.data[row - 1].kidsAges[0].value);

      // console.log(state.data[row - 1].kidsAges[0].value);
    },

    saveData(state, action) {
      const { firstName, lastName, index, row } = action.payload

      console.log(action.payload)

      if (index >= 0) {
        state.data[row - 1].detailedUser.details[index] = { firstName, lastName }
        state.data[row - 1].detailedUser.user++
      } else {
        console.error('Invalid index')
      }

      console.log(state.data[row - 1].detailedUser.details[index])
    },

    saveHelpForKids(state, action) {
      const { row, kidId, help } = action.payload

      state.data[row - 1].kidsAges[kidId].help = help
    },

    saveTravelDetails(state, action) {
      const { row, data } = action.payload

      console.log(row, data)

      state.data[row - 1].tripDetails[0] = data

      console.log(state.data[row - 1].tripDetails[0])
    }
  }
})

export const reservationDataActions = reservationDataSlice.actions
export default reservationDataSlice.reducer
