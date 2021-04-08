import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplictCardForm from './SplictCardForm';


const stripePromise = loadStripe('pk_test_51Ie0lgCkxwlcOa2ZmCBqqExjK2TPigJYrugp8zFFBC59UffHMVUez3CEVoVcj3vaSQVkTyvIlEAYSEkkZMbT3ADy00yYtiatB6');


const PaymentProcess = () => {
    return (
        <div style={{border:"5px solid tomato", borderRadius:"5px",  marginTop:"30px",padding:"50px"}} >
            <h2>Payment Option</h2>
            <Elements stripe={stripePromise}>
              {/* <SplictCardForm></SplictCardForm> */}
            <SimpleCardForm></SimpleCardForm>
            {/* <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            /> */}
        </Elements>
        </div>
    );
};

export default PaymentProcess;