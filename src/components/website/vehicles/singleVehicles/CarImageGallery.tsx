"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  images: string[];
  title: string;
};

const CarImageGallery = ({ images = [], title }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] bg-gray-100 flex items-center justify-center rounded-lg border">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setDirection(-1);
    setActiveIndex((idx) => (idx - 1 + images.length) % images.length);
  };

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setDirection(1);
    setActiveIndex((idx) => (idx + 1) % images.length);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-[72%]">
          <div
            className="rounded-lg overflow-hidden border relative h-[300px] sm:h-[400px] md:h-[600px] cursor-zoom-in"
            onClick={() => activeImage && setIsLightboxOpen(true)}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              {activeImage && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 50 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={title}
                    className="w-full h-full object-cover"
                    width={1200}
                    height={800}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/60 z-10 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/60 z-10 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-[28%] flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={
                "rounded-md overflow-hidden border shrink-0 w-16 h-16 md:w-full md:h-[120px] cursor-pointer transition-all " +
                (activeIndex === idx
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-gray-200 hover:border-gray-300")
              }
            >
              <Image
                src={img}
                alt={`thumb-${idx}`}
                className="w-full h-full object-cover text-[10px]"
                width={200}
                height={150}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-2 flex items-center gap-2 z-50 bg-black/20 rounded-full md:bg-transparent"
            >
              <X className="h-6 w-6" />
              <span className="text-sm font-medium hidden md:inline">
                Close
              </span>
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={prev}
                className="absolute left-0 text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden md:block"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>

              <div className="w-full h-full relative">
                <Image
                  src={activeImage}
                  alt={title}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </div>

              <button
                onClick={next}
                className="absolute right-0 text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden md:block"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CarImageGallery;
