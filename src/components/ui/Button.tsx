import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon
}) => {
  const baseStyles = 'rounded-full font-semibold transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50';
  
  const variantStyles = {
    primary: 'bg-[#003366] text-white hover:bg-[#00264d] active:bg-[#001a33] shadow-md',
    secondary: 'bg-[#F0F8FF] text-[#003366] border border-[#003366] hover:bg-[#e6f2ff] active:bg-[#d9ebff]',
    accent: 'bg-[#FF5522] text-white hover:bg-[#ff4500] active:bg-[#e63c00] shadow-md',
    ghost: 'bg-transparent text-[#003366] hover:bg-[#F0F8FF] active:bg-[#e6f2ff]'
  };
  
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyles}
        ${disabledStyles}
        ${className}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;