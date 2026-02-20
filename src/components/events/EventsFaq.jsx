import React, { useState } from "react";

export default function EventsFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

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
    <div className="text-center bg-black text-white pb-16">
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
  );
}
