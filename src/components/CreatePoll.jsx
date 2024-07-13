import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setIsloading] = useState(false);
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    const res = await axios.post("/api/polls", {
      question,
      options,
    });
    setIsloading(false);
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <>
      <h2>Let's create a poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="poll_question">Question here! </label>

          <input
            name="poll_question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Poll Question"
            maxLength={50}
            required
          />
        </div>
        {options.map((option, index) => (
          <div>
            <label htmlFor={`Option ${index + 1}`}>{`Option ${
              index + 1
            }`}</label>
            <input
              name={`Option ${index + 1}`}
              key={index}
              value={option}
              maxLength={50}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          </div>
        ))}
        <div>
          <button type="button" disabled={loading} onClick={addOption}>
            Add Option
          </button>
          <button type="submit">Create Poll</button>
        </div>
      </form>
    </>
  );
}

export default CreatePoll;
