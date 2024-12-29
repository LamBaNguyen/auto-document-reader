import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-200 p-4 text-center">
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} L O R. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
export default Footer;