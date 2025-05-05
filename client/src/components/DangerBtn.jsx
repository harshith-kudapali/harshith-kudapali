import React from 'react';
import { motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * A danger-styled button with animation, optionally rendered as a React Router Link
 * 
 * Props:
 * - label: text displayed on the button
 * - onClick: click handler (ignored if `to` is provided)
 * - to: optional route string; if provided, wraps button in a <Link>
 */
export default function DangerButton({ label = 'Delete Admin', onClick, to }) {
  const ButtonContent = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 10, 0] }}
      animate={{
        boxShadow: [
          '0px 0px 0px rgba(0,0,0,0)',
          '0px 0px 8px rgba(220,38,38,0.6)',
          '0px 0px 0px rgba(0,0,0,0)'
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl px-4 py-2 m-1 shadow-lg focus:outline-none"
    >
      <Trash className="mr-2 h-5 w-5" />
      {label}
    </motion.button>
  );

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent;
}
