'use client'

import React, { useState } from 'react'

import HorizontalNav, { Menu, MenuItem } from '@/@menu/horizontal-menu'
import { useAppDispatch } from '@/lib/hooks'
import { reservationsTabActions } from '@/lib/features/reservationsTab/reservationsTabSlice'

export default function PaymentsNavigationBar() {
  const [tab, setTab] = useState(0)

  const dispatch = useAppDispatch()

  const tabHandler = selectedTab => {
    setTab(selectedTab)
    dispatch(reservationsTabActions.setReservationTab({ selectedTab: selectedTab }))

    console.log(tab)
  }

  return (
    <div className={'flex items-center plb-2.5 pli-6 w-full'}>
      <HorizontalNav>
        <Menu>
          <MenuItem onClick={() => tabHandler(1)} className={tab === 1 ? ` border-2 bg-slate-600` : ``}>
            Upload CSV
          </MenuItem>
          <MenuItem onClick={() => tabHandler(2)} className={tab === 2 ? ` border-2 bg-slate-600` : ``}>
            {' '}
            Transaction
          </MenuItem>
        </Menu>
      </HorizontalNav>
    </div>
  )
}
