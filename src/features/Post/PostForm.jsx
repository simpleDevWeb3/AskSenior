import styled from "styled-components";
import Search from "../../components/Search";
import { Dropdown } from "../../components/Dropdown";

import { HiChevronDown, HiPencil } from "react-icons/hi";
import Filter from "../../components/Filter";

import { BsUpload } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa";
import ButtonIcon from "../../components/ButtonIcon";
import { usePostForm } from "./usePostForm";
import { useModal } from "../../context/ModalContext";
import { Selector } from "../../components/Selector";
import Modal from "../../components/Modal";
import SelectTopic from "../../components/SelectTopic";
import { useRef, useState } from "react";
import { useUser } from "../Auth/useUser";
import { useCreatePost } from "./useCreatePost";
import Spinner from "../../components/Spinner";
import Carousel from "../../components/Carousel";
import { useFetchJoinedCommunity } from "../Communities/useFetchJoinedCommunity";
import Avatar from "../../components/Avatar";

function PostForm() {
  const { openModal, closeModal } = useModal();
  const { user } = useUser();

  const { communities } = useFetchJoinedCommunity(user?.id);

  // 1. Local State (UI Only)
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  const fileInputRef = useRef(null);

  // 2. Initialize Hook
  // The callback here ONLY runs if the hook's validation passes
  const {
    type,
    formData,
    error,
    displaySearch,
    setDisplaySearch,
    isDragging,
    isShowDeleteBtn,
    ref,
    postOptions,
    handleChange,
    handleImageChange, // Hook now handles validation internally
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleMouseEnter,
    handleMouseLeave,
    handleCancelImage,
    handleSubmit,
    empty,
  } = usePostForm(onFormSuccess);
  const { createPost, isLoadCreatePost, errorCreatePost } =
    useCreatePost(empty);
  // 3. Success Callback (Executed by the hook after validation)
  function onFormSuccess(validatedFormData) {
    const finalData = {
      ...validatedFormData,
      topic_id: selectedTopic.id,
      user_id: user.id,
      community_id: selectedCommunity?.id,
    };

    console.log("Submitting:", finalData);
    createPost(finalData);

    // Reset UI selection state
    setSelectedTopic(null);
    setSelectedCommunity(null);
  }

  // 4. Component Handlers
  const joinedList = communities?.communities || [];
  const filteredCommunities = joinedList.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  function onAdd(topic) {
    setSelectedTopic(topic);
    closeModal();
  }

  function onCancel() {
    closeModal();
  }

  function handleSelectCommunity(community) {
    setSelectedCommunity(community);
    setSelectedTopic(null); // Reset topic when community changes
    setDisplaySearch(false);
    setFilterQuery("");
  }
  console.log("from form: ", formData);
  return (
    <Layout>
      {isLoadCreatePost && <Spinner />}
      {errorCreatePost && <div>{errorCreatePost}</div>}

      <Selector>
        <Modal id={"Select Topic"}>
          <SelectTopic
            selectedTopic={selectedTopic}
            onAdd={onAdd}
            onCancel={onCancel}
            availableTopics={selectedCommunity?.topics || []}
          />
        </Modal>
      </Selector>

      {/* 5. Pass external context (Community/Topic) to handleSubmit */}
      <FormContainer
        onSubmit={(e) => handleSubmit(e, { selectedCommunity, selectedTopic })}
      >
        <Title>Create a Post</Title>

        {/* Display Error from Hook */}
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <FormGroup>
          {displaySearch ? (
            <Dropdown position="left">
              <SearchBarContainer ref={ref}>
                <Search
                  placeholder={"Search Community"}
                  initialData={filteredCommunities}
                  onInput={(val) => setFilterQuery(val)}
                  onSelect={handleSelectCommunity}
                />
              </SearchBarContainer>
            </Dropdown>
          ) : (
            <SelectCommunity onClick={() => setDisplaySearch((show) => !show)}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {selectedCommunity ? (
                  <>
                    <div
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <Avatar src={selectedCommunity.avatarUrl} />
                    </div>
                    <span style={{ fontWeight: "bold" }}>
                      {selectedCommunity.name}
                    </span>
                  </>
                ) : (
                  "Select Community"
                )}
              </div>
              <HiChevronDown />
            </SelectCommunity>
          )}
        </FormGroup>

        <Filter
          filterField="type"
          options={postOptions}
          startingOption="TEXT"
        />

        <FormGroup>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <ActionContainer
          style={{ justifyContent: "start", alignItems: "center" }}
        >
          {selectedTopic && (
            <SelectedTopicLabel>{selectedTopic?.label}</SelectedTopicLabel>
          )}
          <ButtonIcon
            size={selectedTopic && "rounded"}
            type="button"
            action={() => openModal("Select Topic")}
          >
            {selectedTopic ? <HiPencil /> : " Select Topic"}
          </ButtonIcon>
        </ActionContainer>

        {type === "IMAGE" && (
          <>
            <FormGroup>
              <FileInput
                ref={fileInputRef}
                type="file"
                multiple
                id="image"
                accept="image/*"
                // 6. Direct Hook Handler (Validation is inside hook now)
                onChange={handleImageChange}
              />
              {!formData.image || formData.image.length === 0 ? (
                <FileLabel
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  htmlFor="image"
                >
                  {isDragging ? "Drop Image Here" : "Drag and Drop Image"}
                  <BsUpload />
                </FileLabel>
              ) : (
                <ImageContainer
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Carousel
                    scrollLastAuto={true}
                    total={formData.image.length}
                    hideWhenCurrentSlide={true}
                  >
                    <Carousel.Count />
                    <Carousel.Track>
                      {formData.image.map((img, i) => (
                        <Carousel.Card key={i}>
                          <ImagePreview
                            src={URL?.createObjectURL(img)}
                            alt="Preview"
                          />
                        </Carousel.Card>
                      ))}
                    </Carousel.Track>
                    <Carousel.PrevBtn
                      style={{
                        backgroundColor: "var(--tertiary-color)",
                        borderRadius: "50%",
                      }}
                    />
                    <Carousel.NextBtn
                      style={{
                        backgroundColor: "var(--tertiary-color)",
                        borderRadius: "50%",
                      }}
                    />
                  </Carousel>

                  {isShowDeleteBtn && (
                    <>
                      <ButtonDelete onClick={(e) => handleCancelImage(e)}>
                        <FaTrash />
                      </ButtonDelete>
                      <ButtonAdd
                        onClick={(e) => {
                          e.preventDefault();
                          fileInputRef.current.click();
                        }}
                      >
                        <FaPlus />
                      </ButtonAdd>
                    </>
                  )}
                </ImageContainer>
              )}
            </FormGroup>
          </>
        )}

        <FormGroup>
          <Textarea
            id="text"
            name="text"
            placeholder="Body Text"
            rows="5"
            value={formData.text}
            onChange={handleChange}
          />
        </FormGroup>

        <ActionContainer>
          <ButtonIcon>Post</ButtonIcon>
        </ActionContainer>
      </FormContainer>
    </Layout>
  );
}

