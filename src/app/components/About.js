import React from "react";
import Image from "next/image";
import scannerimg from '../assests/mobilescan.png'

const About = () => {
    return (
        <section id="about" className="py-24 px-10 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-block">
                            <h2 className="text-4xl font-bold text-sky-800 relative">
                                ABOUT US
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-sky-600 rounded-full"></span>
                            </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            ScanRx leverages AI technology to revolutionize medication management. Our system enables users 
                            to instantly identify medications through barcode and package scanning. Using advanced image 
                            recognition and machine learning, we provide real-time access to comprehensive drug information, 
                            including names, side effects, and potential interactions.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            With HIPAA-compliant security measures, we ensure safe and private handling of your medical data. 
                            Our mission is to enhance healthcare efficiency, prevent medication errors, and put vital drug 
                            information at your fingertips.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-sky-600/10 rounded-lg transform rotate-3"></div>
                            <div className="relative bg-white p-6 rounded-lg shadow-xl transform transition-transform hover:-translate-y-2">
                                <Image
                                    src={scannerimg}
                                    alt="Medicine Scanner"
                                    className="w-full h-auto rounded-lg"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
