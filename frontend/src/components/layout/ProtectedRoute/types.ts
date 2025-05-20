import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

// temporary comment 