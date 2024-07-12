import { useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { useSession } from "next-auth/react";
import Select from "./Select";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description: string;
  language: string;
  code: string;
  visibility: string;
  tags: string[];
  references: string[];
}

export default function Modal() {
  const session = useSession();
  const { newSnippetModal, setNewSnippetModal } = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    language: "",
    code: "",
    visibility: "private",
    tags: [],
    references: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [referenceInput, setReferenceInput] = useState("");

  const handleVisibilityToggle = () => {
    setFormData((prev) => ({
      ...prev,
      visibility: prev.visibility === "private" ? "public" : "private",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = (e: any) => {
    e.preventDefault();
    if (tagInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(e);
    }
  };

  const handleTagDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceInput(e.target.value);
  };

  const addReference = (e: any) => {
    e.preventDefault();
    if (referenceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        references: [...prev.references, referenceInput.trim()],
      }));
      setReferenceInput("");
    }
  };

  const handleReference = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addReference(e);
    }
  };

  const handleReferenceDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.language || !formData.code) {
      toast.error("Title, language, and code are required");
      return;
    }
    const userId = session.data?.user?.id;
    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          title: formData.title,
          description: formData.description,
          language: formData.language,
          visibility: formData.visibility,
          tags: formData.tags,
          references: formData.references,
          code: formData.code,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          language: "",
          code: "",
          visibility: "private",
          tags: [],
          references: [],
        });
        setNewSnippetModal(false);
        toast.success(data.message || "Snippet created successfully");
      } else {
        console.error(data.message || "Failed to create snippet");
        toast.error(data.message || "Failed to create snippet");
      }
    } catch (error) {
      console.error("Failed to create snippet:", error);
      toast.error("Failed to create snippet");
    }
  };

  return (
    <div
      className="flex flex-col z-20 bg-secondary rounded-lg drop-shadow-xl w-3/6 min-h-[500px] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-lg mb-8">Create a new code snippet</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-xs" htmlFor="language">
              Language
            </label>
            <Select
              value={formData.language}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, language: value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-xs" htmlFor="visibility">
              Visibility
            </label>
            <p
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 transition duration-300 ease-in-out border border-primary hover:border-white/10 hover:transition hover:duration-300 hover:ease-in-out capitalize"
              onClick={handleVisibilityToggle}
            >
              {formData.visibility === "Private" ? (
                <GoEyeClosed size={16} />
              ) : (
                <GoEye size={16} />
              )}
              <span className="text-sm mt-0.5">{formData.visibility}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs" htmlFor="tags">
            Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="tags"
              className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md w-full p-2.5"
              value={tagInput}
              onChange={handleTagsChange}
              onKeyDown={handleTags}
            />
          </div>
          <div className="flex gap-1">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-accent1 text-xs font-semibold text-black rounded-full hover:bg-accent1/10 hover:text-accent1 border border-accent1 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out px-3 py-1"
                onClick={() => handleTagDelete(index)}
              >
                {tag}
                <IoCloseOutline size={15} />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs" htmlFor="references">
            References
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="references"
              className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md w-full p-2.5"
              value={referenceInput}
              onChange={handleReferenceChange}
              onKeyDown={handleReference}
            />
          </div>
          <div className="flex gap-1">
            {formData.references.map((reference, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-accent1 text-xs font-semibold text-black rounded-full hover:bg-accent1/10 hover:text-accent1 border border-accent1/50 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out px-3 py-1"
                onClick={() => handleReferenceDelete(index)}
              >
                {reference}
                <IoCloseOutline size={15} />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-xs" htmlFor="code">
            Code
          </label>
          <textarea
            id="code"
            className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md h-[200px] overflow-y-scroll p-2.5"
            value={formData.code}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-accent1 text-black hover:bg-accent1/10 hover:text-accent1 border border-accent1 text-md font-extrabold hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md right-0 px-4 py-2">
            Create Snippet
          </button>
        </div>
      </form>
    </div>
  );
}
