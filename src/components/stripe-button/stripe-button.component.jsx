import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

import {connect} from 'react-redux';

import {emptyCartItems} from '../../redux/cart/cart.actions';


const StripeCheckoutButton = ({price, emptyCartItems}) => {
    
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HzJZNKUuYi3IgA1O62yRmeJqiLqneSe8LHHwBDHqJ7o8eJDn2vUrKeJBfdr5V3pa2MFPmdUROkhveBUm84FyRkt00FsGlHdEm';
    
    const onToken = token => {
        emptyCartItems();
        console.log(token);
        alert('Payment Successful');
    }
    
    return(
       
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        
        />
   
    );
}

const mapDispatchToProps = dispatch => ({
    emptyCartItems: () => dispatch(emptyCartItems())
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);