import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import PaymentProcess from '../PaymentProcess/PaymentProcess';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }

    fetch('http://localhost:5000/addOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
          alert("Order placed successfully");
        }
      })

  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter your name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter your email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="phoneNumber" ref={register({ required: true })} placeholder="Enter your phoneNumber" />
          {errors.phoneNumber && <span className="error">phoneNumber is required</span>}

          <input name="Address" ref={register({ required: true })} placeholder="Enter your Address" />
          {errors.Address && <span className="error">Address is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div className="col-md-6">
        <PaymentProcess></PaymentProcess>
      </div>
    </div>
  );
};

export default Shipment;