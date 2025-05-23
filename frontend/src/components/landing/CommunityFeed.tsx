import React, { useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  padding: 64px 0 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  position: relative;
  overflow-x: visible;
`;

const Title = styled.h2`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 32px;
  text-align: center;
`;

const TickerWrap = styled.div`
  width: 100%;
  max-width: 100vw;
  left: 0;
  right: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const FeedItemsCenter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 80vw;
  max-width: 900px;
`;

const Ticker = styled.div<{duration: number}>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: scroll ${({duration}) => duration}s linear infinite;
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const FeedItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 48px;
  font-family: 'Google Sans', sans-serif;
  font-size: 1.12rem;
  color: #1a365d;
  border-radius: 16px;
  padding: 10px 24px 10px 12px;
  transition: background 0.18s, box-shadow 0.18s;
  background: transparent;
  box-shadow: none;
  &:hover, &:focus {
    background: rgba(153,209,255,0.10);
    box-shadow: 0 2px 8px rgba(42,92,255,0.10);
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 14px;
  border: 2px solid #2a5cff;
  box-shadow: 0 2px 8px #99d1ff33;
`;

const GradientEdge = styled.div<{side: 'left' | 'right'}>`
  position: absolute;
  top: 0;
  ${({side}) => side}: 0;
  width: 320px;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to ${({side}) => side === 'left' ? 'right' : 'left'},
    rgba(255,255,255,0.98) 0%,
    rgba(255,255,255,0.92) 20%,
    rgba(255,255,255,0.7) 60%,
    rgba(255,255,255,0.2) 90%,
    rgba(255,255,255,0.01) 100%
  );
  filter: blur(48px);
`;

const feedData = [
  { avatar: 'https://randomuser.me/api/portraits/women/45.jpg', text: 'Priya earned the "Power User" badge!' },
  { avatar: 'https://randomuser.me/api/portraits/men/23.jpg', text: 'New AR troubleshooting session started.' },
  { avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Shift schedule updated for Team B.' },
  { avatar: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Jane just completed a shift!' },
  { avatar: 'https://randomuser.me/api/portraits/men/65.jpg', text: 'Carlos submitted a maintenance report.' },
];

const CommunityFeed: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const duration = 24;
  const items = [...feedData, ...feedData];
  return (
    <Section>
      <Title>Live Community Feed</Title>
      <TickerWrap>
        <GradientEdge side="left" />
        <FeedItemsCenter>
          <Ticker ref={tickerRef} duration={duration}>
            {items.map((item, i) => (
              <FeedItem key={i}>
                <Avatar src={item.avatar} alt="avatar" />
                {item.text}
              </FeedItem>
            ))}
          </Ticker>
        </FeedItemsCenter>
        <GradientEdge side="right" />
      </TickerWrap>
    </Section>
  );
};

export default CommunityFeed; 