import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}