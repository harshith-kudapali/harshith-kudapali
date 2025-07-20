import React from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Header({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen }) {
    return (
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full fixed right-0"
        >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
    );
}
