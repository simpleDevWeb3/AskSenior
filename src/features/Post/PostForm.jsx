import { useState } from "react";
import styled from "styled-components";

function PostForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    setError("");
    if (onSubmit) onSubmit(formData);

    // Clear form after submission
    setFormData({
      title: "",
      content: "",
      category: "",
      image: null,
    });
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Create a Post</Title>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="What's on your mind?"
          value={formData.title}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write something..."
          rows="5"
          value={formData.content}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="coffee">☕ Coffee</option>
          <option value="discussion">💬 Discussion</option>
          <option value="tech">💻 Tech</option>
          <option value="lifestyle">🌿 Lifestyle</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="image">Image (optional)</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {formData.image && (
          <ImagePreview
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
          />
        )}
      </FormGroup>

      <SubmitButton type="submit">Post</SubmitButton>
    </FormContainer>
  );
}

export default PostForm;

/* ---------- Styled Components ---------- */

const FormContainer = styled.form`
  max-width: 600px;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`

  color: var(--text-color, #333);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    border-color: var(--primary-color, #6f4e37);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    border-color: var(--primary-color, #6f4e37);
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    border-color: var(--primary-color, #6f4e37);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color, #6f4e37);
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: var(--secondary-color, #c8a165);
  }
`;

const ImagePreview = styled.img`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;
