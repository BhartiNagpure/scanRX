const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-sky-800 to-sky-600 text-white py-8 px-6 lg:px-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-sky-400/30 pb-6">
                    {/* Logo and Name */}
                    <div className="flex items-center space-x-2 group">
                        {/* Add your logo image here */}
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-200 transition-all duration-300">
                            ScanRX
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-6 md:mt-0">
                        <nav className="flex space-x-8">
                            <a href="#home" className="text-sky-100 hover:text-white transition-colors duration-300 relative group">
                                <span>Home</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#about" className="text-sky-100 hover:text-white transition-colors duration-300 relative group">
                                <span>About</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#team" className="text-sky-100 hover:text-white transition-colors duration-300 relative group">
                                <span>Team</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 text-center">
                    <p className="text-sky-200/80 text-sm font-light">
                        &copy; {new Date().getFullYear()} ScanRX. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
