import { generatePath } from "react-router-dom";

/*
 *
 * Update the search params in the URL
 * Keeping the current ones and adding the new ones
 *
 * @param {Object} newParams - Object with the new params to be updated
 * @returns {String} - The updated search params
 *
 */
export function updateSearchParams(newParams = {}, reset = false) {
  if (reset) {
    return new URLSearchParams(newParams).toString();
  }

  const currentSearchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(newParams)) {
    if (value === undefined) {
      currentSearchParams.delete(key);
    } else if (value === null) {
      currentSearchParams.set(key, "");
    } else {
      currentSearchParams.set(key, value);
    }
  }

  return currentSearchParams.toString();
}

/*
 *
 * Generate a path with the params and search params provided.
 * By default it keeps the previous search params.
 *
 * @param {String} url - The url to be generated
 * @param {Object} params - The params to be added to the url
 * @param {Object} searchParams - The search params to be added to the url
 * @param {Boolean} resetSearchParams - If the search params should be reset
 * @returns {String} - The generated path
 *
 */

const DEFAULT_OPTIONS = {
  params: {},
  searchParams: {},
  resetSearchParams: false,
};

export function makePath(url, { params, searchParams, resetSearchParams = false } = DEFAULT_OPTIONS) {
  const finishUrl = generatePath(url, params);
  const search = updateSearchParams(searchParams, resetSearchParams);
  return `${finishUrl}?${search}`;
}