export default PostForm;

/* ---------- Styled Components ---------- */
// ... (Your existing styled components remain here)
const SelectedTopicLabel = styled.div`
  border-radius: 25px;
  background-color: rgb(19, 87, 184);
  padding: 0.5rem 1rem;
  color: white;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
`;
const SearchBarContainer = styled.div`
  width: 50%;
  @media (max-width: 1000px) {
    width: 70%;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const FileLabel = styled.label`
  display: flex;
  background-color: inherit;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  border: 1px dashed #ccc;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 10rem;
  &:hover {
    background-color: var(--hover-color, #d6d6d6);
  }
`;
const SelectCommunity = styled.div`
  border-radius: 25px;
  border: 1px solid var(--hover-color);
  width: 16rem;
  padding: 0.7rem 1rem;
  background-color: var(--hover-color);
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  justify-content: space-between;
  cursor: pointer;
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 60%;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  max-width: 50rem;
  min-height: 90vh;
  color: var(--text-color);
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const Title = styled.h2`
  color: var(--text-color, #333);
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Input = styled.input`
  background-color: inherit;
  color: var(--text-color);
  padding: 0.6rem 0.8rem;
  border-radius: 18px;
  border: 1px solid var(--tertiary-color);
  font-size: 1rem 1rem;
  height: 3rem;
  &:focus {
    border-color: var(--tertiary-color);
    outline: none;
  }
`;
const Textarea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border-radius: 18px;
  background-color: inherit;
  color: var(--text-color);
  border: 1px solid var(--tertiary-color);
  font-size: 1rem;
  resize: vertical;
  &:focus {
    border-color: var(--tertiary-color);
    outline: none;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  overflow-y: hidden;
  border: solid 1px var(--hover-color);
`;
const ImagePreview = styled.img`
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 8px;
  object-fit: contain;
  height: 15rem;
`;
const ButtonDelete = styled.button`
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  background-color: var(--hover-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;
const ButtonAdd = styled.button`
  position: absolute;
  top: 4rem;
  right: 0.5rem;
  background-color: var(--hover-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;
const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;
