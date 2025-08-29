"use client";

import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerTitle: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  headerTitle,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full sm:w-full md:w-3/4 lg:w-1/2 xl:w-[800px] max-w-full bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Fixed Header */}
              <div className="shrink-0 px-6 py-3 border-b bg-white z-10 flex items-center justify-between">
                <ArrowLeft onClick={onClose} className="text-green-600 hover:-translate-x-1 cursor-pointer duration-300"/>

                <h2 className="text-lg md:text-xl text-green-500 font-semibold">{headerTitle}</h2>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
