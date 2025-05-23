import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, description }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
); 