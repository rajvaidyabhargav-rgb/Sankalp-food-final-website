import React, { useState, useRef } from 'react';
import { FruitProduct } from '../types';
import { ProductImageConfig } from '../utils/imageStorage';
import {
  X,
  Upload,
  RotateCcw,
  Trash2,
  Check,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Camera,
  Sparkles,
} from 'lucide-react';

interface CustomImageModalProps {
  fruit: FruitProduct;
  currentConfig?: ProductImageConfig;
  onSave: (fruitId: string, newConfig: ProductImageConfig) => void;
  onRemove: (fruitId: string) => void;
  onClose: () => void;
}

export const CustomImageModal: React.FC<CustomImageModalProps> = ({
  fruit,
  currentConfig,
  onSave,
  onRemove,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local temporary editor state
  const [tempCustomImage, setTempCustomImage] = useState<string | undefined>(
    currentConfig?.customImage
  );
  const [tempZoom, setTempZoom] = useState<number>(currentConfig?.imageZoom ?? 1.0);
  const [tempX, setTempX] = useState<number>(currentConfig?.imagePositionX ?? 0);
  const [tempY, setTempY] = useState<number>(currentConfig?.imagePositionY ?? 0);
  const [isNewUpload, setIsNewUpload] = useState<boolean>(false);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  const displayImage = tempCustomImage || fruit.image;

  // Handle file upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setTempCustomImage(event.target.result as string);
        setIsNewUpload(true);
        setImgLoadError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Adjustments
  const handleZoomChange = (val: number) => {
    const clamped = Math.min(3.0, Math.max(0.5, val));
    setTempZoom(parseFloat(clamped.toFixed(2)));
  };

  const handleNudge = (dx: number, dy: number) => {
    setTempX((prev) => Math.min(150, Math.max(-150, prev + dx)));
    setTempY((prev) => Math.min(150, Math.max(-150, prev + dy)));
  };

  const handleResetFit = () => {
    setTempZoom(1.0);
    setTempX(0);
    setTempY(0);
  };

  const handleRemoveCustomImage = () => {
    onRemove(fruit.id);
    onClose();
  };

  const handleSave = () => {
    onSave(fruit.id, {
      customImage: tempCustomImage,
      imageZoom: tempZoom,
      imagePositionX: tempX,
      imagePositionY: tempY,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-amber-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif leading-tight">
                Custom Fruit Image Manager
              </h2>
              <p className="text-[11px] text-amber-200">
                {fruit.name} {fruit.marathiName ? `(${fruit.marathiName})` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-amber-200 transition-colors"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Upload Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <div>
              <p className="text-xs font-bold text-amber-950">Upload Custom Image</p>
              <p className="text-[10px] text-amber-800">
                Supports PNG (Transparent), JPG, JPEG, WebP. Any resolution/aspect ratio.
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{tempCustomImage ? 'Replace Photo' : 'Upload Photo'}</span>
            </button>
          </div>

          {/* Live Card Stage Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                Live 3D Card Stage Preview
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                {tempCustomImage
                  ? isNewUpload
                    ? 'New Upload Preview (Unsaved)'
                    : 'Active Custom Image'
                  : 'Default Farm Stock Image'}
              </span>
            </div>

            {/* Simulated Product Card Stage */}
            <div className="relative h-56 overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/80 via-amber-100/50 to-amber-50/20 p-4 flex flex-col items-center justify-center border border-amber-300 shadow-inner">
              
              {/* Soft Backlight Glow */}
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400/30 to-amber-300/40 blur-2xl pointer-events-none" />

              {/* Preview Image Stage Container */}
              <div className="relative w-full h-40 flex items-center justify-center overflow-hidden z-10">
                <img
                  src={imgLoadError ? fruit.image : displayImage}
                  alt={fruit.name}
                  onError={() => setImgLoadError(true)}
                  style={{
                    transform: `translate(${tempX}px, ${tempY}px) scale(${tempZoom})`,
                  }}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)] transition-transform duration-75 ease-out"
                />
              </div>

              {/* Contact Shadow */}
              <div className="w-3/4 h-3 bg-amber-950/25 rounded-[100%] blur-md animate-contact-shadow mx-auto -mt-2 z-0" />
            </div>
          </div>

          {/* Image Adjustment Controls */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-4">
            <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center justify-between">
              <span>Image Controls (Zoom & Position)</span>
              <button
                onClick={handleResetFit}
                className="text-[11px] text-orange-700 hover:underline flex items-center gap-1 font-bold normal-case"
              >
                <Maximize2 className="w-3 h-3" />
                Reset Fit
              </button>
            </h3>

            {/* Zoom Slider & Buttons */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Zoom Level:</span>
                <span className="text-orange-700 font-black">{tempZoom.toFixed(2)}x</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleZoomChange(tempZoom - 0.1)}
                  className="p-2 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={tempZoom}
                  onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                  className="flex-1 accent-orange-600 h-2 bg-amber-200 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => handleZoomChange(tempZoom + 0.1)}
                  className="p-2 rounded-lg bg-white border border-amber-300 hover:bg-amber-100 text-amber-900"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Position Direction Pad & Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              {/* Direction Pad */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-amber-900">Directional Nudge:</p>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleNudge(0, -5)}
                    className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-200 text-amber-950 font-bold shadow-xs"
                    title="Nudge Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNudge(-5, 0)}
                      className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-200 text-amber-950 font-bold shadow-xs"
                      title="Nudge Left"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleResetFit}
                      className="px-2 py-1 rounded-lg bg-amber-200 text-amber-950 text-[10px] font-black border border-amber-300"
                      title="Center Image"
                    >
                      Fit
                    </button>
                    <button
                      onClick={() => handleNudge(5, 0)}
                      className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-200 text-amber-950 font-bold shadow-xs"
                      title="Nudge Right"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleNudge(0, 5)}
                    className="p-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-200 text-amber-950 font-bold shadow-xs"
                    title="Nudge Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Position Sliders */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-amber-900">
                    <span>Horizontal Offset (X):</span>
                    <span className="text-orange-700">{tempX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    step="1"
                    value={tempX}
                    onChange={(e) => setTempX(parseInt(e.target.value, 10))}
                    className="w-full accent-orange-600 h-2 bg-amber-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-amber-900">
                    <span>Vertical Offset (Y):</span>
                    <span className="text-orange-700">{tempY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    step="1"
                    value={tempY}
                    onChange={(e) => setTempY(parseInt(e.target.value, 10))}
                    className="w-full accent-orange-600 h-2 bg-amber-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-amber-200 bg-amber-50/90 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            {tempCustomImage && (
              <button
                onClick={handleRemoveCustomImage}
                className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Remove custom photo and revert to default image"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Custom Photo</span>
              </button>
            )}

            <button
              onClick={handleResetFit}
              className="px-3 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Reset Zoom & Position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Image & Settings</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
