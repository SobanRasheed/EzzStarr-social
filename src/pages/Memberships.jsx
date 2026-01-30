import React, { useState } from 'react';

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
    <div className="min-h-screen p-[60px_20px] bg-black">
      <h1 className="text-5xl font-light text-center mb-10 leading-tight">
        Pay less, and earn more by<br />reading and writing stories
      </h1>

      <div className="flex justify-center items-center gap-0 mb-[60px]">
        <button 
          className={`px-8 py-3 text-base font-medium border-none rounded-l-full cursor-pointer transition-all ${
            billingCycle === 'monthly' 
              ? 'bg-purple-400 text-white' 
              : 'bg-gray-900 text-gray-600'
          }`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`px-8 py-3 text-base font-medium border-none rounded-r-full cursor-pointer transition-all ${
            billingCycle === 'yearly' 
              ? 'bg-purple-400 text-white' 
              : 'bg-gray-900 text-gray-600'
          }`}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
          {billingCycle === 'yearly' && <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded">SAVE</span>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto px-5">
        {/* Free Plan */}
        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gray-900 text-gray-600">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-label="Heart icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          <h2 className="text-4xl font-semibold mb-4 text-white">Free</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            In the basic plan, users can claim and earn Spica Tokens by writing stories and referring friends.
          </p>
          
          <div className="text-5xl font-semibold mb-6 text-white">$0.00</div>
          
          <button className="w-full py-4 text-base font-semibold border-2 border-gray-900 text-white rounded-lg mb-8 cursor-pointer">Current Plan</button>
          
          <div className="border-t border-gray-900 pt-8">
            {freePlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 mb-5">
                <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${feature.included ? 'text-cyan-400' : 'text-red-500'}`}>
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
                <span className="text-base leading-relaxed text-white">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Star Membership Plan */}
        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gray-900 text-cyan-500">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-label="Star icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h2 className="text-4xl font-semibold mb-4 text-white">Star Membership</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8">
            Get 2x Spica Token rewards for writing stories, premium features, and exclusive access to special events or content
          </p>
          
          <div className="text-5xl font-semibold mb-6 text-white flex items-baseline gap-3">
            {pricing[billingCycle].price}
            <span className="text-lg text-gray-600 line-through font-normal">{pricing[billingCycle].original}</span>
          </div>
          
          <button className="w-full py-4 text-base font-semibold bg-cyan-400 text-black rounded-lg mb-8 cursor-pointer hover:bg-cyan-300 transition-colors">Upgrade</button>
          
          <div className="border-t border-gray-900 pt-8">
            {starPlanFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 mb-5">
                <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${feature.included ? 'text-cyan-400' : 'text-red-500'}`}>
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
                <span className="text-base leading-relaxed text-white">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Memberships;
