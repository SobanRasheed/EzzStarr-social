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
          {/* Free Card */}
          <div className="bg-[#0d110f] hover:scale-105 transition-all rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">Free</h2>
              <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-xs text-gray-400">Current Plan</span>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the basic plan, users can claim and earn Spica Tokens by writing stories and referring friends.</p>

            <div className="text-[42px] font-extrabold mb-7">$00.00</div>

            <div className="flex flex-col gap-3">
              {features.free.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  {feature.available ? (
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <circle cx="13" cy="13" r="13" fill="#181C2B" fillOpacity="0.9"/>
                      <circle cx="13" cy="13" r="12.5" stroke="#AD7AFF" strokeOpacity="0.12"/>
                      <path d="M13.3404 13.5082C11.9554 14.8918 9.71119 14.8912 8.32689 13.507C8.19185 13.3719 8.0087 13.296 7.81773 13.296C7.62675 13.296 7.4436 13.3719 7.30856 13.507C7.17352 13.642 7.09766 13.8251 7.09766 14.0161C7.09766 14.1107 7.11628 14.2043 7.15247 14.2917C7.18866 14.379 7.2417 14.4584 7.30856 14.5253L10.3274 17.5442C10.6091 17.8258 11.0641 17.8258 11.3458 17.5442L18.9869 9.90307C19.1219 9.76803 19.1978 9.58487 19.1978 9.3939C19.1978 9.20292 19.1219 9.01977 18.9869 8.88473C18.8519 8.74969 18.6687 8.67383 18.4777 8.67383C18.2868 8.67383 18.1036 8.74969 17.9686 8.88473L13.3404 13.5082Z" fill="#AD7AFF"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <circle cx="13" cy="13" r="13" fill="#181C2B" fillOpacity="0.9"/>
                      <circle cx="13" cy="13" r="12.5" stroke="#FD3C3C" strokeOpacity="0.12"/>
                      <path d="M18 8L8 18M8 8L18 18" stroke="#FD3C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#DF28E2] font-semibold">{feature.highlight}</span>
                    {feature.textAfter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Star Membership Card */}
          <div className="bg-[#0d110f] hover:scale-105 transition-all rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">Star Membership</h2>
              <button className="bg-[#01F1E3] border-none px-5 py-2 rounded-full text-black text-sm font-bold cursor-pointer">Upgrade</button>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the star plan, users unlock higher Spica rewards, advanced AI tools, and creator features.</p>

            <div className="text-[42px] font-extrabold mb-7">${billingCycle === 'yearly' ? '99.99' : '12.99'}</div>

            <div className="flex flex-col gap-3">
              {features.star.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  {feature.available ? (
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <circle cx="13" cy="13" r="13" fill="#181C2B" fillOpacity="0.9"/>
                      <circle cx="13" cy="13" r="12.5" stroke="#AD7AFF" strokeOpacity="0.12"/>
                      <path d="M13.3404 13.5082C11.9554 14.8918 9.71119 14.8912 8.32689 13.507C8.19185 13.3719 8.0087 13.296 7.81773 13.296C7.62675 13.296 7.4436 13.3719 7.30856 13.507C7.17352 13.642 7.09766 13.8251 7.09766 14.0161C7.09766 14.1107 7.11628 14.2043 7.15247 14.2917C7.18866 14.379 7.2417 14.4584 7.30856 14.5253L10.3274 17.5442C10.6091 17.8258 11.0641 17.8258 11.3458 17.5442L18.9869 9.90307C19.1219 9.76803 19.1978 9.58487 19.1978 9.3939C19.1978 9.20292 19.1219 9.01977 18.9869 8.88473C18.8519 8.74969 18.6687 8.67383 18.4777 8.67383C18.2868 8.67383 18.1036 8.74969 17.9686 8.88473L13.3404 13.5082Z" fill="#AD7AFF"/>
                    </svg>
                  ) : (
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-red-200 text-red-500">
                      ×
                    </span>
                  )}
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#DF28E2] font-semibold">{feature.highlight}</span>
                    {feature.textAfter}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NFT Signature Card */}
          <div className="bg-[#0B0312] hover:scale-105 transition-all rounded-xl p-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold">NFT Signature</h2>
              <button className="bg-gradient-to-r from-[#DF28E2] to-[#AD7AFF] px-5 py-2 rounded-full text-white text-sm font-bold cursor-pointer">Unlock Now</button>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-6">In the elite tier, NFT holders gain tier-based rewards, exclusive perks, and early access to VIP events.</p>

            <div className="text-[42px] font-extrabold mb-2">Elite Access</div>

            <div className="flex flex-col gap-3">
              {features.nft.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-sm leading-6">
                  {feature.available ? (
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <circle cx="13" cy="13" r="13" fill="#181C2B" fillOpacity="0.9"/>
                      <circle cx="13" cy="13" r="12.5" stroke="#AD7AFF" strokeOpacity="0.12"/>
                      <path d="M9.87223 11.8612C9.24961 11.8612 8.62699 11.8612 8.00437 11.8612C7.92534 11.8612 7.93642 11.8523 7.93568 11.9284C7.93494 12.1455 7.93568 12.3634 7.93568 12.5805C7.93568 12.6322 7.93494 12.633 7.88472 12.633C7.75916 12.633 7.63287 12.633 7.50731 12.633C7.46078 12.633 7.4593 12.6322 7.45339 12.5835C7.43936 12.4587 7.42459 12.3338 7.41425 12.2083C7.39209 11.9254 7.38101 11.6425 7.38766 11.3589C7.41868 10.0251 7.78944 8.79606 8.51768 7.67712C8.7784 7.27607 9.06866 6.89718 9.40988 6.56039C10.1093 5.87056 10.9306 5.39492 11.8856 5.15414C12.2689 5.05739 12.6596 5.00938 13.0555 5.00126C13.7586 4.98649 14.4381 5.1017 15.0932 5.35946C16.0194 5.72432 16.7809 6.31001 17.3968 7.08921C17.9235 7.75541 18.3319 8.48586 18.5985 9.29312C18.7374 9.71485 18.8341 10.1462 18.8902 10.5871C18.9501 11.0583 18.9626 11.5303 18.936 12.0037C18.9257 12.1906 18.9065 12.3774 18.8851 12.5635C18.8843 12.5717 18.8814 12.5805 18.8806 12.5887C18.8799 12.6226 18.8659 12.6352 18.8304 12.6344C18.7366 12.6322 18.6428 12.6337 18.549 12.6337C18.5151 12.6337 18.4811 12.6344 18.4464 12.6337C18.4028 12.633 18.4021 12.6322 18.4021 12.5872C18.4021 12.3996 18.4021 12.212 18.4021 12.0244C18.4021 11.9815 18.4006 11.9387 18.4028 11.8966C18.4043 11.8678 18.3917 11.8589 18.3651 11.8612C18.3526 11.8626 18.3393 11.8612 18.3267 11.8612C17.0815 11.8612 15.8362 11.8612 14.591 11.8612C14.512 11.8612 14.5194 11.8486 14.5186 11.9321C14.5186 12.1492 14.5186 12.3671 14.5186 12.5842C14.5186 12.6322 14.5179 12.633 14.4699 12.6337C14.2527 12.6337 14.0348 12.6337 13.8177 12.6337C13.8029 12.6337 13.7882 12.6337 13.7727 12.6337C13.7549 12.6337 13.7446 12.6404 13.7446 12.6596C13.7446 12.6743 13.7446 12.6891 13.7446 12.7046C13.7446 12.9306 13.7446 13.1566 13.7446 13.3826C13.7446 13.4432 13.7527 13.4424 13.687 13.4424C13.3413 13.4424 12.9964 13.4424 12.6508 13.4424C12.5946 13.4424 12.5946 13.4417 12.5946 13.3878C12.5946 13.1551 12.5946 12.9232 12.5946 12.6906C12.5946 12.6352 12.5939 12.6344 12.54 12.6344C12.3184 12.6344 12.0968 12.6344 11.8745 12.6344C11.8169 12.6344 11.8199 12.6374 11.8199 12.5783C11.8199 12.3649 11.8199 12.1522 11.8199 11.9387C11.8199 11.9217 11.8191 11.9047 11.8199 11.8877C11.8199 11.8685 11.811 11.8612 11.7925 11.8619C11.7755 11.8626 11.7586 11.8619 11.7416 11.8619C11.1175 11.8612 10.4949 11.8612 9.87223 11.8612Z" fill="#01F1E3"/>
                      <path d="M18.8164 12.9287H18.2027C18.179 12.9287 18.1554 12.9279 18.1318 12.9287C18.1133 12.9294 18.1037 12.9235 18.1052 12.9036C18.1059 12.8881 18.1052 12.874 18.1052 12.8592V12.2071C18.1052 12.1591 18.1044 12.1583 18.0557 12.1583H14.8776C14.8074 12.1583 14.8126 12.148 14.8126 12.2233V12.8622C14.8126 12.9338 14.8193 12.9287 14.7483 12.9287H14.1087C14.029 12.9287 14.0386 12.9205 14.0378 13.0018V13.6791C14.0378 13.7293 14.0504 13.7374 13.9839 13.7374H12.3531C12.2985 13.7367 12.2978 13.7367 12.2978 13.6813V12.9841C12.2978 12.9294 12.297 12.9287 12.2424 12.9287H11.5511C11.5289 12.9294 11.52 12.9191 11.5208 12.8984C11.5215 12.8829 11.5215 12.8681 11.5215 12.8526C11.5215 12.6355 11.5208 12.4183 11.5215 12.2004C11.5215 12.1694 11.5156 12.151 11.4794 12.1576C11.472 12.1583 11.4624 12.1576 11.4543 12.1576H8.25626C8.23706 12.1569 8.22967 12.165 8.22967 12.1842C8.23041 12.1982 8.22967 12.2137 8.22967 12.2285C8.22967 12.439 8.23041 12.6502 8.22967 12.8615C8.22967 12.9353 8.24075 12.9279 8.16099 12.9279H7.50217C7.45786 12.9287 7.45786 12.9294 7.45638 12.9752C7.45564 12.9885 7.45638 13.0011 7.45638 13.0136V16.1599C7.45638 16.2316 7.45786 16.2212 7.51842 16.2212C7.73778 16.222 7.95788 16.222 8.17723 16.222C8.23263 16.222 8.22967 16.2183 8.22967 16.2722V16.9377C8.22967 16.996 8.22377 16.9923 8.28433 16.9923H11.4705C11.5274 16.9923 11.5222 16.9938 11.5222 16.9406C11.5222 16.7213 11.5215 16.5012 11.5222 16.2818C11.5222 16.2176 11.5149 16.2205 11.5843 16.2212C11.797 16.2212 12.0112 16.2212 12.2239 16.2205C12.3081 16.2205 12.2978 16.2323 12.2978 16.1459V14.6296C12.2978 14.5713 12.2941 14.5742 12.3524 14.5742H13.9647C14.0489 14.5742 14.0378 14.5631 14.0378 14.6503V16.1607C14.0378 16.2286 14.0327 16.2212 14.0999 16.2212C14.3133 16.222 14.5268 16.222 14.7395 16.222H14.7838C14.8023 16.2212 14.8119 16.2286 14.8119 16.2471C14.8111 16.2626 14.8119 16.2774 14.8119 16.2929V16.9451C14.8119 16.9923 14.8126 16.9931 14.8606 16.9931C15.0098 16.9938 15.1583 16.9931 15.3082 16.9931H18.0387C18.1148 16.9931 18.1037 16.9997 18.1044 16.9288V16.27C18.1044 16.2168 18.1037 16.222 18.1524 16.222H18.8046C18.8201 16.222 18.8349 16.2212 18.8504 16.222C18.8689 16.2227 18.877 16.2139 18.8763 16.1954C18.8763 16.1828 18.877 16.1703 18.877 16.157C18.877 15.1023 18.8763 14.0469 18.877 12.9915C18.8785 12.9228 18.8799 12.9287 18.8164 12.9287ZM10.5444 14.62L11.0821 15.1577C11.099 15.1747 11.1168 15.1887 11.1301 15.2005C10.9151 15.414 10.7046 15.6237 10.4919 15.8357C10.2896 15.6333 10.0798 15.4236 9.87005 15.2138C9.84198 15.2271 9.82869 15.2463 9.81318 15.2626C9.62854 15.4457 9.44537 15.6304 9.26072 15.8136C9.22675 15.8475 9.22601 15.8475 9.19278 15.8136C9.00444 15.6252 8.81684 15.4361 8.62777 15.2485C8.58493 15.2057 8.59305 15.2116 8.62924 15.1754C8.81389 14.9923 8.99705 14.8076 9.1817 14.6244C9.19573 14.6104 9.21567 14.5993 9.23414 14.586C9.01478 14.3652 8.80429 14.1547 8.59527 13.9464C8.80872 13.733 9.01847 13.524 9.2334 13.309C9.43946 13.5151 9.64996 13.7256 9.85824 13.9339C10.0702 13.7219 10.2807 13.5114 10.4868 13.3046C10.7061 13.524 10.9159 13.7345 11.1352 13.9531C11.1242 13.9612 11.105 13.9723 11.0909 13.9878C10.9085 14.1695 10.7253 14.3512 10.5436 14.5343C10.4941 14.5816 10.4934 14.5698 10.5444 14.62ZM17.7049 15.2522C17.5195 15.4384 17.3348 15.6237 17.1487 15.8084C17.1029 15.8542 17.114 15.8542 17.0667 15.8069C16.8843 15.6245 16.7011 15.4428 16.5195 15.2589C16.5039 15.2448 16.4943 15.2249 16.4788 15.2042C16.2573 15.4251 16.0468 15.6356 15.8392 15.8431C15.6273 15.6304 15.4182 15.4214 15.2048 15.2064C15.2735 15.1378 15.3473 15.0639 15.4212 14.9908C15.5453 14.8667 15.6686 14.7441 15.7927 14.6208C15.8414 14.5713 15.8429 14.5831 15.7942 14.5343C15.6117 14.3519 15.4301 14.1702 15.2462 13.9871C15.2321 13.973 15.2137 13.9619 15.1996 13.9516L15.8407 13.3105C16.046 13.5158 16.2558 13.7263 16.4692 13.9398C16.4929 13.9169 16.515 13.8977 16.535 13.8777C16.7152 13.6983 16.8947 13.5181 17.0734 13.3393C17.1074 13.3053 17.1029 13.2987 17.1413 13.3378L17.7115 13.908C17.7425 13.939 17.7425 13.9398 17.7108 13.9723C17.5276 14.1569 17.3437 14.3401 17.1598 14.5233C17.1428 14.5402 17.1221 14.5513 17.1066 14.5631C17.1207 14.5971 17.1384 14.6097 17.1532 14.6237L17.7056 15.1762C17.7477 15.2168 17.7484 15.2094 17.7049 15.2522Z" fill="#01F1E3"/>
                      <path d="M14.544 17.2903C14.5256 17.2903 14.5174 17.2807 14.5182 17.2637V16.5724C14.5182 16.5126 14.5219 16.5185 14.4628 16.5178C14.2501 16.5178 14.0359 16.5185 13.8232 16.5178C13.7331 16.5178 13.7449 16.5303 13.7449 16.441C13.7442 15.9402 13.7449 15.4394 13.7442 14.9387C13.7442 14.8619 13.7515 14.8715 13.6755 14.8715H12.6577C12.5868 14.8715 12.5949 14.8656 12.5935 14.9379V16.4602C12.5935 16.5251 12.5971 16.5185 12.5351 16.5185C12.3431 16.5192 12.151 16.5185 11.959 16.5185H11.8179C11.8179 16.7571 11.8187 16.9868 11.8179 17.2172C11.8179 17.3021 11.8283 17.2911 11.7433 17.2911H9.09555C9.0734 17.2911 9.04976 17.2859 9.02539 17.2984C9.0409 17.3265 9.05419 17.3501 9.06749 17.373C9.56086 18.2268 10.1547 19.0016 10.8371 19.7128C11.168 20.0578 11.5336 20.3598 11.9354 20.6161C12.332 20.8687 12.7611 21.015 13.2382 20.9994C13.5588 20.9891 13.8608 20.9042 14.1437 20.7594C14.5573 20.5482 14.9214 20.2675 15.2575 19.9514C15.4938 19.7291 15.7132 19.4898 15.9266 19.2461C16.4377 18.6604 16.8898 18.0311 17.2768 17.356C17.2878 17.3368 17.3056 17.3199 17.3026 17.2903H14.544ZM14.2996 18.3132C14.2553 18.4905 14.1504 18.6264 14.0049 18.7335C13.8483 18.8494 13.6696 18.9181 13.4797 18.9565C13.1791 19.0171 12.883 19.0038 12.5949 18.8856C12.4539 18.8273 12.3276 18.7468 12.2212 18.636C12.1333 18.5452 12.0698 18.441 12.038 18.3177C12.0321 18.2933 12.0262 18.2689 12.027 18.2386H14.3084C14.3129 18.2645 14.3062 18.2889 14.2996 18.3132Z" fill="#01F1E3"/>
                    </svg>
                  ) : (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-red-200 text-red-500">
                      ×
                    </span>
                  )}
                  <span className={`${feature.available ? 'text-white' : 'text-gray-500'}`}>
                    {feature.text}
                    <span className="text-[#01F1E3] font-semibold">{feature.highlight}</span>
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