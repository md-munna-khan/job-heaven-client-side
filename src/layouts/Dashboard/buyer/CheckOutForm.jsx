
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckOutForm = ({ amount }) => {

    const {getUserRole, user,refetch, setUserInfo } = useAuth();
    const navigate = useNavigate();
const axiosSecure=useAxiosSecure()
    const stripe = useStripe();
    const elements = useElements();
    const amountInCents = parseInt(amount);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        setIsLoading(true); // Start loading

        try {
            // Get clientSecret from the backend
            const { data } = await axiosSecure.post(`/create-payment-intent`, {
                amount: amountInCents,   
            });
           
            // const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            //     amount: amountInCents,   
            // });
           

            const clientSecret = data.clientSecret;

            // Confirm the payment
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.email,
                    },
                },
               
            });
            toast.success("Payment Successful!", { position: "top-right" });

            if (error) {
                console.error("Payment Error:", error);
                toast.error("Payment Failed. Please try again.");
            } 
    
        

    else if (paymentIntent && paymentIntent.status === "succeeded") {
        
        toast.success("Payment Successful!");
       
    
        try {
           axiosSecure.post(`/payment-success/${user.email}`, {
                paymentId: paymentIntent.id,
                amount: paymentIntent.amount,
        //    axios.post(`${import.meta.env.VITE_API_URL}/payment-success/${user.email}`, {
        //         paymentId: paymentIntent.id,
        //         amount: paymentIntent.amount,
            })
            .then(res=>{
                console.log(res)
                toast.success('coins added successfully')
                refetch()
               setUserInfo()
                getUserRole()
                navigate('/dashboard/payment-history');
            })
          
        } catch (err) {
            toast.error("Payment recorded successfully, but failed to update backend.");

        }
    }
} catch (err) {
    console.error("Error during payment:", err);
    toast.error("Something went wrong. Please try again.");
} 
    
        finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Complete Your Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border rounded-lg p-4">
                    <CardElement className="focus:outline-none text-gray-700" />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ${
                        isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {isLoading ? "Processing..." : `Pay $${(amountInCents / 100).toFixed(2)}`}
                </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
                Payments are secure and encrypted.
            </p>
        </div>
    );
};

export default CheckOutForm;




 