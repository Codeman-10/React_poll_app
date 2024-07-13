import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";


function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/polls", {
      question,
      options,
    });
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll Question"
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          required
        />
      ))}
      <button type="button" onClick={addOption}>
        Add Option
      </button>
      <button type="submit">Create Poll</button>
    </form>
  );
}

export default CreatePoll;
