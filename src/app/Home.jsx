'use client';
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/courses', {
        next: {
          revalidate: 10,
        },
      });
      const jsonData = await response.json();
      setProduct(jsonData.data);
      console.log(jsonData.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkout = async ({ courseName, courseId, price }) => {
    try {
      if (!courseName || !courseId || !price) return;
      console.log(courseName, courseId, price);
      const response = await fetch('http://localhost:3000/api/v1/payment/checkout', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1c2VydGVzdDAxIiwiZW1haWwiOiJ1c2VydGVzdDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMTY5Mjc4NiwiZXhwIjoxNzAxNzc5MTg2fQ.YfTQjHne5ZR3N_mBSbUirptUyE5z33EyarWsmncHp1U',
        },
        body: JSON.stringify({
          courseName: courseName,
          courseId: courseId,
          price: price,
        }),
      });
      const jsonData = await response.json();
      window.snap.pay(jsonData.token, {
        onSuccess: async function (result) {
          console.log('Transaction is success');
          await fetch('http://localhost:3000/api/v1/payment/notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1c2VydGVzdDAxIiwiZW1haWwiOiJ1c2VydGVzdDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMTY5Mjc4NiwiZXhwIjoxNzAxNzc5MTg2fQ.YfTQjHne5ZR3N_mBSbUirptUyE5z33EyarWsmncHp1U ',
            },
            body: JSON.stringify({
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              payment_type: result.payment_type,
              transaction_time: result.transaction_time,
            }),
          });
        },
        onPending: async function (result) {
          console.log('Transaction is pending');
          await fetch('http://localhost:3000/api/v1/payment/notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1c2VydGVzdDAxIiwiZW1haWwiOiJ1c2VydGVzdDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMTY5Mjc4NiwiZXhwIjoxNzAxNzc5MTg2fQ.YfTQjHne5ZR3N_mBSbUirptUyE5z33EyarWsmncHp1U ',
            },
            body: JSON.stringify({
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              payment_type: result.payment_type,
              transaction_time: result.transaction_time,
            }),
          });
        },
        onError: async function (result) {
          console.log('Transaction is error');
          await fetch('http://localhost:3000/api/v1/payment/notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1c2VydGVzdDAxIiwiZW1haWwiOiJ1c2VydGVzdDAxQGdtYWlsLmNvbSIsImlhdCI6MTcwMTY5Mjc4NiwiZXhwIjoxNzAxNzc5MTg2fQ.YfTQjHne5ZR3N_mBSbUirptUyE5z33EyarWsmncHp1U ',
            },
            body: JSON.stringify({
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              payment_type: result.payment_type,
              transaction_time: result.transaction_time,
            }),
          });
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const temp = { status_code: '200', status_message: 'Success, transaction is found', transaction_id: '1bdd1cbe-54d8-4404-9e47-671b2f229ab4', order_id: '759874246', gross_amount: '150000.00' };

  useEffect(() => {
    getProducts();
    return () => {};
  }, []);

  return (
    <>
      <div className="flex gap-10 px-20 mx-auto">
        {product.map((item, index) => (
          <div key={index} className="p-10 border max-w-min">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.rating}</p>
            <button
              onClick={() => {
                checkout({
                  courseName: item.title,
                  courseId: item.id,
                  price: item.price,
                });
              }}
              className="px-10 py-2 font-semibold text-white bg-cyan-500"
            >
              Beli
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
