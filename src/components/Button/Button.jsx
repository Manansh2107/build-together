import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'copper', 'outline', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
  className = '',
  icon: Icon = null
}) => {
  const btnClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`;

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="btn-icon" />}
      <span>{children}</span>
    </button>
  );
};
