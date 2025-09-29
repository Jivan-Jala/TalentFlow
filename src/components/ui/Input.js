import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn('input', className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn('label', className)}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn('input min-h-[80px] resize-none', className)}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn('input', className)}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

export { Input, Label, Textarea, Select };
