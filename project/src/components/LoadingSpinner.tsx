import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <motion.div
        className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-indigo-600 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;