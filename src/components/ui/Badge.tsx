import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variantStyles = {
    primary: 'bg-[#003366] text-white',
    secondary: 'bg-[#F0F8FF] text-[#003366] border border-[#003366]',
    accent: 'bg-[#FF5522] text-white',
    success: 'bg-green-100 text-green-800 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200'
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;