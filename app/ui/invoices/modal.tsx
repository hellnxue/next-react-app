'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/app/lib/utils';

export default function InvoiceModal({
  invoice,
}: {
  invoice: {
    id: string;
    customer_id: string;
    amount: number;
    status: string;
  } | null;
}) {
  const router = useRouter();

  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-xl font-semibold">Invoice Details</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Invoice ID</span>
            <span className="font-mono text-sm">{invoice.id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Amount</span>
            <span className="font-semibold">{formatCurrency(invoice.amount)}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Status</span>
            <span className={`rounded-full px-2 py-1 text-xs ${
              invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
              invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/dashboard/invoices/${invoice.id}/edit`}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Edit Invoice
          </Link>
          <button
            onClick={() => router.back()}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
