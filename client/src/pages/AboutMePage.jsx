import { useState } from 'react';

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

    // Helper Functions
    const openGalleryModal = (image) => {
        setSelectedGalleryImage(image);
        setIsGalleryOpen(true);
    };

    const closeGalleryModal = () => {
        setIsGalleryOpen(false);
        setSelectedGalleryImage(null);
    };

    return (
        <div className="min-h-screen z-20 bg-amber-50">
            {/* Decorative Header with Enhanced Rangoli-inspired Pattern */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
                <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="400" cy="400" r="300" fill="none" stroke="white" strokeWidth="5" />
                        <circle cx="400" cy="400" r="250" fill="none" stroke="white" strokeWidth="5" />
                        <circle cx="400" cy="400" r="200" fill="none" stroke="white" strokeWidth="5" />
                        <circle cx="400" cy="400" r="150" fill="none" stroke="white" strokeWidth="5" />
                        <path d="M400,100 L400,700 M100,400 L700,400 M228,228 L572,572 M228,572 L572,228" stroke="white" strokeWidth="5" />

                        {/* Enhanced pattern with paisley elements */}
                        <g>
                            {[0, 90, 180, 270].map((angle, i) => (
                                <g key={i} transform={`rotate(${angle} 400 400)`}>
                                    <path d="M480,250 Q510,200 480,150 Q450,180 480,210 Q500,190 480,250" fill="white" opacity="0.5" />
                                    <path d="M500,300 Q550,280 560,240 Q540,220 520,240 Q530,270 500,300" fill="white" opacity="0.5" />
                                </g>
                            ))}
                        </g>

                        <circle cx="400" cy="400" r="50" fill="white" />
                        <circle cx="400" cy="400" r="30" fill="#FF6B6B" />
                    </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">Harshith S Kudapali</h1>
                        <p className="mt-2 text-xl text-white">नमस्ते, मेरा स्वागत है</p>
                        <p className="mt-1 text-sm text-white">Hindi • Kannada • English • Sanskrit</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Navigation inspired by temple arches */}
                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap justify-center space-x-2 p-2 rounded-full bg-white shadow-md">
                        {['intro', 'journey', 'culture', 'passions', 'literature', 'gallery', 'philosophy'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`px-4 py-2 mb-2 rounded-full transition-colors duration-300 ${activeSection === section
                                    ? 'bg-orange-500 text-white'
                                    : 'hover:bg-orange-100 text-orange-800'
                                    }`}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Container with decorative border */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-orange-200" style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFA07A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}>
                    {/* Intro Section */}
                    {activeSection === 'intro' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg flex-shrink-0">
                                    <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center">
                                        <span className="text-6xl text-white">प्र</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Namaste! I'm Priya, born and raised in the vibrant city of Jaipur, Rajasthan - the Pink City of India. My life is a colorful tapestry woven with threads of ancient tradition and modern aspirations, much like the intricate patterns of a hand-dyed bandhani dupatta.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                <p className="italic text-orange-800 font-medium">
                                    "जहां हम से है वहीं से हम हैं" — Our roots define who we are, and I carry mine proudly wherever I go.
                                </p>
                            </div>

                            <p className="text-gray-700">
                                Like the dancing flames of a Diwali diya, I aspire to bring light and warmth to every space I occupy. My heritage is my strength - from the spices that flavor my cooking to the values that guide my decisions, India flows through my veins and inspires my creative expression.
                            </p>

                            {/* Added animated diyas */}
                            <div className="flex justify-center py-4">
                                <div className="flex space-x-8">
                                    {[1, 2, 3].map((diya) => (
                                        <div key={diya} className="relative">
                                            <div className="w-12 h-4 bg-orange-700 rounded-full"></div>
                                            <div className="w-8 h-8 mx-auto -mt-1">
                                                <div className="absolute w-4 h-8 bg-yellow-500 rounded-full mx-auto left-4 animate-pulse opacity-90"></div>
                                                <div className="absolute w-2 h-6 bg-orange-400 rounded-full mx-auto left-5 animate-pulse opacity-80"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Journey Section */}
                    {activeSection === 'journey' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-px bg-orange-200 flex-grow"></div>
                                <span className="px-4 text-xl font-semibold text-orange-800">My Yatra</span>
                                <div className="h-px bg-orange-200 flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-orange-50 p-4 rounded-lg border-b-2 border-orange-300">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-orange-600 font-bold">1</span>
                                    </div>
                                    <h3 className="font-bold text-orange-800 mb-2">Childhood in Jaipur</h3>
                                    <p className="text-gray-700">Growing up surrounded by palaces and folk art, learning classical Kathak dance, and listening to my grandmother's stories from the Ramayana.</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border-b-2 border-orange-300">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-orange-600 font-bold">2</span>
                                    </div>
                                    <h3 className="font-bold text-orange-800 mb-2">Education & Growth</h3>
                                    <p className="text-gray-700">Studying both ancient Sanskrit texts and modern design, finding harmony between tradition and innovation in my creative pursuits.</p>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border-b-2 border-orange-300">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-orange-600 font-bold">3</span>
                                    </div>
                                    <h3 className="font-bold text-orange-800 mb-2">Present Endeavors</h3>
                                    <p className="text-gray-700">Creating digital art inspired by Indian miniature paintings, practicing yoga daily, and building bridges between cultures through storytelling.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NEW: Cultural Timeline Section */}
                    {activeSection === 'culture' && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-center text-orange-800 mb-4">Cultural Calendar</h2>
                            <p className="text-center text-gray-700 mb-6">The rhythm of my year follows these cherished celebrations</p>

                            {/* Festival Timeline */}
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-200"></div>

                                <div className="space-y-12">
                                    {culturalTimeline.map((event, index) => (
                                        <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <div className="w-1/2 pr-8 text-right">
                                                {index % 2 === 0 ? (
                                                    <>
                                                        <h3 className="font-bold text-orange-800">{event.month}</h3>
                                                        <h4 className="font-medium text-orange-600">{event.festival}</h4>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-700">{event.description}</p>
                                                )}
                                            </div>

                                            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 border-4 border-white shadow z-10 flex items-center justify-center">
                                                {/* Festival symbols */}
                                                {index === 0 && <span>🪁</span>}
                                                {index === 1 && <span>🎨</span>}
                                                {index === 2 && <span>🌙</span>}
                                                {index === 3 && <span>🪔</span>}
                                                {index === 4 && <span>🐪</span>}
                                            </div>

                                            <div className="w-1/2 pl-8">
                                                {index % 2 !== 0 ? (
                                                    <>
                                                        <h3 className="font-bold text-orange-800">{event.month}</h3>
                                                        <h4 className="font-medium text-orange-600">{event.festival}</h4>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-700">{event.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Regional Traditions */}
                            <div className="mt-12 p-6 bg-orange-50 rounded-lg">
                                <h3 className="text-xl font-semibold text-orange-800 mb-4">Rajasthani Traditions I Preserve</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">👗</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Bandhej (Tie-Dye)</h4>
                                            <p className="text-sm text-gray-600">I learned this traditional tie-dye technique from my mother and still create my own dupattas.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🖌️</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Blue Pottery</h4>
                                            <p className="text-sm text-gray-600">A Persian art form brought to Jaipur - I attend workshops to keep this craft alive.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🍲</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Dal Baati Churma</h4>
                                            <p className="text-sm text-gray-600">Our family recipe for this Rajasthani dish has been passed down for five generations.</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">🎭</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-orange-700">Kathputli</h4>
                                            <p className="text-sm text-gray-600">I volunteer teaching children the art of traditional Rajasthani puppetry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Family Recipe */}
                            <div className="mt-8 border-2 border-dashed border-orange-300 p-6 rounded-lg">
                                <h3 className="text-center font-medium text-orange-800 mb-3">Family Recipe: Dadi's Gatte ki Sabzi</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-orange-700 mb-2">Ingredients:</h4>
                                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                            <li>2 cups besan (gram flour)</li>
                                            <li>1/2 cup yogurt</li>
                                            <li>2 tbsp ghee</li>
                                            <li>1 tsp carom seeds (ajwain)</li>
                                            <li>Red chilli powder to taste</li>
                                            <li>Turmeric, coriander, garam masala</li>
                                            <li>Fresh coriander leaves</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-orange-700 mb-2">Story:</h4>
                                        <p className="text-gray-700 text-sm">
                                            My grandmother would make this dish every Sunday. She taught me that the secret is to knead the dough with love and patience. "The ghee must be homemade," she would insist, "and the yogurt should be slightly sour." Now I make this dish for special family gatherings, continuing her legacy.
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
                    <div className="h-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-t-lg"></div>
                    <div className="py-4 text-orange-800">
                        <p>Connect with me for chai and conversation</p>
                    </div>
                </div>
            </div>
        </div>
    );
}