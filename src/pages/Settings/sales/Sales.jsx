import React from 'react'

import IconHome from '@/components/HomeIcon/IconHome'
import SalesSetting from './SalesSetting'
import SalesTerms from './SalesTerms'
import CustomerCategory from './CustomerCategory'

function Sales() {
  return (
    <div className=''>
      <div className=" p-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl text-gray-500">Sales</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <IconHome className="text-gray-500 w-8 h-8" />
            {/* <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
              - Contact
            </div> */}
          </div>
        </div>
      </div>
      <div className='rounded-t p-2'>
        <SalesSetting />
        <SalesTerms />
        <CustomerCategory />
      </div>

    </div>
  )
}

export default Sales
