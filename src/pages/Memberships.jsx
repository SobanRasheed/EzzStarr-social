import { useState } from 'react';
import ElectricBorder from '../components/ElectricBorder';

export default function Memberships() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '44px', background: '#121212', color: 'white' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '32px', fontFamily: 'SF Pro Display' }}>Memberships</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '24px', fontFamily: 'SF Pro Display' }}>Daily Updates</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
          <MembershipCard 
            title="Dandana" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
            boosted={true}
          />
          <MembershipCard 
            title="Yuri on Ice" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
          />
          <MembershipCard 
            title="Blooming Love" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
          />
          <MembershipCard 
            title="Hunterxhunter" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
            hasBoostButton={true}
          />
          <MembershipCard 
            title="Skikiki" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
          />
          <MembershipCard 
            title="Naruto" 
            creator="Creator Name" 
            genre="Love Story, Thriller"
            description="One day, when I was making school supplies in the art room, a very scary-looking girl was staring at me...!? Crafts girl vs. art boy romantic comedy!!"
            earning="0.00005"
            token="SPCA"
            likes="23k"
            replies="5"
            views="124"
            shares="4"
          />
        </div>
      </div>
    </div>
  );
}

function MembershipCard({ title, creator, genre, description, earning, token, likes, replies, views, shares, boosted, hasBoostButton }) {
  const [liked, setLiked] = useState(false);
  
  return (
    <div style={{
      background: boosted 
        ? 'linear-gradient(1deg, rgba(255, 214, 0, 0.04) 0%, rgba(255, 214, 0, 0.16) 100%)'
        : 'rgba(28, 28, 30, 0.50)',
      border: '1px solid rgba(255, 255, 255, 0.10)',
      borderRadius: '8px',
      padding: '16px',
      backdropFilter: 'blur(36px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '100px',
          height: '150px',
          backgroundColor: '#333',
          borderRadius: '4px',
          flexShrink: 0
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '14px', color: 'white', textDecoration: 'underline', marginBottom: '4px' }}>
                {creator}
              </div>
              <div style={{ fontSize: '14px', color: '#14FF00', textDecoration: 'underline' }}>
                {genre}
              </div>
            </div>
            <button style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.10)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px'
            }} onClick={() => setLiked(!liked)}>
              {liked ? '❤️' : '♡'}
            </button>
          </div>
          
          <h3 style={{ fontSize: '20px', color: 'white', margin: '8px 0', fontWeight: '500' }}>
            {title}
          </h3>
          
          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: '8px 0',
            lineHeight: '1.4',
            maxHeight: '60px',
            overflow: 'hidden'
          }}>
            {description}
          </p>
          
          <div style={{ fontSize: '13px', color: '#FFD600', margin: '8px 0' }}>
            earn {earning} {token}
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        padding: '12px 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.10)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.10)'
      }}>
        <button style={{
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.10)',
          border: 'none',
          borderRadius: '20px',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(27px)'
        }}>
          👍 {likes}
        </button>
        <button style={{
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.10)',
          border: 'none',
          borderRadius: '20px',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(27px)'
        }}>
          💬 {replies}
        </button>
        <button style={{
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.10)',
          border: 'none',
          borderRadius: '20px',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(27px)'
        }}>
          👁️ {views}
        </button>
        <button style={{
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.10)',
          border: 'none',
          borderRadius: '20px',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          backdropFilter: 'blur(27px)'
        }}>
          ↗️ {shares}
        </button>
      </div>
      
      {hasBoostButton && (
        <button style={{
          marginTop: '12px',
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #FFE316 0%, #FFD600 100%)',
          border: '2px solid #FFE316',
          borderRadius: '4px',
          color: 'black',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%'
        }}>
          Boost
        </button>
      )}
    </div>
  );
}

