import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOutsideClick } from "../../hook/useOutsideClick"; // Adjust path as needed
import { validImgFile } from "../../helpers/formHelper"; // Adjust path as needed

export function usePostForm(onSubmit, initialData = {}) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "TEXT";

  const [displaySearch, setDisplaySearch] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isShowDeleteBtn, setShowDeleteBtn] = useState(false);

  // centralized error state
  const [error, setError] = useState("");
  const initialFormState = {
    title: "",
    text: "",
    image: [],
    // add other fields if necessary
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    text: initialData?.text || "",
    // Ensure image is always an array to handle multiple uploads consistently
    image: initialData?.postImage_url || [],
  });

  const postOptions = [
    { key: "TEXT", label: "Text" },
    { key: "IMAGE", label: "Image" },
  ];

  /* ---------------------- HELPERS ---------------------- */

  // Internal helper to process files from Drop or Input
  const processFiles = (files) => {
    if (!files || files.length === 0) return;
    console.log(files);
    const validFiles = [];
    let validationError = "";

    files.forEach((file) => {
      const { isValid, error: fileError } = validImgFile(file);
      if (isValid) {
        validFiles.push(file);
      } else {
        validationError = fileError;
      }
    });

    // If there is an error, set it and stop (or continue with valid ones)
    if (validationError) {
      setError(validationError);
      // Optional: If you want to reject ALL files if one is bad, return here.
      // Currently, we proceed with the valid ones but warn the user.
    } else {
      setError(""); // Clear error if successful
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: [...(prev.image || []), ...validFiles],
      }));
    }
  };

  /* ---------------------- HANDLERS ---------------------- */

  function closeSearchBar() {
    setDisplaySearch(false);
  }
  const ref = useOutsideClick(closeSearchBar);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types to improve UX
    if (error) setError("");
  }

  // 1. INPUT CHANGE HANDLER
  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    processFiles(files);

    // Reset input value so the same file can be selected again if deleted
    e.target.value = "";
  }

  // 2. DROP HANDLER
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    // Support multiple files in drop
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleMouseEnter() {
    setShowDeleteBtn(true);
  }

  function handleMouseLeave() {
    setShowDeleteBtn(false);
  }

  // Handle deleting specific image or all
  function handleCancelImage(e, index = null) {
    e.preventDefault();

    setFormData((prev) => {
      // If index is provided, remove specific image
      if (index !== null && Array.isArray(prev.image)) {
        const updatedImages = prev.image.filter((_, i) => i !== index);
        return { ...prev, image: updatedImages };
      }
      // Otherwise clear all (fallback)
      return { ...prev, image: [] };
    });
  }

  // 3. SUBMIT HANDLER
  // We accept `externalValidators` (like community/topic) that live in the Component
  function handleSubmit(e, externalContext = {}) {
    e.preventDefault();
    setError("");

    // A. Validate Title
    if (!formData.title || !formData.title.trim()) {
      setError("Post title cannot be empty.");
      return;
    }

    // C. Validate Topic (Passed from component)
    if (!externalContext.selectedTopic) {
      setError("Please select a topic.");
      return;
    }

    // D. Validate Body (Only for Text posts)
    if (type === "TEXT" && (!formData.text || !formData.text.trim())) {
      setError("Post body cannot be empty.");
      return;
    }

    // E. Validate Image (Only for Image posts)
    if (type === "IMAGE" && (!formData.image || formData.image.length === 0)) {
      setError("Please upload at least one image.");
      return;
    }

    // If we pass all checks, call the parent onSubmit
    if (onSubmit) {
      onSubmit(formData);
      // We don't clear form here usually, strictly speaking,
      // because we wait for API success. But if you want to:
      // setFormData({ title: "", text: "", image: [] });
    }
  }

  function empty() {
    setFormData(initialFormState);
  }

  return {
    type,
    formData,
    setFormData,
    error,
    setError, // Expose this in case component needs to set custom errors

    displaySearch,
    setDisplaySearch,
    isDragging,
    isShowDeleteBtn,
    ref,
    postOptions,

    handleChange,
    handleImageChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleMouseEnter,
    handleMouseLeave,
    handleCancelImage,
    handleSubmit,
    processFiles,
    empty,
  };
}
