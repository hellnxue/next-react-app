'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

export default function CustomerName() {
  const customerNames = useSelector((state: RootState) => state.customer.customerNames);
  const customerName = customerNames[customerNames.length - 1] ?? 'No customer added';

  return <div>在customers中新添加的名字：{customerName}</div>;
}
