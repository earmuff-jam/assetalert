//
/**
 * clientConfig
 *
 * clientConfig stores all required keys for application
 *
 * react environment host for application
 * react websocket host for application
 * geocoding api for server - using earmuffjam
 *
 */

export const REACT_APP_LOCALHOST_URL = import.meta.env?.REACT_APP_LOCALHOST_URL || 'http://localhost:8087';
export const REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL =
  import.meta.env?.REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL || 'ws://localhost:8087';
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
    SECONDARY: 'secondary',
    PRIMARY: 'primary',
  };

  if (remainingSpots <= 10) {
    return remainingSpotAndColor['ERROR'];
  } else if (remainingSpots <= 100) {
    return remainingSpotAndColor['SECONDARY'];
  }
  return remainingSpotAndColor['PRIMARY'];
};
