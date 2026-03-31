
'use client';
import { useState } from 'react';
import { useCustomerStore } from '@/app/lib/store';
export default function Page(){

    const [customerName, setCustomerName] = useState('');
    const addCustomerName = useCustomerStore((state) => state.addCustomerName);
    return <>
    <h1>Customers</h1>
    <input type="text" placeholder="Enter customer name" id="customerName" className="border border-gray-300 rounded-md p-2" />
    <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {
        const customerName = (document.getElementById('customerName') as HTMLInputElement).value;
       setCustomerName(customerName);
       addCustomerName(customerName);
       console.log('Customer Name:', customerName);
    }}>Add Customer</button>

    {customerName && <p className="mt-4">Customer Name: {customerName}</p>}

    <hr/>
    <Mobile />
    </>
}

function Mobile() {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleAdd =() => {
            const mobileNumber = (document.getElementById('mobileNumber') as HTMLInputElement).value;
            setMobileNumber(mobileNumber);
            console.log('Mobile Number:', mobileNumber);
         }

    return (
        <div>
            <h1>Mobile Number Input</h1>
            <input
                type="text"
                placeholder="Enter mobile number"
                id='mobileNumber'
                className="border border-gray-300 rounded-md p-2"
            />

             <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAdd}>Add Mobile Number</button>
                {mobileNumber && <p className="mt-4">Mobile Number: {mobileNumber}</p>}
        </div>
    );
}