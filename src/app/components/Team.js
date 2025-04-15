// pages/team.js
import TeamCard from './TeamCard';
// import avtar from '../../assests/maleavtar.png';
// import femalevatar from "../../assests/femaleavtar.png";
import krutika from '../../app/assests/team/krutika.jpeg';
import rakhi from '../../app/assests/team/rakhi.jpeg';
import shravani from '../../app/assests/team/shravani.jpeg';
import tanushree from '../../app/assests/team/tanushree.jpeg';
import arya from '../../app/assests/team/arya.jpeg';
import gauri from '../../app/assests/team/gauri.jpeg';

const teamMembers = [
    {
        id: 1,
        name: 'Arya Nandu Buradkar',
        branch: "Dept. of Computer Engineering ",
        avatar: arya,
        contact: 'john@example.com',
    },
    {
        id: 2,
        name: 'Krutika Arun Atkare ',
        branch: "Dept. of Computer Engineering ",
        avatar: krutika,
        contact: 'jane@example.com',
    },
    {
        id: 3,
        name: 'Shravani Rajesh Meshram ',
        branch: "Dept. of Computer Engineering ",
        avatar: shravani,
        contact: 'mike@example.com',
    },
    {
        id: 4,
        name: 'Rakhi Mohan Ardak',
        branch: "Dept. of Computer Engineering ",
        avatar: rakhi,
        contact: 'emily@example.com',
    },
    {
        id: 5,
        name: 'Tanushree Atul Saudagar',
        branch: "Dept. of Computer Engineering ",
        avatar: tanushree,
        contact: 'chris@example.com',
    },
    {
        id: 6,
        name: 'Gauri Prashant Nunnewar',
        branch: "Dept. of Computer Engineering ",
        avatar: gauri,
        contact: 'sarah@example.com',
    },
];

const Team = () => {
    return (
        <section id="team">
            <div className="mt-16 container mx-auto max-w-7xl px-2">
                <div className="inline-block text-center mb-8">
                    <h2 className="text-4xl text-center font-bold text-sky-800 relative">
                        OUR TEAM
                        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-sky-600 rounded-full"></span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                        <TeamCard
                            key={member.id}
                            avatar={member.avatar}
                            name={member.name}
                            contact={member.branch}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
