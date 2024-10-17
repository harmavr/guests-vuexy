'use client'

import { useSelector } from 'react-redux'

import DisplayReservations from '../../../components/displayReservations'
import CreateReservations from '@/components/createReservations'

export default function Page() {
  const tab = useSelector(state => state.reservationsTab.tab)

  return (
    <>
      <div>
        {tab == 1 && <DisplayReservations />}
        {tab == 2 && <CreateReservations />}
      </div>
    </>
  )
}
