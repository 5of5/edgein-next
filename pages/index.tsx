import React, { useRef, useEffect } from 'react';
import { ElemButton } from '@/components/elem-button';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: '2%',
        left: '1%',
        width: '100%',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        zIndex: 20
      }}>
        <img 
          src="/edgein-logo.png" 
          alt="EdgeIn Logo" 
          style={{
            height: '20px',
            width: 'auto'
          }}
        />
      </nav>

      {/* Video Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.9,
        zIndex: 1
      }} />
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.8
        }}
      >
        <source src="/1.mp4" type="video/mp4" />
      </video>

      {/* Join Waitlist Button */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img 
          src="/edgein-logo.png" 
          alt="EdgeIn Logo" 
          style={{
            height: '60px',
            width: 'auto',
            marginBottom: '2rem'
          }}
        />
        <h1 style={{
          fontSize: '1rem',
          color: '#808080',
        }}>
          The ultimate web3 intelligence platform with the biggest database in web3
          <br />
          and a foundational LLM created specifically for research and analysis 
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <ElemButton href="http://t.me/edgeinofficial" variant="filled">Request Access</ElemButton>
          <ElemButton href="https://ai.xade.finance" variant="outlined">Xade AI</ElemButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
