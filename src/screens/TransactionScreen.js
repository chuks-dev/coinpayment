import React, { useState } from 'react';
import { client } from '../components/CoinPaymentAuth';
import Loader from '../components/Loader';
import { Message, MessageWithHeading } from '../components/Messages';
import convertTimeStampToDate from '../utils/ConvertTimeStamp';
import { Link } from 'react-router-dom';

const TransactionScreen = props => {
  const {
    amount,
    qrcode_url,
    txn_id,
    address,
    timeout,
  } = props.location.state.state;

  // This state handles transaction status details
  const [transactionStatus, setTransactionStatus] = useState({
    amountf: '',
    coin: '',
    payment_address: '',
    receivedf: null,
    status: null,
    status_text: '',
    time_created: null,
    time_expires: null,
  });

  // This state handles the error if any occurs
  const [error, setError] = useState('');

  // This state handles loading while transaction status is being fetched
  const [loading, setLoading] = useState(false);

  // showTransactionStatusHandler
  const showTransactionStatus = async () => {
    try {
      setLoading(true);
      const statusResponse = await client.getTx({ txid: txn_id, full: 0 });
      if (statusResponse) {
        setLoading(false);
        const {
          amountf,
          coin,
          payment_address,
          receivedf,
          status,
          status_text,
          time_created,
          time_expires,
        } = statusResponse;
        setTransactionStatus({
          amountf,
          coin,
          payment_address,
          receivedf,
          status,
          status_text,
          time_created,
          time_expires,
        });
        console.log(transactionStatus);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='row my-4'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <Link className='btn btn-light' to='/'>
            Go back
          </Link>
          <div class='card text-center p-4  '>
            <div>
              <img
                class='card-img-top text-center'
                src={qrcode_url}
                alt=''
                style={{ width: '150px' }}
              />
            </div>
            <div class='card-body'>
              <h4 class='card-title'>
                Pay <u>{amount}</u> BTC to this Bitcoin address
              </h4>
              <Message variant='success'>{address}</Message>
              <pre> This transaction expires in {timeout / 3600} hrs</pre>
            </div>
          </div>
        </div>

        <div className='col-md-2'></div>
      </div>

      {/* {status} */}
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
          <div className='card p-5'>
            <h2>Transaction Status</h2>
            <div className='my-2'>
              <p>
                <strong>Total Amount</strong>: {transactionStatus.amountf}
              </p>
            </div>
            <div className='my-2'>
              <p>
                <strong>Amount Paid</strong>: {transactionStatus.receivedf}
              </p>
            </div>
            <div className='my-2'>
              <p>
                <strong>Payment Address</strong>:{' '}
                {transactionStatus.payment_address}
              </p>
            </div>

            <div className='my-2'>
              <p>
                <strong>Status</strong>: {transactionStatus.status_text}
              </p>
            </div>

            <div className='my-2'>
              <p>
                <strong>coin</strong>: {transactionStatus.coin}
              </p>
            </div>

            <div className='my-2'>
              <p>
                <strong>Time Initiated</strong>:{' '}
                {transactionStatus.time_created !== null
                  ? convertTimeStampToDate(transactionStatus.time_created)
                  : ''}
              </p>
            </div>
            <div className='my-2'>
              <p>
                <strong>Expires at</strong>:
                {transactionStatus.time_expires !== null
                  ? convertTimeStampToDate(transactionStatus.time_expires)
                  : ''}
              </p>
            </div>

            {/* show loader if loading is true */}
            {loading && <Loader />}
            {/* Show error alert if error exist */}
            {error && (
              <MessageWithHeading>
                There was an error getting your transaction status. Please try
                again later or contact our support
              </MessageWithHeading>
            )}
            <button
              className='btn btn-primary'
              data-toggle='modal'
              onClick={showTransactionStatus}
              data-target='#transactionStatus'
            >
              Check transaction status
            </button>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  );
};

export default TransactionScreen;
