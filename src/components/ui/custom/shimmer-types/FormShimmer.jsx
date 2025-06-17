import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin } from 'lucide-react';

const FormShimmer = () => {
  const shimmerVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const FormSectionShimmer = ({ icon: Icon, title, gradientFrom, gradientTo, children }) => (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.3, type: "spring" },
        height: { duration: 0.3, type: "spring" },
      }}
      className="bg-white/90 border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-xl pt-0 px-0 p-0 space-y-0 transition-all duration-500"
    >
      <div className={`flex items-center gap-4 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-t-3xl border-b-0 mb-0 mx-0 px-8 py-4`}>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
        <h4 className="text-xl font-bold text-white flex items-center gap-2">
          {title}
        </h4>
        <div className="flex-1 h-px bg-white/30"></div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </motion.div>
  );

  const InputShimmer = ({ className = "" }) => (
    <div className={`space-y-2 ${className}`}>
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="h-4 bg-gray-300 rounded-md w-24"
      />
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="h-12 bg-gray-200 rounded-xl border border-gray-300"
      />
    </div>
  );

  const AddressFieldsShimmer = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InputShimmer />
      <InputShimmer />
      <InputShimmer />
      <InputShimmer />
      <div className="sm:col-span-2">
        <InputShimmer />
      </div>
    </div>
  );

  return (
    <div className="overflow-y-auto flex-1 py-8 px-4 md:px-12" style={{ scrollbarWidth: "thin" }}>
      <div className="space-y-8">
        {/* Thông tin cá nhân shimmer */}
        <FormSectionShimmer
          icon={User}
          title="Thông tin cá nhân"
          gradientFrom="from-cyan-500"
          gradientTo="to-blue-600"
        >
          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <InputShimmer />
            <InputShimmer />
            <InputShimmer />
            <InputShimmer />
            <InputShimmer />
          </motion.div>
        </FormSectionShimmer>

        {/* Địa chỉ thường trú shimmer */}
        <FormSectionShimmer
          icon={MapPin}
          title="Địa chỉ thường trú"
          gradientFrom="from-teal-400"
          gradientTo="via-cyan-500 to-teal-600"
        >
          <AddressFieldsShimmer />
        </FormSectionShimmer>

        {/* Địa chỉ liên lạc shimmer */}
        <FormSectionShimmer
          icon={MapPin}
          title="Địa chỉ liên lạc"
          gradientFrom="from-indigo-400"
          gradientTo="via-blue-500 to-indigo-600"
        >
          <div className="flex justify-end mb-6">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="h-10 w-48 bg-gray-300 rounded-xl"
            />
          </div>
          <AddressFieldsShimmer />
        </FormSectionShimmer>
      </div>
    </div>
  );
};

export default FormShimmer;