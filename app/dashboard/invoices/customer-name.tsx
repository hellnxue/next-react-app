'use client';
import { useCustomerStore } from '@/app/lib/store';

export default function CustomerName() {
  const customerNames = useCustomerStore((state) => state.customerNames);
  const customerName = customerNames[customerNames.length - 1] ?? 'No customer added';

  return <div>在customers中新添加的名字：{customerName}</div>;
}
