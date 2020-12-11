import React from 'react';

export const MessageWithHeading = ({ children, heading, variant }) => {
  return (
    <div className={`alert alert-${variant} my-4`} role='alert'>
      <h4 className='alert-heading'>{heading}</h4>
      <p>{children}</p>
      <p className='mb-0'></p>
    </div>
  );
};

export const Message = ({ children, variant }) => {
  return (
    <div className={`alert alert-${variant} my-4`} role='alert'>
      <p>{children}</p>
      <p class='mb-0'></p>
    </div>
  );
};

MessageWithHeading.defaultProps = {
  children:
    'There was an error initializing your transaction, please try again later, or contact our support theme',
  heading: 'Something went wrong',
  variant: 'danger',
};

Message.defaultProps = {
  children:
    'There was an error initializing your transaction, please try again letter, or contact our support theme',
  variant: 'danger',
};
