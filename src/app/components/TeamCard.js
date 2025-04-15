// components/TeamCard.js
import Image from 'next/image';

const TeamCard = ({ avatar, name, contact }) => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 m-4">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="relative flex flex-col items-center">
                <div className="relative mt-8">
                    <Image
                        src={avatar}
                        alt={`${name}'s avatar`}
                        className="w-28 h-28 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                    {/* <img src={avatar} alt=''
                     className="w-28 h-28 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                    /> */}
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                    <p className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                        {contact}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
