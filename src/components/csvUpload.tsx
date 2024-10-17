import React, { useState } from 'react'

import Image from 'next/image'

import Papa from 'papaparse'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

// import ExcelIcon from '../../../public/excel.png'

const CSVUpload = () => {
  const [csvData, setCsvData] = useState([])
  const [fileName, setFileName] = useState('')
  const dispatch = useDispatch()

  const closeModal = (openModal: boolean, modalHandler: (arg0: boolean) => void) => {
    modalHandler(!openModal)
  }

  const handleFileUpload = (event: { target: { files: any[] } }) => {
    const file = event.target.files[0]

    if (!file) return

    setFileName(file.name)

    const reader = new FileReader()

    reader.onload = function (e) {
      const csvText = e.target?.result

      // Use PapaParse to parse the CSV file
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const parsedData = results.data.map((row: any) => ({
            ...row,

            // Ensure 'detailedUser' and 'tripDetails' fields are arrays if they're not already
            detailedUser: row.detailedUser ? JSON.parse(row.detailedUser) : [],
            tripDetails: row.tripDetails ? JSON.parse(row.tripDetails) : [],
            kidsAges: row.kidsAges ? JSON.parse(row.kidsAges) : []
          }))

          setCsvData(parsedData)
          console.log(csvData)
        },
        error: function (error) {
          console.error('Error while parsing CSV:', error)
        }
      })
    }

    reader.readAsText(file)
  }

  const handleSaveData = () => {
    if (csvData.length) {
      // Dispatch the data to the Redux store
      dispatch(reservationActions.saveReservationFromCSV({ formData: csvData }))
      console.log('Data saved to Redux:', csvData)
    }

    const AppReactDropzone = styled(Box)<BoxProps>(({ theme }) => ({
      // Custom styles for the React Dropzone...
    }))

    // closeModal(open, modalHandler);
  }

  return (
    <div className='flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Upload CSV File</h2>

      <input
        type='file'
        accept='.csv'
        onChange={handleFileUpload}
        className='block w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer p-2 mb-4'
      />

      <button
        onClick={handleSaveData}
        disabled={!csvData.length}
        className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
          csvData.length ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Save Data
      </button>

      {csvData.length > 0 && (
        <div className='preview-section mt-6 w-full max-w-3xl'>
          {/* Display CSV Icon next to file name */}
          <div className='flex items-center mb-4 p-4 bg-white rounded-lg shadow'>
            {/* <Image src={ExcelIcon} alt='CSV Icon' className='w-12 h-12 mr-4' /> */}
            <span className='text-lg font-medium text-gray-700'>{fileName}</span>
          </div>

          {/* Preview CSV Data
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
            <pre className="text-sm text-gray-600">
              {JSON.stringify(csvData, null, 2)}
            </pre>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default CSVUpload
