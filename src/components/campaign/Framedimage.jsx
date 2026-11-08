import React from "react";

/**
 * Shows the whole image (never cropped). Empty space around it is filled with
 * a blurred copy of the same image so every frame keeps one consistent size.
 */
export default function FramedImage({
  src,
  alt,
  className = "",
  lazy = false,
  onError,
}) {
  return (
    <div className={`relative overflow-hidden bg-[#f3eae3] ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={lazy ? "lazy" : undefined}
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
      />
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        decoding="async"
        onError={onError}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}