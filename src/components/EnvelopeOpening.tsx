import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  
  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix');
  const guestName = params.get('name');

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      
      // Sequence: Flap opens, then card rises, then transition
      setTimeout(() => setCardRevealed(true), 800);
      
      const timer = setTimeout(() => {
        onComplete();
      }, 5500); // Wait for card to rise, be read, and then transition
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          background: #1A2216; /* Deep forest-green */
        }

        .scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #1A2216;
          background-image: radial-gradient(circle at center, rgba(44, 53, 39, 0.4) 0%, #1A2216 100%);
          perspective: 1500px;
          overflow: hidden;
          font-family: "Playfair Display", serif;
        }

        /* Cinematic Particles */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: 
            radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.2) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at 70% 60%, rgba(255, 255, 255, 0.15) 1.5px, transparent 0),
            radial-gradient(2px 2px at 40% 80%, rgba(212, 175, 55, 0.1) 2px, transparent 0);
          background-size: 100px 100px;
          animation: particle-drift 40s linear infinite;
        }

        @keyframes particle-drift {
          from { transform: translateY(0); }
          to { transform: translateY(-100px); }
        }

        .envelope-container {
          position: relative;
          width: min(400px, 90vw);
          height: min(280px, 60vh);
          cursor: pointer;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
          z-index: 10;
        }

        .envelope-container:not(.is-open):hover {
          transform: translateY(-5px) scale(1.02);
        }
        
        .envelope-container.is-open {
          transform: translateY(80px);
        }

        /* Envelope Back */
        .envelope-back {
          position: absolute;
          inset: 0;
          background: #FAF8F5;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          border-radius: 4px;
          box-shadow: 0 40px 60px -20px rgba(0,0,0,0.5);
        }
        
        /* Envelope Inside */
        .envelope-inside {
          position: absolute;
          inset: 2px;
          background: #e5dfd5;
          border-radius: 4px;
        }

        /* Card */
        .card {
          position: absolute;
          inset: 4px 10px;
          background: #FAF8F5;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          transform: translateY(0);
          transition: transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 2;
        }

        .card.is-revealed {
          transform: translateY(-200px);
          z-index: 6; /* Bring above front flaps when fully raised */
        }
        
        /* Card Content */
        .card-border {
          width: 100%;
          height: 100%;
          border: 1px solid rgba(198, 170, 118, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card-names {
          font-family: "Playfair Display", serif;
          font-size: 32px;
          color: #3A2B24;
          margin: 10px 0;
          font-style: italic;
        }
        
        .card-date {
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #2C3527;
          margin-top: 15px;
        }

        /* Envelope Front Flaps */
        .envelope-front {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }
        
        .flap-left, .flap-right, .flap-bottom {
          position: absolute;
          background: #F5EFEB;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
        }
        
        .flap-left {
          top: 0; bottom: 0; left: 0;
          width: 60%;
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          filter: drop-shadow(5px 0 10px rgba(0,0,0,0.1));
        }
        
        .flap-right {
          top: 0; bottom: 0; right: 0;
          width: 60%;
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
          filter: drop-shadow(-5px 0 10px rgba(0,0,0,0.1));
        }
        
        .flap-bottom {
          bottom: 0; left: 0; right: 0;
          height: 65%;
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
          filter: drop-shadow(0 -5px 10px rgba(0,0,0,0.15));
        }

        /* Top Flap */
        .flap-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60%;
          background: #FAF8F5;
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          clip-path: polygon(0 0, 50% 100%, 100% 0);
          transform-origin: top;
          transform: rotateX(0deg);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 6;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .envelope-container.is-open .flap-top {
          transform: rotateX(180deg);
          z-index: 1; /* Move behind card when open */
        }

        /* Wax Seal */
        .wax-seal {
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #C6AA76, #9b7e4a);
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -2px 5px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FAF8F5;
          font-family: "Playfair Display", serif;
          font-size: 24px;
          font-style: italic;
          z-index: 7;
          transition: opacity 0.5s ease, transform 0.8s ease;
          pointer-events: none;
        }
        
        .wax-seal::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .envelope-container.is-open .wax-seal {
          opacity: 0;
          transform: translate(-50%, 20px) scale(0.8);
        }

        /* Instruction text */
        .instruction {
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          color: #F5EFEB;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          transition: opacity 0.5s;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .envelope-container.is-open .instruction {
          opacity: 0;
        }
        
        .btn-open {
          padding: 10px 24px;
          background: transparent;
          border: 1px solid rgba(198, 170, 118, 0.6);
          color: #C6AA76;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .btn-open:hover {
          background: rgba(198, 170, 118, 0.1);
          color: #FAF8F5;
          border-color: #FAF8F5;
        }

      `}</style>

      <div className="scene">
        <div className="particles"></div>
        
        <div
          className={`envelope-container ${opened ? 'is-open' : ''}`}
          onClick={() => {
            if (!opened) setOpened(true);
          }}
        >
          <div className="envelope-back"></div>
          <div className="envelope-inside"></div>
          
          <div className={`card ${cardRevealed ? 'is-revealed' : ''}`}>
            <div className="card-border">
              <span style={{ fontFamily: 'Montserrat', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3A2B24' }}>
                {guestName ? `Dear ${prefix} ${guestName},` : 'A Special Invitation'}
              </span>
              <h1 className="card-names">Ann & Crishan</h1>
              <span className="card-date">12 · 12 · 2026</span>
            </div>
          </div>
          
          <div className="envelope-front">
            <div className="flap-left"></div>
            <div className="flap-right"></div>
            <div className="flap-bottom"></div>
          </div>
          
          <div className="flap-top"></div>
          
          <div className="wax-seal">
            A&C
          </div>

          <div className="instruction">
            <span>A Special Invitation For You</span>
            <button className="btn-open">Open Invitation</button>
          </div>
        </div>
      </div>
    </>
  );
}