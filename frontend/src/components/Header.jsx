import React from "react"

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="./logo.webp" // Đặt đường dẫn tới logo
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                    <span className="ml-2 text-xl font-semibold text-gray-800">L O R</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#clone-voice" className="text-gray-600 hover:text-gray-900">
                        Klon giọng nói
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                        Giá cả
                    </a>
                    <a href="#history" className="text-gray-600 hover:text-gray-900">
                        Lịch sử
                    </a>
                    <a href="#blog" className="text-gray-600 hover:text-gray-900">
                        Blog
                    </a>
                </nav>
            </div>
        </header>
    );
};
export default Header;
