import { useState } from "react";
import { supabase } from "../db/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ProjectCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) return;
    const { data, error } = await supabase
      .from("projects")
      .insert([{ name, description }])
      .select()
      .single();

    if (!error && data) {
      navigate(`/project/${data.id}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        className="w-full border px-3 py-2 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description"
        className="w-full border px-3 py-2 rounded-lg h-24 resize-none mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <button
        onClick={handleCreate}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Create Project
      </button>
    </div>
  );
}
