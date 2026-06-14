"use client";

import { useState } from "react";

export default function CarGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );

  const activeImage = images[activeIndex];

  function prevImage() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
    resetZoom();
  }

  function nextImage() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    resetZoom();
  }

  function resetZoom() {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }

  function zoomIn() {
    setZoom((current) => Math.min(current + 0.25, 4));
  }

  function zoomOut() {
    setZoom((current) => {
      const next = Math.max(current - 0.25, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }

  if (!activeImage) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl bg-gray-200 text-3xl shadow">
        🚗 Foto vozidla
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-white shadow">
        <button onClick={() => setIsOpen(true)} className="block w-full">
          <img
            src={activeImage}
            alt={title}
            className="h-[500px] w-full object-cover"
          />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white backdrop-blur-sm hover:bg-black/60"
            >
              ←
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white backdrop-blur-sm hover:bg-black/60"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => {
                setActiveIndex(index);
                resetZoom();
              }}
              className={`overflow-hidden rounded-xl border-2 bg-white shadow ${
                activeIndex === index ? "border-orange-600" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${title} foto ${index + 1}`}
                className="h-24 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <div className="absolute left-4 top-4 z-10 flex gap-3">
            <button
              onClick={zoomOut}
              className="rounded-full bg-white/20 px-5 py-3 text-2xl text-white hover:bg-white/30"
            >
              -
            </button>

            <button
              onClick={zoomIn}
              className="rounded-full bg-white/20 px-5 py-3 text-2xl text-white hover:bg-white/30"
            >
              +
            </button>

            <button
              onClick={resetZoom}
              className="rounded-full bg-white/20 px-5 py-3 text-white hover:bg-white/30"
            >
              Reset
            </button>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              resetZoom();
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/20 px-5 py-3 text-2xl text-white hover:bg-white/30"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-3xl text-white hover:bg-white/30"
              >
                ←
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-3xl text-white hover:bg-white/30"
              >
                →
              </button>
            </>
          )}

          <div
            onWheel={handleWheel}
            onMouseDown={(e) => {
              if (zoom > 1) {
                setDragStart({
                  x: e.clientX - position.x,
                  y: e.clientY - position.y,
                });
              }
            }}
            onMouseMove={(e) => {
              if (dragStart && zoom > 1) {
                setPosition({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y,
                });
              }
            }}
            onMouseUp={() => setDragStart(null)}
            onMouseLeave={() => setDragStart(null)}
            className="flex h-full w-full cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
          >
            <img
              src={activeImage}
              alt={title}
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
              className="max-h-[90vh] max-w-[90vw] select-none object-contain transition-transform duration-100"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 text-white">
            {activeIndex + 1} / {images.length} — Zoom {Math.round(zoom * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}