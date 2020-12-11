import React, { useState } from 'react';
import { client } from '../components/CoinPaymentAuth';
import Loader from '../components/Loader';
import { MessageWithHeading } from '../components/Messages';
import validateEmail from '../utils/EmailValidator';

const HomeScreen = ({ history }) => {
  // STATES
  // This state will handle the user email in the form
  const [userEmail, setUserEmail] = useState('');

  // This state controls submit Loading
  const [loading, setLoading] = useState(false);

  // This state handles the error if any occurs
  const [error, setError] = useState('');

  // This state checks if form is valid
  const [isFormValid, setIsFormValid] = useState(true);

  // HANDLERS

  // this functions handles events when the user submits the form by pressing the enter key
  const onSubmitHandler = e => {
    e.preventDefault();
  };

  // this function handles event when the email input is change
  const onChangeHandler = e => {
    setUserEmail(e.target.value);
  };

  const createTransaction = async (amount, email, name) => {
    try {
      // show loader while request is processing
      setLoading(true);
      const transactionDetails = await client.createTransaction({
        currency1: 'USD',
        currency2: 'BTC',
        amount: amount,
        address: '',
        buyer_name: name,
        buyer_email: email,
        invoice: '',
        custom: '',
        item_name: name,
        item_number: '1',
        success_url: '/',
        cancel_url: '/',
        ipn_url: 'niceipn',
      });

      if (transactionDetails) {
        // set Loader to false if transaction finished processing
        setLoading(false);

        // Get payload from transactionDetails
        const {
          amount,
          qrcode_url,
          txn_id,
          address,
          timeout,
        } = transactionDetails;

        // Save transaction id to local storage
        localStorage.setItem('txt_id', txn_id);

        // redirect to payment screen and send payload back as state
        history.push('/transaction', {
          state: { amount, qrcode_url, txn_id, address, timeout },
        });

        console.log(transactionDetails);
      }
    } catch (error) {
      // Set error if there is one
      console.log(error);
      setError(error);

      // Set loading to false if there is an error
      setLoading(false);
    }
  };

  // this function initializes the transaction, it fires off when any of the buy now button is clicked
  const initializeTransaction = (amount, name) => {
    // Check if user enters email and if Email is valid
    if (!userEmail || !validateEmail(userEmail)) {
      setIsFormValid(false);
      document.querySelector('#email').focus();
      document.querySelector('#email').classList.add('is-invalid');
    } else {
      createTransaction(amount, userEmail, name);
    }
  };
  return (
    <div className='container'>
      <div className='row my-4'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <form onSubmit={onSubmitHandler}>
            <div className='form-group'>
              <label htmlFor='email' className='form-label '>
                Enter your email
              </label>
              <input
                type='email'
                id='email'
                className='form-control'
                onChange={onChangeHandler}
                value={userEmail}
                placeholder='Enter your email address'
                required
              />
              {!isFormValid && (
                <div className='invalid-feedback'>
                  Please enter a valid Email Address
                </div>
              )}
            </div>
          </form>
        </div>
        <div className='col-md-2 '></div>
      </div>

      {/* Show spinner if loading is true */}
      {loading && <Loader />}

      <div className='row bg-dark p-4'>
        <div className='col-md-4'>
          <div className='card text-center'>
            <img
              className='card-img-top'
              style={{ maxHeight: '200px', objectFit: 'cover' }}
              src='https://images.unsplash.com/photo-1572417884940-c24659be6068?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGJyb256ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              alt=''
            />
            <div className='card-body'>
              <h4 className='card-title'>BRONZE ($50)</h4>
              <p className='card-text'>Get the bronze statue </p>
              <button
                className=' btn btn-primary btn-block'
                onClick={e => {
                  initializeTransaction(50, 'Bronze');
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card text-center'>
            <img
              className='card-img-top'
              style={{ maxHeight: '200px', objectFit: 'cover' }}
              src='https://images.unsplash.com/photo-1606407940022-45533fea3f6c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8c2lsdmVyJTIwc3RhdHVlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60S'
              alt=''
            />
            <div className='card-body'>
              <h4 className='card-title'>SILVER ($100)</h4>
              <p className='card-text'>Get the silver statue </p>
              <button
                className=' btn btn-primary btn-block'
                onClick={e => {
                  initializeTransaction(100, 'Silver');
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div class='card text-center'>
            <img
              class='card-img-top'
              style={{ maxHeight: '200px', objectFit: 'cover' }}
              src='https://images.unsplash.com/photo-1564513438278-38bbb14f2f02?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZCUyMHN0YXR1ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              alt=''
            />
            <div class='card-body'>
              <h4 class='card-title'>GOLD ($300)</h4>
              <p class='card-text'>Get the gold statue </p>
              <button
                className=' btn btn-primary btn-block'
                onClick={e => {
                  initializeTransaction(300, 'Gold');
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show error alert if error exist */}
      {error && <MessageWithHeading></MessageWithHeading>}
    </div>
  );
};

export default HomeScreen;

// Public key
// a429df229fb47cb3ab174e8ac7e13bf704797139d6f2b60243aa3a637407a41a
// Private key
// B7452e22de3b7c19991aa2A37d15e3710Bb8Fed4EFa76881E1043929Ff4F74d8
