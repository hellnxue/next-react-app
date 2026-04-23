import { fetchInvoiceById } from '@/app/lib/data';
import InvoiceModal from '@/app/ui/invoices/modal';
import { notFound } from 'next/navigation';

export default async function ModalPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const invoice = await fetchInvoiceById(params.id);

  if (!invoice) {
    notFound();
  }

  return <InvoiceModal invoice={invoice} />;
}
