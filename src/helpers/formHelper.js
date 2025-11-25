import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "../constant/FILE_CONFIG.js";

/**
 * Update a specific field in a form data object.
 *
 * Creates a new object by copying the existing form data and
 * updating the specified field with the provided value.
 *
 * @param {Object} formData - The current form data object.
 * @param {string} field - The key of the field to update.
 * @param {*} value - The new value for the specified field.
 * @returns {Object} A new form data object with the updated field.
 *
 * @example
 * const formData = { name: "Alice", age: 25 };
 * const newFormData = updateFormData(formData, "age", 26);
 * console.log(newFormData); // { name: "Alice", age: 26 }
 */
function updateFormData(formData, field, value) {
  return { ...formData, [field]: value };
}

/**
 * Validate an image file against allowed types and max size
 * @param {File} fileImg - The file to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {boolean} true if file is valid, false otherwise
 */
function validImgFile(
  fileImg,
  allowedTypes = ALLOWED_IMAGE_TYPES,
  maxSize = MAX_IMAGE_SIZE
) {
  if (!fileImg || !(fileImg instanceof File)) return false;

  const { size, type } = fileImg;

  const isAllowImgType = (type) => allowedTypes.includes(type);

  const isSizeExceed = (size) => size > maxSize;

  if (!isAllowImgType(type) || isSizeExceed(size)) return false;

  return true;
}

/**
 * Handle file upload for form fields and generate a preview URL.
 *
 * @param {Event} event - The file input change event.
 * @param {Function} setPreview - State setter for preview URL.
 * @param {Function} onChange - Form data update function (field, file).
 * @param {string} fieldName - Name of the field in formData to update.
 */
function handleFileImgUpload(event, setPreview, onChange, fieldName) {
  const file = event.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file); // generate preview

  setPreview?.(previewUrl); // update preview state

  //convert file
  onChange(fieldName, file); // update form data
}

/**
 *
 * @param {string} duplicate  - data that duplicate with input
 * @param {string} target  - user input
 * @returns  duplicate === target;
 */
function isDup(duplicate, target) {
  return duplicate === target;
}
/**
 *
 * @param {regex} regex
 * @param {string} target
 * @returns true  or false;
 */
function isValidFormat(regex, target) {
  return regex.test(target);
}
export {
  validImgFile,
  updateFormData,
  handleFileImgUpload,
  isDup,
  isValidFormat,
};
