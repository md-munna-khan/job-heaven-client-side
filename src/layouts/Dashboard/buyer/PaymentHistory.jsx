
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const PaymentHistory = () => {
    const { user } = useAuth();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/payment-history/${user?.email}`);
                setPaymentHistory(data);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        };

        fetchPaymentHistory();
    }, [user?.email]);


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Payment ID</th>
                            <th className="border border-gray-300 px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(payment.date).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{payment.paymentId}</td>
                                <td className="border border-gray-300 px-4 py-2">${(payment.amount / 100).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




 

export default PaymentHistory;