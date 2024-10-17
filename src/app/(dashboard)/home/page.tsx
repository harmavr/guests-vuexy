'use client'

import { useState } from 'react'

export default function Page() {
  const [data, setData] = useState([1, 2, 3, 4])

  return (
    <div className='w-1/3 p-8 '>
      <ul>
        {data &&
          data.map((el, index) => (
            <li className='space-y-4' key={index}>
              {el}
              {/* <ReservationDetails
            details={el}
            title={el.propertyName}
            image=""
          /> */}
            </li>
          ))}
      </ul>

      {!data || (data.length === 0 && <p> No content </p>)}
    </div>
  )
}
