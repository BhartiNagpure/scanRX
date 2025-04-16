import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 backdrop-blur-sm bg-white/80 shadow-lg">
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-4 px-6 lg:px-10">
                    <Link href="#home" 
                        className="text-2xl font-extrabold text-sky-600 hover:text-sky-700 transition-colors">
                        ScanRx
                    </Link>
                    
                    <div className="flex items-center space-x-8">
                        <a href="#home" 
                            className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                            Home
                        </a>
                        <a href="#about" 
                            className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                            About
                        </a>
                        <a href="#team" 
                            className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                            Team
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
