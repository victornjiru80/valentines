import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronLeft, ChevronRight, Star } from "lucide-react";

// Personalization: Add your photos here
const PHOTOS = [
  "https://via.placeholder.com/400x300?text=Us+Together",
  "https://via.placeholder.com/400x300?text=Beautiful+Margaret",
  "https://via.placeholder.com/400x300?text=Our+Memories",
];

// Reasons why
const REASONS = [
  "Be my Valentine… or I\'ll have to keep flirting with you until you say yes.",
  "I don\'t need Cupid. I\'ve got perfect aim.",
  "You already stole my heart. Might as well take the title too.",
  "Your presence calms my soul 🌸",
  "I don\'t need a love song. I\'ve got you.",
];

// Romantic quotes
const QUOTES = [
  '"There\'s always a tree" - Taliban',
  '"Love is a journey" - Kairetu',
  '"Every moment with you doesn\'t just pass, it builds" - Taliban',
];

// Set this to the path of your MP3 in `public/` (or any direct MP3 URL)
// Example: const SONG_URL = '/song.mp3';
const SONG_URL = "/song.mp3";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  // Setup audio (MP3) from SONG_URL
  useEffect(() => {
    if (!SONG_URL) return;

    audioRef.current = new Audio(SONG_URL);
    audioRef.current.loop = true;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSong = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    } catch (e) {
      console.warn('Playback failed', e);
    }
  };

  const moveNoButton = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    setNoPosition({ x: randomX, y: randomY });
  };

  // Auto-cycle quotes
  useEffect(() => {
    if (accepted) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [accepted]);

  // Confetti animation
  useEffect(() => {
    if (accepted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [accepted]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const nextReason = () => {
    setCurrentReasonIndex((prev) => (prev + 1) % REASONS.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 overflow-hidden relative px-4 py-8">

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "-10vh", x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ y: "100vh", opacity: 0 }}
              transition={{ duration: 2.5 + Math.random() * 1 }}
              className="absolute text-2xl"
            >
              {["💖", "✨", "💕", "🎉", "💐"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute text-pink-500 opacity-30"
          >
            <Heart size={24 + Math.random() * 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 max-w-2xl w-full text-center relative z-10 mx-2 sm:mx-4"
      >
        {!accepted ? (
          <>
            {/* Photo Carousel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-48 sm:h-64 md:h-80 bg-gray-200">
                <motion.img
                  key={currentPhotoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={PHOTOS[currentPhotoIndex]}
                  alt="Us Together"
                  className="w-full h-full object-cover"
                />

                {/* Photo Navigation */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg z-20 transition active:scale-90"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg z-20 transition active:scale-90"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>

                {/* Photo Counter */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {PHOTOS.length}
                </div>
              </div>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-4"
            >
              <Sparkles className="text-pink-500 w-10 h-10" />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Hey Maggieee 💜
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">- From Sleepyhead with lots of love</p>

            {/* Personal Message */}
            <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed font-medium">
             "I don't know how you do it, but you've turned me into someone who smiles at their phone like a mumu.
            You've got this dangerous combination of beauty, brains, and that little spark that keeps me hooked. And honestly? 
            I don't mind being your favorite distraction."
            </p>

            {/* Reasons Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-pink-300"
            >
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Star className="text-yellow-500 mr-2 fill-yellow-500" size={16} />
                <p className="text-xs sm:text-sm font-bold text-gray-700">Reason #{currentReasonIndex + 1}</p>
                <Star className="text-yellow-500 ml-2 fill-yellow-500" size={16} />
              </div>
              <motion.p
                key={currentReasonIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4"
              >
                {REASONS[currentReasonIndex]}
              </motion.p>
              <button
                onClick={nextReason}
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition active:scale-95 touch-none"
              >
                Next Reason →
              </button>
            </motion.div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-pink-600 mb-6 sm:mb-8">
              So, Dzidza....Do I get the honor?
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 relative mt-2">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  await playSong();
                  setAccepted(true);
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg transition touch-none active:scale-90"
              >
                Yes, duh! 💖
              </motion.button>

              {/* NO BUTTON */}
              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-md absolute md:static touch-none active:scale-90"
              >
                Nope 🙈
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center"
          >
            <Heart
              className="text-red-500 mb-4"
              size={80}
              fill="currentColor"
            />

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-4 sm:mb-6">
              Always knew you had a good taste, bbg! ❤️
            </h1>

            {/* Rotating Quote */}
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-pink-200 w-full sm:max-w-md"
            >
              <p className="text-base sm:text-lg italic text-gray-800 font-semibold">
                {QUOTES[currentQuoteIndex]}
              </p>
            </motion.div>

            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Valentine's Day just got upgraded. I'll make sure it's unforgettable — but you saying yes?
              That's the part that makes me feel like I just pulled off the biggest win of my life.
            </p>

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl sm:text-5xl mb-6 sm:mb-8"
            >
              💖
            </motion.div>

            <p className="text-xs sm:text-sm text-gray-600 italic px-2">
              Time isn't weakening this feeling —it's strengthening it.
              And I'm falling for you more with every heartbeat.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
