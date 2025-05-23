import React from 'react';
import styled from 'styled-components';
import { FaCogs, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const GridSection = styled.section`
  width: 100%;
  padding: 64px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #f5f5f5 0%, #e5e7eb 100%);
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(120deg, #0f172a 0%, #1e293b 100%);
  }
`;

const GridTitle = styled.h2`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 40px;
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: #99d1ff;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  width: 90vw;
  max-width: 1200px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Card = styled.div`
  background: rgba(255,255,255,0.18);
  box-shadow: 0 4px 32px 0 rgba(31,38,135,0.13);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.22);
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px) scale(1.03) rotate(-1deg);
    box-shadow: 0 8px 40px #2a5cff33;
    background: rgba(153,209,255,0.18);
  }
`;

const IconWrap = styled.div`
  font-size: 2.8rem;
  color: #2a5cff;
  margin-bottom: 18px;
  filter: drop-shadow(0 2px 8px #2a5cff44);
`;

const CardTitle = styled.h3`
  font-family: 'SF Pro Display', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 10px;
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: #99d1ff;
  }
`;

const CardDesc = styled.p`
  font-family: 'Google Sans', sans-serif;
  font-size: 1.05rem;
  color: #4b5563;
  text-align: center;
  margin-bottom: 0;
  @media (prefers-color-scheme: dark) {
    color: #e5e7eb;
  }
`;

const features = [
  {
    icon: <FaCogs />,
    title: 'SCADA-Grade Reliability',
    desc: 'Industrial-grade uptime, real-time telemetry, and bulletproof safety protocols for mission-critical operations.'
  },
  {
    icon: <FaChartLine />,
    title: 'AI-Driven Dashboards',
    desc: 'Predictive analytics, GPU-accelerated D3.js charts, and actionable insights for shift optimization.'
  },
  {
    icon: <FaUsers />,
    title: 'Role-Based UI',
    desc: 'Operator, Supervisor, and Maintenance views with adaptive controls and contextual AI-powered tips.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Security & Compliance',
    desc: 'ISO 9001, IEC 62443, and UL 1642 certified. 2FA, lockout mode, and encrypted offline-first sync.'
  },
];

const BentoGrid: React.FC = () => (
  <GridSection id="features">
    <GridTitle>Key Features</GridTitle>
    <Grid>
      {features.map((f, i) => (
        <Card key={i} tabIndex={0} aria-label={f.title}>
          <IconWrap>{f.icon}</IconWrap>
          <CardTitle>{f.title}</CardTitle>
          <CardDesc>{f.desc}</CardDesc>
        </Card>
      ))}
    </Grid>
  </GridSection>
);

export default BentoGrid; 