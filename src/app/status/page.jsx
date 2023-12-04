'use client';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const status_code = searchParams.get('status_code');
  const transaction_status = searchParams.get('transaction_status');

  return (
    <>
      {transaction_status === 'deny' || transaction_status === 'expire' || transaction_status === 'cancel' ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Sorry, your transaction failed</h1>
          <p className="text-2xl">Your order id is {order_id}</p>
          <p className="text-2xl">Your transaction status is {transaction_status}</p>
          <p className="text-2xl">Your status code is {status_code}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
          <p className="text-2xl">Your order id is {order_id}</p>
          <p className="text-2xl">Your transaction status is {transaction_status}</p>
          <p className="text-2xl">Your status code is {status_code}</p>
        </div>
      )}
    </>
  );
}
