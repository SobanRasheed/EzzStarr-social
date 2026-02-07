import { useState } from 'react';

export default function SpicaMembership() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const features = {
    free: [
      { text: 'Earn ', highlight: billingCycle === 'yearly' ? '0.00006 SPCA' : '0.00005 SPCA', textAfter: ' Token per quiz.', available: true },
      { text: '', highlight: 'Creators Earn SPCA', textAfter: ' for every content they publish.', available: true },
      { text: '', highlight: 'AI Voice Narrator', textAfter: ' brings every chapter to life.', available: false },
      { text: '', highlight: 'Generate image visuals', textAfter: ' from scenes inside stories.', available: false },
      { text: 'Access to participate in exclusive ', highlight: 'VIP events.', textAfter: '', available: false },
      { text: 'Early access to ', highlight: 'new platform features', textAfter: ' and Updates.', available: false },
      { text: 'Unlock Personalized ', highlight: 'Profile Themes.', textAfter: '', available: false },
      { text: 'Receive ', highlight: '0 SPCA', textAfter: ' each month.', available: false }
    ],
    star: [
      { text: 'Earn ', highlight: billingCycle === 'yearly' ? '0.00018 SPCA' : '0.00015 SPCA', textAfter: billingCycle === 'yearly' ? ' Token per quiz (3x Free tier).' : ' Token per quiz (3x Free tier).', available: true },
      { text: '', highlight: 'Creators earn 20%', textAfter: ' more SPCA on every published content + 2x visibility boost.', available: true },
      { text: '', highlight: 'AI Voice Narrator', textAfter: ' brings every chapter to life.', available: true },
      { text: '', highlight: 'Generate image visuals', textAfter: ' from scenes inside stories.', available: true },
      { text: 'Access to participate in exclusive ', highlight: 'VIP events.', textAfter: '', available: true },
      { text: 'Early access to ', highlight: 'new platform features', textAfter: ' and Updates.', available: true },
      { text: 'Unlock Personalized ', highlight: 'Profile Themes.', textAfter: '', available: true },
      { text: 'Receive ', highlight: '2,000 SPCA FREE', textAfter: ' each month as a loyalty bonus.', available: true }
    ],
    nft: [
      { text: 'NFT holders receive ', highlight: 'tier-based benefits', textAfter: ' across three exclusive NFTs.', available: true },
      { text: '', highlight: 'Verified star badge', textAfter: ' displayed on profile (Lifetime).', available: true },
      { text: 'Access to ', highlight: 'exclusive drops, IRL collectibles,', textAfter: ' and VIP events.', available: true },
      { text: 'Early access to ', highlight: 'beta apps, metaverse,', textAfter: ' and game ecosystems.', available: true },
      { text: 'Entry into ', highlight: 'private discord lounges', textAfter: ' and holder-only experiences.', available: true },
      { text: '', highlight: 'Cross-platform privileges', textAfter: ' across all Ezzstar products.', available: true },
      { text: 'Receive ', highlight: 'SPCA based on NFT signature tier.', textAfter: '', available: true },
      { text: 'Enjoy limited ', highlight: 'free membership access', textAfter: ' based on your NFT tier.', available: true }
    ]
  };

  const faqs = [
    {
      question: 'What is Ezzstar Social?',
      answer: 'Ezzstar Social is a creator and gamer platform where you can share content, participate in event, upgrade your profile, earn Spica, and boost your visibility and growth.'
    },
    {
      question: 'How do i earn Spica on the platform ?',
      answer: 'You can earn Spica by posting content, views, receiving tips from audience, reading your favorite content, engaging with the community, and participating in events.'
    },
    {
      question: 'What is the NFT Signature, and why is it important?',
      answer: 'Your NFT Signature acts as your identity badge on the platform. It unlocks limited free membership, higher earning advantages, exclusive features, and premium access.'
    },
    {
      question: 'Do I need crypto knowledge to use Ezzstar Social?',
      answer: 'No. Everything runs in the background. You can post, participate, earn, and grow naturally. crypto features are optional and simplified.'
    },
    {
      question: 'Can I use another payment option to receive tips?',
      answer: 'Yes. You can add your own payment link to receive tips directly from your audience. The "Buy Me a Coffee" option is already available on your profile as well.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans relative pt-10">
      <div className='absolute -top-20 w-full bg-black h-22' />

      <div className="mx-auto py-16 px-10 ">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[55px] font-normal leading-tight max-w-[550px] tracking-[-0.02em]">
              Pay less, and earn more by reading and writing stories
            </h1>

            <div className="inline-flex gap-0">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-7 py-2.5 rounded-l-full text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-gradient-to-r from-[#E91E8C] to-[#9333EA] text-white' : 'bg-transparent text-gray-400 border-r border-white/10'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-7 py-2.5 rounded-r-full text-sm font-semibold flex items-center gap-2 transition-all ${billingCycle === 'yearly' ? 'bg-gradient-to-r from-[#E91E8C] to-[#9333EA] text-white' : 'bg-transparent text-gray-400'}`}
              >
                Yearly
                <span className={`${billingCycle === 'yearly' ? 'bg-white/25 text-white' : 'bg-[#9333EA]/30 text-[#9333EA]'} px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-[0.5px]`}>
                  SAVE
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          <div className="bg-white/5 border hover:scale-105 transition-all border-white/10 rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">Free</h2>
              <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-xs text-gray-400">Current Plan</span>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the basic plan, users can claim and earn Spica Tokens by writing stories and referring friends.</p>

            <div className="text-[42px] font-extrabold mb-7">$00.00</div>

            <div className="flex flex-col gap-3">
              {features.free.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${feature.available ? 'bg-emerald-500 text-white' : 'bg-red-200 text-red-500'}`}>
                    {feature.available ? '✓' : '×'}
                  </span>
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#E91E8C] font-semibold">{feature.highlight}</span>
                    {feature.textAfter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border hover:scale-105 transition-all border-white/10 rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">Star Membership</h2>
              <button className="bg-[#00D9A3] border-none px-5 py-2 rounded-full text-black text-sm font-bold cursor-pointer">Upgrade</button>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the star plan, users unlock higher Spica rewards, advanced AI tools, and creator features.</p>

            <div className="text-[42px] font-extrabold mb-7">${billingCycle === 'yearly' ? '99.99' : '12.99'}</div>

            <div className="flex flex-col gap-3">
              {features.star.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${feature.available ? 'bg-emerald-500 text-white' : 'bg-red-200 text-red-500'}`}>
                    {feature.available ? '✓' : '×'}
                  </span>
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#E91E8C] font-semibold">{feature.highlight}</span>
                    {feature.textAfter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border hover:scale-105 transition-all border-white/10 rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">NFT Signature</h2>
              <button className="bg-gradient-to-r from-[#E91E8C] to-[#9333EA] px-5 py-2 rounded-full text-white text-sm font-bold cursor-pointer">Unlock Now</button>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the elite tier, NFT holders gain tier-based rewards, exclusive perks, and early access to VIP events.</p>

            <div className="text-[42px] font-extrabold mb-2">Elite Access</div>

            <div className="flex flex-col gap-3">
              {features.nft.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${feature.available ? 'bg-[#00D9A3] text-black' : 'bg-red-200 text-red-500'}`}>
                    {feature.available ? '◆' : '×'}
                  </span>
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#00D9A3] font-semibold">{feature.highlight}</span>
                    {feature.textAfter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4 tracking-[-0.02em]">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-base mb-8 max-w-[700px] mx-auto">Unleashing clarity and empowering decision-making. Find in-depth answers and gain deeper understanding.</p>
          <button className="bg-gradient-to-r from-[#E91E8C] to-[#9333EA] px-6 py-3 rounded-2xl text-white text-sm font-bold mb-12">Support Center</button>

          <div className="max-w-[900px] mx-auto text-left">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg mb-4 overflow-hidden">
                <div onClick={() => toggleFaq(index)} className="px-7 py-6 flex justify-between items-center cursor-pointer">
                  <span className="text-base font-semibold">{faq.question}</span>
                  <button className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-lg transition-all ${openFaqIndex === index ? 'bg-[#E91E8C] text-white' : 'bg-transparent text-white'}`}>
                    {openFaqIndex === index ? '×' : '+'}
                  </button>
                </div>
                {openFaqIndex === index && (
                  <div className="px-7 pb-6 text-gray-400 text-sm leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}