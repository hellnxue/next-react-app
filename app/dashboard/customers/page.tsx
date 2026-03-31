
'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomerName } from '@/app/lib/redux/customerSlice';

export default function Page(){
    const [customerName, setCustomerName] = useState('');
    const dispatch = useDispatch();

    return <>
    <h1>Customers</h1>
    <input type="text" placeholder="Enter customer name" id="customerName" className="border border-gray-300 rounded-md p-2" />
    <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {
        const customerName = (document.getElementById('customerName') as HTMLInputElement).value;
       setCustomerName(customerName);
       dispatch(addCustomerName(customerName));
       console.log('Customer Name:', customerName);
    }}>Add Customer</button>

    {customerName && <p className="mt-4">Customer Name: {customerName}</p>}

    <hr/>
    </>
}

 