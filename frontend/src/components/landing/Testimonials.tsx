import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  min-height: 320px;
  padding: 64px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const Title = styled.h2`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 2.6rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: -1px;
`;

const CarouselWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 340px;
  max-width: 420px;
  min-height: 180px;
  @media (max-width: 600px) {
    min-width: 90vw;
    max-width: 95vw;
  }
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #2a5cff;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(42,92,255,0.12);
`;

const Name = styled.div`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 2px;
`;

const Role = styled.div`
  font-family: 'Google Sans', sans-serif;
  font-size: 1rem;
  color: #22c55e;
  margin-bottom: 12px;
`;

const Quote = styled.p`
  font-family: 'Google Sans', sans-serif;
  font-size: 1.08rem;
  color: #1a365d;
  text-align: center;
  margin: 0;
`;

const Arrow = styled.button`
  background: rgba(42,92,255,0.12);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  margin: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #2a5cff;
  box-shadow: 0 2px 8px rgba(42,92,255,0.08);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  &:hover, &:focus {
    background: #99d1ff;
    color: #1a365d;
    transform: scale(1.08);
    outline: none;
  }
`;

const testimonials = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'John D.',
    role: 'Operator',
    quote: 'I love the glove mode and the clean, responsive design. It just works, even on the factory floor.'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Maria S.',
    role: 'Supervisor',
    quote: 'The AI-powered dashboards and real-time updates are a game changer for our team.'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'Carlos R.',
    role: 'Maintenance',
    quote: 'AR troubleshooting and predictive alerts have saved us hours of downtime.'
  }
];

const Testimonials: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((idx + 1) % testimonials.length);
  return (
    <Section>
      <Title>What Our Users Say</Title>
      <CarouselWrap>
        <Arrow aria-label="Previous" onClick={prev}>&#8592;</Arrow>
        <TestimonialContent>
          <Avatar src={testimonials[idx].avatar} alt={testimonials[idx].name} />
          <Name>{testimonials[idx].name}</Name>
          <Role>{testimonials[idx].role}</Role>
          <Quote>“{testimonials[idx].quote}”</Quote>
        </TestimonialContent>
        <Arrow aria-label="Next" onClick={next}>&#8594;</Arrow>
      </CarouselWrap>
    </Section>
  );
};

export default Testimonials; 