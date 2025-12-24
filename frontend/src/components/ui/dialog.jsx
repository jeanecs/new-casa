import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, className, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content
          className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl ${className || ''}`}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children, className }) {
  return <div className={`border-b px-4 py-2 ${className || ''}`}>{children}</div>;
}

export function DialogTitle({ children, className }) {
  return <DialogPrimitive.Title className={`font-bold text-lg ${className || ''}`}>{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ children, className }) {
  return <DialogPrimitive.Description className={`text-sm text-gray-500 ${className || ''}`}>{children}</DialogPrimitive.Description>;
}
