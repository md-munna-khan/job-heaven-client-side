
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

// todo add a[published key
const stripePromise =loadStripe(import.meta.env.VITE_payment_Gateway_PK)
const PaymentCards = () => {
    const { amount } = useParams(); 
    console.log(amount)
    return (
        <div>
            <h2 className="text-3xl text-center">Purchase Coin</h2>
          
             
                 <Elements stripe={stripePromise}>
                 <CheckOutForm amount={amount}></CheckOutForm>
               
                 </Elements>
        </div>
    );
};

export default PaymentCards;


