import React from 'react'
import GeneralDetails from './GeneralDetails'
import AddressDetails from './AddressDetails'
import ContactType from './ContactType'
import IconHome from '@/components/HomeIcon/IconHome'

function ContactForm() {
  return (
    <div className='p-2 '>
           <div className="pb-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl text-gray-500">New Contact</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <IconHome className="text-gray-500 w-8 h-8" />
            <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
              - Contact
            </div>
          </div>
        </div>
      </div>
       <div>
         <ContactType/>
        <GeneralDetails/>
        <AddressDetails/>
       </div>
      
    </div>
  )
}

export default ContactForm
