import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import PaymentCards from "./PymentCards";



// todo add a[published key
const stripePromise =loadStripe(import.meta.env.VITE_payment_Gateway_PK)
const PurchaseCoin = () => {
    return (
        <div>
            <h2 className="text-3xl text-center">Purchase Coin</h2>
             <PaymentCards></PaymentCards>
             
                 <Elements stripe={stripePromise}>
                 <CheckOutForm></CheckOutForm>
               
                 </Elements>
        </div>
    );
};



  

export default PurchaseCoin;