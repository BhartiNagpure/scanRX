import { useState } from "react";
import Image from "next/image";
import bannerpng from "../assests/bannerpng.png";
import bannerimg1 from '../assests/bannerimg1.png';
import dynamic from "next/dynamic";

const ScannerComponent = dynamic(() => import("./Scanner"), { ssr: false });
// const  ScannerComponent = dynamic(()=> import("./ScannerNew"), { ssr: false });

const Banner = () => {
    const [showScanner, setShowScanner] = useState(false);

    return (
        <section id="home">
            <div className="bg-gradient-to-r from-sky-800 to-sky-600 relative overflow-hidden">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8 lg:px-12 py-20">
                    {/* Left side content */}
                    <div className="md:w-1/2 text-left p-6 space-y-8 z-10">
                        <h1 className="text-7xl font-extrabold text-white tracking-tight">
                            ScanRx
                            <span className="block text-xl font-light mt-3 text-blue-100 tracking-wide">
                                Smart Medicine Scanner
                            </span>
                        </h1>
                        <p className="text-2xl text-blue-100 leading-relaxed font-light">
                            Instantly access detailed medication information with a simple QR scan.
                            Your personal healthcare assistant.
                        </p>

                        <button
                            className="group relative inline-flex items-center px-10 py-4 bg-white/90 text-blue-900 font-bold rounded-lg 
                            transition-all duration-300 ease-out hover:bg-white hover:shadow-xl hover:shadow-blue-500/20 
                            transform hover:-translate-y-1"
                            onClick={() => setShowScanner(true)}
                        >
                            <span className="mr-3">Start Scanning</span>
                            <svg
                                className="w-6 h-6 transition-transform group-hover:translate-x-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    {/* <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative z-10">
                        <div className="relative w-[600px] h-[600px] transform hover:scale-105 transition-transform duration-500 ease-out">
                            <Image
                                src={bannerpng}
                                alt="Medical Scanner Interface"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />

                            <div className="absolute -right-10 top-1/4 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl 
                                                    border border-white/20 shadow-lg animate-pulse">
                                <div className="p-4">
                                    <div className="w-full h-3 bg-blue-200/50 rounded mb-2"></div>
                                    <div className="w-2/3 h-3 bg-blue-200/50 rounded"></div>
                                </div>
                            </div>
                            <div className="absolute -left-10 bottom-1/4 w-40 h-40 bg-white/10 backdrop-blur-lg rounded-2xl 
                                                    border border-white/20 shadow-lg">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                            </div>
                        </div>
                    </div> */}

                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative z-10">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative group">
                                <div className="w-64 h-64 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                                    <Image
                                        src={bannerimg1}
                                        alt="QR Scanner"
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full p-6 transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 p-4">
                                        <p className="text-white text-sm">QR Code Scanning</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group mt-12">
                                <div className="w-64 h-64 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                                    <Image
                                        src= {bannerpng}
                                        alt="Medicine Information"
                                        width={200}
                                        height={200}
                                        className="object-cover w-full h-full p-6 transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 p-4">
                                        <p className="text-white text-sm">Instant Medicine Info</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scanner Modal */}
                {showScanner && <ScannerComponent setShowScanner={setShowScanner} />}

                {/* Modern background elements */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 blur-[100px] opacity-30" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-sky-400 blur-[100px] opacity-30" />
            </div>
        </section>
    );
};

export default Banner;
