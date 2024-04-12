//
/**
 * clientConfig
 *
 * clientConfig stores all required keys for application
 *
 */

// react local development user url
export const REACT_APP_LOCALHOST_URL = import.meta.env?.REACT_APP_LOCALHOST_URL || 'http://localhost:8087';
// geocoding api earmuff jam user geocoding api key
export const REACT_APP_GEOCODING_MAP_API_KEY = import.meta.env?.GEOCODING_MAP_API_KEY || '';

/**
 * Returns the color combination based on numbers.
 *
 * @param {Integer} remainingSpots
 * @returns {String} color of selected badge based on number
 */
export const fetchCurrentColor = (remainingSpots) => {
  const remainingSpotAndColor = {
    ERROR: 'error',
    WARNING: 'warning',
    SECONDARY: 'secondary',
    PRIMARY: 'primary',
  };

  if (remainingSpots <= 10) {
    return remainingSpotAndColor['ERROR'];
  } else if (remainingSpots <= 50) {
    return remainingSpotAndColor['WARNING'];
  } else if (remainingSpots <= 100) {
    return remainingSpotAndColor['SECONDARY'];
  }
  return remainingSpotAndColor['PRIMARY'];
};
