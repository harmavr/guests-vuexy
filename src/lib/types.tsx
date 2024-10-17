export interface DetailedUser {
  details: [{ firstName: string; lastName: string }]
  user: number
}

export interface TripDetail {
  checkboxArrival: boolean
  FlightArrivalDate: string
  FlightArrivalTime: string
  LocationArrival: string
  FlightArrivalNumber: string
  NotesArrival: string
  checkboxDeparture: boolean
  FlightDepartureDate: string
  FlightDepartureTime: string
  LocationDeparture: string
  FlightDepartureNumber: string
  NotesDeparture: string
}

export interface Trip {
  arrivalCheckbox: boolean
  arrivalDate: string
  arrivalTime: string
  arrivalLocation: string
  arrivalFlightNumber: string
  arrivalNotes: string
  departureCheckbox: boolean
  departureDate: string
  departureTime: string
  departureLocation: string
  departureFlightNumber: string
  departureNotes: string
}

export interface userData {
  propertyName: string
  city: string
  numOfAdults: number
  id: number
  status: string
  total_amount: number
  numOfKids: number
  kidsAges: { value: number; help: boolean }[]
  page: number
  detailedUser: DetailedUser
  errors: {
    propertyNameError: boolean
    cityError: boolean
    numOfAdultsError: boolean
  }

  // errors2: {
  //   firstName: boolean;
  //   lastName: boolean;
  // };
  weAreFreeToGo: boolean
  tripDetails: TripDetail[]
}

export interface Reservation {
  items: userData[]
}

export interface Properties {
  name: string
  id: number
  details: string
  city: string
  nights: number
  visitor: string
  total_amount: number
  status: string
}

export interface Verification {
  keyAccess: number
  access: boolean
}

export interface Transaction {
  paymentMethod: string
  transactionNumber: number
  date: string
  account: string
  company: string
  description: string
  total: number
}

export interface TransactionList {
  items: Transaction[]
}

export interface ReservationData {
  data: [
    {
      propertyName: string
      id: number
      city: string
      tripDetails: Trip[]
      detailedUser: DetailedUser
      kidsAges: { value: number; help: boolean }[]
      numOfKids: number
      totalAmount: number
      numOfAdults: number
      total_amount: number
      status: string
    }
  ]
}

export interface UserLogin {
  loggedInUser: { firstName: string; lastName: string }
  userCredentials: [
    {
      firstName: string
      lastName: string
      email: string
      password: string
    }
  ]
}
