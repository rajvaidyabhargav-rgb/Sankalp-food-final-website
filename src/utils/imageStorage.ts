export interface ProductImageConfig {
  customImage?: string; // Data URL or base64
  imageZoom: number;    // default 1.0
  imagePositionX: number; // default 0 (in px)
  imagePositionY: number; // default 0 (in px)
}

export type CustomImagesMap = {
  [productId: string]: ProductImageConfig;
};

const STORAGE_KEY = 'sankalp_custom_fruit_images_v1';

export const getCustomImageConfigs = (): CustomImagesMap => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading custom image configs from localStorage:', e);
    return {};
  }
};

export const saveCustomImageConfig = (productId: string, config: ProductImageConfig): CustomImagesMap => {
  try {
    const current = getCustomImageConfigs();
    current[productId] = config;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Error saving custom image config to localStorage:', e);
    return getCustomImageConfigs();
  }
};

export const removeCustomImageConfig = (productId: string): CustomImagesMap => {
  try {
    const current = getCustomImageConfigs();
    delete current[productId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Error removing custom image config from localStorage:', e);
    return getCustomImageConfigs();
  }
};
