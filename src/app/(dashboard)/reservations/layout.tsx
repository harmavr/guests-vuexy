import React from 'react'

import ReservationsNavigationBar from '@/components/reservationsNavigationBar'

export default function ReservationsLayout({ children }) {
  return (
    <div>
      <ReservationsNavigationBar />
      {children}
    </div>
  )
}
