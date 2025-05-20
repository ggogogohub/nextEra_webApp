import React from 'react';
import { Calendar, Settings, Users } from 'lucide-react';

export interface Feature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const features: Feature[] = [
  {
    title: 'Shift Management',
    icon: <Calendar size={48} />,
    description: 'Efficiently create, assign, and manage employee shifts with ease.',
  },
  {
    title: 'User Access Control',
    icon: <Users size={48} />,
    description: 'Robust role-based access control to secure sensitive data and operations.',
  },
  {
    title: 'System Configuration',
    icon: <Settings size={48} />,
    description: 'Customize application settings and parameters to fit your industrial needs.',
  },
]; 