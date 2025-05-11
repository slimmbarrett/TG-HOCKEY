import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'ice' | 'highlight';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick
}) => {
  const baseStyles = 'rounded-lg overflow-hidden transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-white shadow-md hover:shadow-lg border border-gray-200',
    ice: 'bg-[#F0F8FF] shadow-md hover:shadow-lg border border-[#D0E8FF]',
    highlight: 'bg-white shadow-md hover:shadow-lg border-2 border-[#FF5522]'
  };
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;