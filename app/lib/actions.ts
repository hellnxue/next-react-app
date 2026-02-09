'use server';

import { z } from 'zod';
import postgres from 'postgres';
import console from 'console';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {

    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
      // Test it out:
    //   console.log(rawFormData);

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
      
      await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // We'll also log the error to the console for now
      console.error(error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }


      console.log('Invoice created!');
      // 调用 revalidatePath 以清除客户端缓存并发出新的服务器请求。
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');

}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  //revalidatePath 函数用于清除客户端缓存，并重新获取最新的数据。当调用此函数时，Next.js 会自动处理缓存失效和重新渲染的问题。
  //在这个例子中，它将会触发新的服务器请求，并重新渲染表格。
  revalidatePath('/dashboard/invoices');
}