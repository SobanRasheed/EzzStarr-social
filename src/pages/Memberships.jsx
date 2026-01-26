import React, { useState } from 'react';
import './Memberships.css';

function Memberships() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const freePlanFeatures = [
    { text: 'Claim 0.00015 $SPCA Token every hour.', included: true },
    { text: 'Writer & manga artist earn extra Spica when readers engage with their content.', included: false },
    { text: 'AI voice narrator for reading stories.', included: false },
    { text: 'Generate image visuals based on stories.', included: false },
    { text: 'Access to private threads and participate in VIP events.', included: false },
    { text: 'Gain early access to new features and updates.', included: false },
    { text: 'Unlock Personalized Profile Themes', included: false }
  ];

  const starPlanFeatures = [
    { text: 'Claim 0.00025 $SPCA Token every hour.', included: true },
    { text: 'Writer & manga artist earn extra Spica when readers engage with their content.', included: true },
    { text: 'AI voice narrator for reading stories.', included: true },
    { text: 'Generate image visuals based on stories.', included: true },
    { text: 'Access to private threads and participate in VIP events.', included: true },
    { text: 'Gain early access to new features and updates.', included: true },
    { text: 'Unlock Personalized Profile Themes', included: true }
  ];

  const pricing = {
    monthly: { price: '$12.99', original: '$15.99' },
    yearly: { price: '$9.99', original: '$12.99' }
  };

  return (
    <div className="memberships-container">
      <h1 className="memberships-title">
        Pay less, and earn more by<br />reading and writing stories
      </h1>

      <div className="billing-toggle">
        <button 
          className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
          <span className="save-badge">SAVE</span>
        </button>
      </div>

      <div className="pricing-cards">
        {/* Free Plan */}
        <div className="pricing-card">
          <div className="card-icon heart-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-label="Heart icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          <h2 className="card-title">Free</h2>
          <p className="card-description">
            In the basic plan, users can claim and earn Spica Tokens by writing stories and referring friends.
          </p>
          
          <div className="card-price">$0.00</div>
          
          <button className="card-button current">Current Plan</button>
          
          <div className="features-list">
            {freePlanFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className={`feature-icon ${feature.included ? 'included' : 'excluded'}`}>
                  {feature.included ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Included">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Not included">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </span>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Star Membership Plan */}
        <div className="pricing-card">
          <div className="card-icon star-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-label="Star icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h2 className="card-title">Star Membership</h2>
          <p className="card-description">
            Get 2x Spica Token rewards for writing stories, premium features, and exclusive access to special events or content
          </p>
          
          <div className="card-price">
            {pricing[billingCycle].price}
            <span className="original-price">{pricing[billingCycle].original}</span>
          </div>
          
          <button className="card-button upgrade">Upgrade</button>
          
          <div className="features-list">
            {starPlanFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className={`feature-icon ${feature.included ? 'included' : 'excluded'}`}>
                  {feature.included ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Included">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Not included">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </span>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memberships;
