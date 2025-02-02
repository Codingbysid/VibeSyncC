import Image from "next/image";
import Link from 'next/link';

export default function Demo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/10/79/55/90/360_F_1079559029_VKBcsBK5SrPXi6jhTerSSRLt0SOAWDZG.jpg')" }}>
      
      {/* Gradient Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Centered on Image */}
      <div className="relative text-center text-white">
        <h1 className="font-serif text-4xl font-bold mb-6 drop-shadow-lg">🎉 Welcome to VibeSync 🎶</h1>
        <p>At VibySync, our mission is to revolutionize party planning by making it effortless, fun, and <br /> slightly chaotic through AI-powered automation, <br />smart event coordination, and seamless music integration</p>
        <br />
        
        {/* Buttons */}
        <div className="space-x-4">
          {/* Invite Friends Button */}
          <Link href="/invite">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-400 shadow-lg">
              Invite Friends
            </button>
          </Link>

          {/* Second Button - Placeholder for Future Action */}
          <Link href="/plan">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-blue-400 shadow-lg">
            Plan a Event
          </button>
          </Link>

          <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300 hover:bg-red-400 shadow-lg">
            Add Song Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
