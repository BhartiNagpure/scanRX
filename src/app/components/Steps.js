import Image from "next/image";
import scanimg from '../assests/scan.png';
import selectimg from '../assests/select.png';
import talkimg from '../assests/talk.png';

const Steps = () => {
    const step = [
        {
            title: "Scan",
            description:
                "Scan your medicine based on QR code and availability. Add filters such as usage, side effects, and location.",
            image: scanimg,
        },
        {
            title: "Select",
            description:
                "With your search complete, select the expert profile that best fits your needs and arrange a time to talk.",
            image: selectimg,
        },
        {
            title: "Speak",
            description:
                "Now it's time to speak with your chosen expert via video call and get the advice you need when you need it.",
            image: talkimg,
        },
    ]
    return (
        <section className="relative">
            {/* Wave SVG */}
            {/* <div className="absolute w-full overflow-hidden">
                <svg className="w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
                    <path fill="#7dd3fc" fillOpacity="1" d="M0,128L40,112C80,96,160,64,240,85.3C320,107,400,181,480,192C560,203,640,149,720,117.3C800,85,880,75,960,90.7C1040,107,1120,149,1200,165.3C1280,181,1360,171,1400,165.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </div> */}

            <div className="bg-sky-800 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* <h2 className="text-4xl font-bold text-white mb-12  tracking-tight">
                        STEPS
                    </h2> */}
                    <div className="inline-block text-center mb-8">
                        <h2 className="text-4xl text-center font-bold text-white relative">
                           STEPS
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-sky-300 rounded-full"></span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {step.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={250}
                                        height={150}
                                        className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-sky-600 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
