import { useState, useEffect } from 'react';

export default function AboutMe() {
    const [activeSection, setActiveSection] = useState('intro');
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

    // Cultural Timeline Data
    const culturalTimeline = [
        { month: "January", festival: "Makar Sankranti", description: "Flying colorful kites with my cousins on our rooftop, enjoying til laddoos and gajak." },
        { month: "March", festival: "Holi", description: "Our entire neighborhood comes together with colors, water guns, and homemade gujiya sweets." },
        { month: "August", festival: "Teej", description: "Special to Rajasthan - fasting with mother and applying intricate mehndi designs." },
        { month: "October", festival: "Diwali", description: "Our family tradition of making rangoli together and lighting 108 diyas around our home." },
        { month: "November", festival: "Pushkar Mela", description: "Annual trip to witness the camel fair and take a holy dip in the Pushkar lake." }
    ];

    // Gallery Data
    const galleryImages = [
        { id: 1, title: "Amber Fort", description: "My favorite childhood spot - where I learned about Rajput architecture", color: "bg-amber-200" },
        { id: 2, title: "Family Puja", description: "Our annual Ganesh Chaturthi celebration at home", color: "bg-orange-200" },
        { id: 3, title: "Jaipur Markets", description: "Shopping for bandhani fabrics in Johari Bazaar", color: "bg-pink-200" },
        { id: 4, title: "Lake Palace", description: "Trip to Udaipur where I learned about Mewar painting styles", color: "bg-blue-200" },
        { id: 5, title: "Dance Recital", description: "My arangetram (debut performance) in Kathak dance", color: "bg-purple-200" },
        { id: 6, title: "Village Fair", description: "Annual visit to my grandmother's village in rural Rajasthan", color: "bg-green-200" }
    ];

    // Literature & Films Data
    const favoriteArts = [
        { type: "Book", title: "The God of Small Things", creator: "Arundhati Roy", thoughts: "Reminds me of summer visits to my relatives in Kerala" },
        { type: "Epic", title: "Mahabharata", creator: "Vyasa", thoughts: "My grandfather would tell us stories every evening" },
        { type: "Poetry", title: "Gitanjali", creator: "Rabindranath Tagore", thoughts: "I learned to recite these poems in Bengali" },
        { type: "Film", title: "Pather Panchali", creator: "Satyajit Ray", thoughts: "Captures the essence of rural Indian life so beautifully" },
        { type: "Music", title: "Raag Yaman", creator: "Pandit Hariprasad Chaurasia", thoughts: "The flute sounds like monsoon rain on our tin roof" }
    ];
    const karnatakaTimeline = [
        {
            month: "January",
            festival: "Makar Sankranti",
            description: "Known as Ellu Bella in Karnataka, celebrated with sesame seeds and jaggery exchanges. Kite flying is popular, especially in North Karnataka."
        },
        {
            month: "February-March",
            festival: "Shivaratri",
            description: "Major celebration at temples across Karnataka, especially at Gokarna and other Shiva temples. Night-long prayers and cultural programs."
        },
        {
            month: "March-April",
            festival: "Ugadi",
            description: "Kannada New Year celebrated with traditional Bevu Bella (neem and jaggery) symbolizing life's bitter-sweet experiences. Houses decorated with mango leaves."
        },
        {
            month: "August-September",
            festival: "Gowri Ganesha",
            description: "Karnataka's biggest festival with elaborate pandals in Bengaluru and across the state. Clay Ganesha idols are worshipped for 11 days."
        },
        {
            month: "September-October",
            festival: "Navaratri Dasara",
            description: "Grand celebrations in Mysuru with the famous Mysore Dasara procession, Chamundeshwari temple festivities, and cultural programs at Mysore Palace."
        },
        {
            month: "October-November",
            festival: "Deepavali",
            description: "Festival of lights celebrated with oil lamps, rangoli, and traditional sweets like Mysore Pak and Dharwad Peda."
        },
        {
            month: "November",
            festival: "Kannada Rajyotsava",
            description: "Karnataka Formation Day celebrated on November 1st with cultural programs, flag hoisting, and promotion of Kannada language and culture."
        },
        {
            month: "December-January",
            festival: "Hampi Festival",
            description: "Annual cultural extravaganza at the UNESCO World Heritage site showcasing Karnataka's rich history through dance, music, and cultural performances."
        }];
    // Helper Functions
    const openGalleryModal = (image) => {
        setSelectedGalleryImage(image);
        setIsGalleryOpen(true);
    };

    const closeGalleryModal = () => {
        setIsGalleryOpen(false);
        setSelectedGalleryImage(null);
    };
    const [currentlang, setlang] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const lang = [
        "Hello and welcome!",
        "नमस्ते और स्वागत है!",
        "ನಮಸ್ಕಾರ ಮತ್ತು ಸ್ವಾಗತ!",
        "नमः स्वागतं च!"
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setlang((prev) => (prev + 1) % lang.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="min-h-screen ">
            {/* Decorative Header with Enhanced Rangoli-inspired Pattern */}
            <div className="relative h-[100px] overflow-hidden">
                <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                    <svg viewBox="0 0 800 800" className="w-[600px] h-[600px]">
                        <style>{`
          .rotating-mandala {
            animation: rotate 10s linear infinite;
            transform-origin: 400px 400px;
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

                        <g className="rotating-mandala">
                            <circle cx="400" cy="400" r="300" fill="none" stroke="white" strokeWidth="5" />
                            <circle cx="400" cy="400" r="250" fill="none" stroke="white" strokeWidth="5" />
                            <circle cx="400" cy="400" r="200" fill="none" stroke="white" strokeWidth="5" />
                            <circle cx="400" cy="400" r="150" fill="none" stroke="white" strokeWidth="5" />
                            <path d="M400,100 L400,700 M100,400 L700,400 M228,228 L572,572 M228,572 L572,228" stroke="white" strokeWidth="5" />

                            <g>
                                <g transform="rotate(0 400 400)">
                                    <path d="M480,250 Q510,200 480,150 Q450,180 480,210 Q500,190 480,250" fill="white" opacity="0.5" />
                                    <path d="M500,300 Q550,280 560,240 Q540,220 520,240 Q530,270 500,300" fill="white" opacity="0.5" />
                                </g>

                                <g transform="rotate(90 400 400)">
                                    <path d="M480,250 Q510,200 480,150 Q450,180 480,210 Q500,190 480,250" fill="white" opacity="0.5" />
                                    <path d="M500,300 Q550,280 560,240 Q540,220 520,240 Q530,270 500,300" fill="white" opacity="0.5" />
                                </g>

                                <g transform="rotate(180 400 400)">
                                    <path d="M480,250 Q510,200 480,150 Q450,180 480,210 Q500,190 480,250" fill="white" opacity="0.5" />
                                    <path d="M500,300 Q550,280 560,240 Q540,220 520,240 Q530,270 500,300" fill="white" opacity="0.5" />
                                </g>

                                <g transform="rotate(270 400 400)">
                                    <path d="M480,250 Q510,200 480,150 Q450,180 480,210 Q500,190 480,250" fill="white" opacity="0.5" />
                                    <path d="M500,300 Q550,280 560,240 Q540,220 520,240 Q530,270 500,300" fill="white" opacity="0.5" />
                                </g>
                            </g>

                            {/* <circle cx="400" cy="400" r="50" fill="white" /> */}
                            {/* <circle cx="400" cy="400" r="30" fill="#FF6B6B" /> */}
                        </g>
                    </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">Harshith S Kudapali</h1>
                        <p className="mt-2 text-xl text-white">{lang[currentlang]}</p>
                        <p className="mt-1 text-sm text-white">Hindi • Kannada • English • Sanskrit</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Navigation inspired by temple arches */}
                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap h-15 justify-center space-x-2 p-2 rounded-full border border-white shadow-md">
                        {['intro', 'journey', 'culture', 'passions', 'literature', 'gallery', 'philosophy'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`px-4 py-2 mb-2 rounded-full transition-colors duration-300 ${activeSection === section
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-blue-500/30 text-white'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Container with decorative border */}
                <div className=" rounded-lg shadow-lg "  >
                    {/* Intro Section */}
                    {activeSection === 'intro' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 p-1 shadow-lg flex-shrink-0">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                                        <span className="text-6xl text-white">हर्ष</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg text-white leading-relaxed">
                                        Namaskara! I’m Harshith, a developer, dreamer, and doer, proudly shaped by the energy of Karnataka. My journey is rooted in curiosity and built on code — a blend of logic and creativity. From late-night debugging sessions to brainstorming ideas that bring people together, I thrive at the intersection of innovation and impact. Like a perfectly optimized algorithm, my work is driven by clarity, purpose, and a passion for building tech that feels human.                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-700 rounded-lg border-l-4 border-purple-500">
                                <p className="italic text-white font-medium leading-relaxed text-lg">
                                    कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                                    मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥<br /><br />
                                    Karmaṇy-evādhikāras te mā phaleṣu kadācana;<br />
                                    mā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi. (BG 2.47)<br /><br />
                                    “You have a right to perform your duty—never to the fruits thereof.”
                                </p>

                            </div>

                            <p className="text-white">
                                Like the steady flame of a Diwali diya, I aim to bring clarity and spark into everything I build — not through rituals, but through purpose. I’m not bound by tradition, but I carry its essence: focus, resilience, and authenticity. Whether I’m writing code, brainstorming ideas, or just living life, the spirit of where I come from shapes how I move forward. I don’t follow the old ways blindly — I remix them into something that fits today. India runs through my logic and creativity — not as a label, but as fuel.                            </p>

                        </div>
                    )}

                    {/* Journey Section */}
                    {activeSection === 'journey' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-px bg-purple-500 flex-grow"></div>
                                <span className="px-4 text-xl font-semibold text-white">My Yatra</span>
                                <div className="h-px bg-purple-500 flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-700 p-4 rounded-lg border-b-2 border-blue-600">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-blue-700 font-bold">1</span>
                                    </div>
                                    <h3 className="font-bold text-blue-500 mb-2">Childhood in Davanagere</h3>
                                    <p className="text-white">Growing up surrounded by palaces and folk art, learning classical Kathak dance, and listening to my grandmother's stories from the Ramayana.</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg border-b-2 border-blue-700">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-blue-700 font-bold">2</span>
                                    </div>
                                    <h3 className="font-bold text-blue-500 mb-2">Education & Growth</h3>
                                    <p className="text-white">Studying both ancient Sanskrit texts and modern design, finding harmony between tradition and innovation in my creative pursuits.</p>
                                </div>
                                <div className="bg-gray-700 p-4 rounded-lg border-b-2 border-blue-700">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-blue-700 font-bold">3</span>
                                    </div>
                                    <h3 className="font-bold text-blue-500 mb-2">Present Endeavors</h3>
                                    <p className="text-white">Creating digital art inspired by Indian miniature paintings, practicing yoga daily, and building bridges between cultures through storytelling.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEW: Cultural Timeline Section */}
                    {activeSection === 'culture' && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Cultural Calendar</h2>
                            <p className="text-center text-white mb-6">The rhythm of my year follows these cherished celebrations</p>

                            {/* Festival Timeline */}
                            <div className="max-w-4xl mx-auto p-6 ">

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-pink-500 to-purple-500 "></div>

                                    <div className="space-y-12">
                                        {karnatakaTimeline.map((event, index) => (
                                            <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                                <div className="w-1/2 pr-8 text-right">
                                                    {index % 2 === 0 ? (
                                                        <>
                                                            <h3 className="font-bold text-blue-500 text-lg">{event.month}</h3>
                                                            <h4 className="font-medium text-purple-500 text-base mb-2">{event.festival}</h4>
                                                        </>
                                                    ) : (
                                                        <p className="text-white text-sm leading-relaxed pl-6">{event.description}</p>
                                                    )}
                                                </div>

                                                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white shadow-lg z-10 flex items-center justify-center text-lg">
                                                    {/* Karnataka-specific festival symbols */}
                                                    {index === 0 && <span>🪁</span>} {/* Makar Sankranti - Kites */}
                                                    {index === 1 && <span>🔱</span>} {/* Shivaratri - Trishul */}
                                                    {index === 2 && <span>🌿</span>} {/* Ugadi - Neem leaves */}
                                                    {index === 3 && <span>🐘</span>} {/* Ganesha */}
                                                    {index === 4 && <span>👑</span>} {/* Dasara - Mysore royalty */}
                                                    {index === 5 && <span>🪔</span>} {/* Deepavali - Diyas */}
                                                    {index === 6 && <span>🚩</span>} {/* Rajyotsava - Flag */}
                                                    {index === 7 && <span>🏛️</span>} {/* Hampi - Heritage */}
                                                </div>

                                                <div className="w-1/2 pl-8">
                                                    {index % 2 !== 0 ? (
                                                        <>
                                                            <h3 className="font-bold text-blue-500 text-lg">{event.month}</h3>
                                                            <h4 className="font-medium text-purple-500 text-base mb-2">{event.festival}</h4>
                                                        </>
                                                    ) : (
                                                        <p className="text-white text-sm leading-relaxed">{event.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-sm text-white italic">
                                        "ಸರ್ವಜನ ಸುಖಿನೋ ಭವಂತು" - May all people be happy
                                    </p>
                                </div>
                            </div>

                            {/* Regional Traditions */}

                            <div className="mt-12 p-6 bg-transparent rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-800 mb-4">Karnataka Heritage Around Me</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🧵</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-700">Mysore Silk Weaving</h4>
                                            <p className="text-sm text-white">The beautiful Mysore silk sarees are still handwoven by skilled artisans in the silk city today.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎨</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-purple-700">Mysore Painting</h4>
                                            <p className="text-sm text-white">This classical South Indian painting style with intricate gold leaf work continues to flourish in local art studios.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🥞</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-pink-700">Davanagere Benne Dosa</h4>
                                            <p className="text-sm text-white">The legendary buttery dosa from Davanagere remains a beloved specialty across Karnataka and beyond.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎭</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-700">Yakshagana</h4>
                                            <p className="text-sm text-white">This vibrant traditional Karnataka folk theater with elaborate costumes continues to captivate audiences.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🏛️</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-purple-700">Channapatna Toys</h4>
                                            <p className="text-sm text-white">These traditional wooden toys from the craft town near Mysore are still crafted by skilled artisans today.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">☕</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-pink-700">Filter Coffee Tradition</h4>
                                            <p className="text-sm text-white">The authentic South Indian filter coffee method remains an integral part of Karnataka's daily culture.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Family Recipe */}

                            <div className="mt-8 border-2 border-dashed border-purple-300 p-6 rounded-lg bg-transparent">
                                <h3 className="text-center font-medium text-purple-800 mb-3">Traditional Recipe: Davanagere Benne Dosa</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-blue-700 mb-2">Ingredients:</h4>
                                        <ul className="list-disc pl-5 text-white space-y-1">
                                            <li>3 cups dosa rice (soaked 4-6 hours)</li>
                                            <li>1 cup urad dal (soaked 4-6 hours)</li>
                                            <li>1/2 cup poha (flattened rice)</li>
                                            <li>1 tsp fenugreek seeds</li>
                                            <li>Salt to taste</li>
                                            <li>Generous amount of ghee/butter</li>
                                            <li>Oil for cooking</li>
                                            <li>Water as needed</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-pink-700 mb-2">Story:</h4>
                                        <p className="text-white text-sm">
                                            Davanagere's famous benne dosa gets its name from the generous use of butter (benne in Kannada). This crispy, golden dosa originated in the cotton hub city and became legendary for its unique texture and rich flavor. The secret lies in the perfect batter consistency and the liberal use of ghee that creates those signature crispy edges while keeping the center soft.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Passions Section */}
                    {activeSection === 'passions' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center text-orange-800 mb-8">What Brings Me Joy</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: "Classical Dance", symbol: "💃", description: "Trained in Kathak for 12 years" },
                                    { name: "Cooking", symbol: "🍛", description: "Specializing in Rajasthani cuisine" },
                                    { name: "Textile Arts", symbol: "🧵", description: "Hand block printing & embroidery" },
                                    { name: "Meditation", symbol: "🧘‍♀️", description: "Daily practice of mindfulness" },
                                    { name: "Sanskrit Poetry", symbol: "📜", description: "Writing in ancient meters" },
                                    { name: "Carnatic Music", symbol: "🎵", description: "Learning veena for 5 years" },
                                    { name: "Ayurveda", symbol: "🌿", description: "Studying traditional healing" },
                                    { name: "Digital Art", symbol: "🎨", description: "Creating cultural illustrations" }
                                ].map((passion, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow p-4 text-center border border-orange-100 hover:border-orange-300 transition-colors">
                                        <div className="text-3xl mb-2">{passion.symbol}</div>
                                        <h3 className="font-medium text-orange-800">{passion.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{passion.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Added Indian Symbols Section */}
                            <div className="mt-10">
                                <h3 className="text-xl font-medium text-orange-800 text-center mb-6">Symbols That Inspire Me</h3>

                                <div className="flex flex-wrap justify-center gap-8">
                                    {/* Lotus */}
                                    <div className="text-center w-32">
                                        <div className="w-20 h-20 mx-auto">
                                            <div className="relative w-full h-full">
                                                {/* Lotus petals */}
                                                {[...Array(8)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="absolute w-8 h-12 bg-pink-200 rounded-full left-6 top-4"
                                                        style={{ transform: `rotate(${i * 45}deg) translateY(-10px)` }}
                                                    ></div>
                                                ))}
                                                <div className="absolute left-6 top-8 w-8 h-8 rounded-full bg-yellow-400"></div>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-orange-700 mt-2">Lotus</p>
                                        <p className="text-xs text-gray-600">Beauty emerging from mud - resilience</p>
                                    </div>

                                    {/* Peacock */}
                                    <div className="text-center w-32">
                                        <div className="w-20 h-20 mx-auto flex items-center justify-center">
                                            <div className="w-16 h-16 relative">
                                                <div className="absolute w-4 h-8 bg-blue-500 rounded-t-full left-6 top-0"></div>
                                                <div className="absolute w-16 h-8 flex top-6">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-2 h-8 bg-green-500 mx-px rounded-t-full"
                                                            style={{ transform: `rotate(${(i - 2) * 15}deg)` }}
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-blue-400 relative top-1"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-orange-700 mt-2">Peacock</p>
                                        <p className="text-xs text-gray-600">National bird - grace and beauty</p>
                                    </div>

                                    {/* Elephant */}
                                    <div className="text-center w-32">
                                        <div className="w-20 h-20 mx-auto flex items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-400 rounded-lg relative">
                                                <div className="absolute w-4 h-8 bg-gray-400 rounded-full -top-2 left-6"></div>
                                                <div className="absolute w-4 h-6 bg-gray-400 rounded-full left-6 -bottom-4"></div>
                                                <div className="absolute w-2 h-6 bg-gray-400 rounded-full top-6 -left-2"></div>
                                                <div className="absolute w-1 h-3 bg-gray-600 transform rotate-45 left-8 top-4"></div>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-orange-700 mt-2">Elephant</p>
                                        <p className="text-xs text-gray-600">Ganesha - remover of obstacles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEW: Literature & Arts Section */}
                    {activeSection === 'literature' && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">Literary & Artistic Influences</h2>
                            <p className="text-center text-gray-700 mb-8">Stories, poems, and art that have shaped my worldview</p>

                            {/* Quote Carousel */}
                            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-sm mb-8">
                                <h3 className="text-lg font-medium text-orange-800 mb-4 text-center">Favorite Quotes</h3>

                                <div className="space-y-6">
                                    <div className="text-center p-4">
                                        <p className="italic text-gray-700 mb-2">
                                            "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवता:"
                                        </p>
                                        <p className="text-sm text-orange-800">
                                            "Where women are honored, divinity blossoms there." - Manusmriti
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <p className="italic text-gray-700 mb-2">
                                            "विद्या ददाति विनयं विनयाद्याति पात्रताम्।"
                                        </p>
                                        <p className="text-sm text-orange-800">
                                            "Knowledge gives humility, from humility comes worthiness." - Hitopadesa
                                        </p>
                                    </div>

                                    <div className="text-center p-4">
                                        <p className="italic text-gray-700 mb-2">
                                            "The woods are lovely, dark and deep, but I have promises to keep, and miles to go before I sleep."
                                        </p>
                                        <p className="text-sm text-orange-800">
                                            - Robert Frost (taught to me by my English teacher and remains my mantra)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Favorite Works List */}
                            <div>
                                <h3 className="text-lg font-medium text-orange-800 mb-4">Works That Shaped Me</h3>

                                <div className="space-y-4">
                                    {favoriteArts.map((work, index) => (
                                        <div key={index} className="p-4 border-l-4 border-orange-300 bg-white rounded-r-lg shadow-sm hover:border-orange-500 transition-colors">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h4 className="font-medium text-orange-800">{work.title}</h4>
                                                    <p className="text-sm text-gray-500">{work.type} by {work.creator}</p>
                                                </div>
                                                <div className="text-2xl">
                                                    {work.type === "Book" && "📚"}
                                                    {work.type === "Epic" && "🏛️"}
                                                    {work.type === "Poetry" && "📜"}
                                                    {work.type === "Film" && "🎬"}
                                                    {work.type === "Music" && "🎵"}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-gray-700 text-sm italic">{work.thoughts}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sound experience - simplified representation */}
                            <div className="mt-8 p-6 bg-orange-50 rounded-lg text-center">
                                <h3 className="text-lg font-medium text-orange-800 mb-4">Sounds of My Heritage</h3>
                                <p className="text-gray-700 mb-4">Music is the heartbeat of Indian culture. Click to experience the sounds that define my heritage.</p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    {["Classical Tabla", "Morning Veena", "Folk Bhajan", "Festival Drums", "Temple Bells"].map((sound, i) => (
                                        <button
                                            key={i}
                                            className="px-4 py-2 bg-white rounded-full shadow-sm border border-orange-200 hover:bg-orange-100 transition-colors text-orange-800"
                                        >
                                            {sound} 🔊
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs text-gray-500">* Audio samples would play in the full interactive version</p>
                            </div>
                        </div>
                    )}

                    {/* NEW: Gallery Section */}
                    {activeSection === 'gallery' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-center text-orange-800 mb-6">Visual Journey</h2>
                            <p className="text-center text-gray-700 mb-8">Glimpses of my world through images that tell stories</p>

                            {/* Image Gallery Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {galleryImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`${image.color} h-40 rounded-lg shadow-sm p-4 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow`}
                                        onClick={() => openGalleryModal(image)}
                                    >
                                        <div className="text-center">
                                            <h3 className="font-medium text-gray-800">{image.title}</h3>
                                            <p className="text-xs text-gray-600 mt-1">Click to view</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Gallery Modal */}
                            {isGalleryOpen && selectedGalleryImage && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
                                        <button
                                            onClick={closeGalleryModal}
                                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                                        >
                                            ✕
                                        </button>

                                        <div className={`${selectedGalleryImage.color} h-64 rounded-lg mb-4 flex items-center justify-center`}>
                                            <p className="text-gray-500">Image placeholder: {selectedGalleryImage.title}</p>
                                        </div>

                                        <h3 className="text-xl font-medium text-orange-800 mb-2">{selectedGalleryImage.title}</h3>
                                        <p className="text-gray-700">{selectedGalleryImage.description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Visual representation of hometown */}
                            <div className="mt-12">
                                <h3 className="text-lg font-medium text-orange-800 mb-4 text-center">My Hometown: Jaipur</h3>

                                <div className="relative h-64 bg-gradient-to-b from-blue-100 to-amber-100 rounded-lg overflow-hidden">
                                    {/* Sky and sun */}
                                    <div className="absolute top-4 right-8 w-12 h-12 rounded-full bg-yellow-400"></div>

                                    {/* Hills in background */}
                                    <div className="absolute bottom-32 left-0 right-0 h-16">
                                        <div className="absolute w-full h-full bg-amber-700 opacity-40" style={{
                                            borderRadius: "100% 100% 0 0"
                                        }}></div>
                                    </div>

                                    {/* City skyline */}
                                    <div className="absolute bottom-0 w-full flex justify-center">
                                        {/* City Palace */}
                                        <div className="h-48 w-24 bg-pink-300 relative mx-1">
                                            <div className="absolute top-0 left-0 right-0 h-8 bg-pink-400" style={{
                                                borderRadius: "100% 100% 0 0"
                                            }}></div>
                                            <div className="absolute top-12 left-8 w-8 h-12 bg-pink-400"></div>
                                        </div>

                                        {/* Hawa Mahal */}
                                        <div className="h-40 w-32 bg-pink-400 relative mx-1">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="absolute top-4 w-6 h-8 bg-pink-200" style={{
                                                    left: `${4 + i * 10}px`,
                                                    borderRadius: "100% 100% 0 0"
                                                }}></div>
                                            ))}
                                        </div>

                                        {/* Jantar Mantar */}
                                        <div className="h-32 w-20 bg-orange-300 relative mx-1">
                                            <div className="absolute top-0 left-6 w-8 h-16 bg-orange-400"></div>
                                            <div className="absolute top-4 left-2 w-4 h-10 bg-orange-400 transform rotate-45"></div>
                                        </div>

                                        {/* Amber Fort on hill */}
                                        <div className="h-36 w-36 relative mx-1">
                                            <div className="absolute bottom-0 w-full h-16 bg-amber-700 opacity-60" style={{
                                                borderRadius: "100% 100% 0 0"
                                            }}></div>
                                            <div className="absolute bottom-10 left-2 w-32 h-20 bg-amber-200"></div>
                                            <div className="absolute bottom-24 left-8 w-20 h-12 bg-amber-300"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-600">Known as the Pink City for its terracotta-colored buildings</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Philosophy Section */}
                    {activeSection === 'philosophy' && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-orange-800 mb-2">My Darshan (Philosophy)</h2>
                                <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-3">Vasudhaiva Kutumbakam</h3>
                                    <p className="text-gray-700">
                                        "The world is one family." I believe in the interconnectedness of all beings and strive to create harmony in diversity. Just as Indian cuisine balances six distinct flavors, I embrace the complexities of life with openness.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-3">Karma Yoga</h3>
                                    <p className="text-gray-700">
                                        The path of selfless action guides my work. Like a potter at his wheel, I focus on the craft itself rather than the rewards, finding joy in the creative process and service to others.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-3">Ahimsa & Compassion</h3>
                                    <p className="text-gray-700">
                                        Non-violence extends beyond actions to thoughts and words. I practice compassion toward all beings, believing that kindness, like the gentle monsoon rain, nurtures growth wherever it falls.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-3">Balance of Tradition & Innovation</h3>
                                    <p className="text-gray-700">
                                        Like a banyan tree with roots in tradition and branches reaching toward new possibilities, I honor ancient wisdom while embracing change and growth in our modern world.
                                    </p>
                                </div>
                            </div>

                            {/* Added: Cultural Practices Explanation */}
                            <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-orange-800 mb-4 text-center">Cultural Practices I Maintain</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🌅</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Surya Namaskar</h4>
                                            <p className="text-gray-700">
                                                Every morning at sunrise, I practice the ancient ritual of Sun Salutation. This isn't just exercise—it's a moving meditation that connects me to the rhythms of nature. My grandfather taught me that each of the 12 positions honors a different aspect of the sun's energy. I feel most centered when I complete this practice on our rooftop, watching the sun illuminate the pink buildings of Jaipur.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🪔</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Evening Aarti</h4>
                                            <p className="text-gray-700">
                                                The evening prayer ritual with lamp offerings has been part of my daily routine since childhood. In our home, we gather before our small altar, light the diya lamp, and recite mantras while circling the flame. This practice creates a moment of family unity and spiritual connection. The specific hand movements while performing aarti were taught to me by my grandmother, who explained that they represent drawing divine energy into our home.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-orange-800 italic">
                                    "अतिथि देवो भव" — The guest is equivalent to God. I welcome you to my digital home with an open heart.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with Indian-inspired geometric pattern */}
                <div className="mt-12 text-center">
                    {/* <div className="h-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-t-lg"></div> */}
                    <div className="text-xl md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        <p>Connect with me for chai 🍵 and conversation 💭</p>
                    </div>
                </div>
            </div>
        </div>
    );
}