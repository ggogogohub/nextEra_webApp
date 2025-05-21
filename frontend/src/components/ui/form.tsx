import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id: propId,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = propId || generatedId;
  
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={twMerge(
            'w-full px-4 py-2 rounded-lg border transition-colors duration-menu',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'placeholder:text-text-placeholder',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error
              ? 'border-status-emergency focus:ring-status-emergency'
              : 'border-border focus:border-secondary focus:ring-secondary',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-status-emergency"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="text-sm text-text-secondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className,
  id: propId,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = propId || generatedId;
  
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-text-primary"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={twMerge(
          'w-full px-4 py-2 rounded-lg border transition-colors duration-menu',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'appearance-none bg-no-repeat bg-right',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%234B5563\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")]',
          'bg-[length:1.5em_1.5em] bg-[position:right_0.5rem_center]',
          error
            ? 'border-status-emergency focus:ring-status-emergency'
            : 'border-border focus:border-secondary focus:ring-secondary',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${selectId}-error`}
          className="text-sm text-status-emergency"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${selectId}-helper`}
          className="text-sm text-text-secondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  className,
  id: propId,
  ...props
}) => {
  const generatedId = React.useId();
  const checkboxId = propId || generatedId;
  
  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            className={twMerge(
              'w-4 h-4 rounded border transition-colors duration-menu',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              error
                ? 'border-status-emergency focus:ring-status-emergency'
                : 'border-border focus:border-secondary focus:ring-secondary',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
            {...props}
          />
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p
          id={`${checkboxId}-error`}
          className="text-sm text-status-emergency"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={`${checkboxId}-helper`}
          className="text-sm text-text-secondary"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}; 