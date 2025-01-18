
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

  


// todo add a[published key
const stripePromise =loadStripe(import.meta.env.VITE_payment_Gateway_PK)
const PaymentCards = () => {
    return (
        <div>
            <h2 className="text-3xl text-center">Purchase Coin</h2>
          
             
                 <Elements stripe={stripePromise}>
                 <CheckOutForm></CheckOutForm>
               
                 </Elements>
        </div>
    );
};

export default PaymentCards;



// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckOutForm from "./CheckOutForm";
// import { useParams } from "react-router-dom";


// const Payment = () => {
//     const { amount } = useParams(); 
//     const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

//     return (
//         <div>
//             <div>
//                 <Elements stripe={stripePromise}>
//                     <CheckOutForm amount={amount}></CheckOutForm>
//                 </Elements>
//             </div>
//         </div>
//     );
    
    