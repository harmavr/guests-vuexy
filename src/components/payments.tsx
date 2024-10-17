import React, { useEffect } from 'react'

import type { Transaction } from '../lib/types'

interface PaymentsProps {
  element: Transaction
  index: number
}

export default function Payments({ element, index }: PaymentsProps) {
  useEffect(() => {
    console.log(element, index)
  }, [element, index])

  return (
    <div>
      <h2>Transaction {index + 1}</h2>
      {/* <p>Account: {element.account}</p>
      <p>Payment Method: {element.paymentMethod}</p>
      <p>Transaction Number: {element.transactionNumber}</p>

      <p>Company: {element.company}</p>
      <p>Date: {element.date}</p>
      <p>Description: {element.description}</p> */}
      <div className='flex justify-between border-2 bg-gray-200'>
        <p>Total:</p>
        <p>${element.total}</p>
      </div>
    </div>
  )
}
