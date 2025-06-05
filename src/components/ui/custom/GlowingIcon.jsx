import { motion } from "framer-motion";

export default function GlowingButton() {
  return (
    <>
      <style jsx>{`
        .glow-btn {
          /* Animation làm box-shadow thở đều */
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
          50% {
            box-shadow: 0 0 30px 15px rgba(255, 193, 7, 0.7);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }
      `}</style>
      
      <motion.div
        className="glow-btn absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          delay: 0.3,
        }}
      >
        🌞
      </motion.div>

      
    </>
  );
}