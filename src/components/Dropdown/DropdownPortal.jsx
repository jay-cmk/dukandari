// components/DropdownPortal.jsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const DropdownPortal = ({ children, isOpen, onClose }) => {
  const portalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;