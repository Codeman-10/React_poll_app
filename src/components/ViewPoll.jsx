import React, { useEffect } from "react";
import io from "socket.io-client";
import axios from "../utils/axiosConfig";
import useStore from "../store/store";


function ViewPoll() {
  const polls = useStore((state) => state.polls);
  const addPoll = useStore((state) => state.addPoll);
  const updatePoll = useStore((state) => state.updatePoll);
  const socket = io("https://polling-web-service.onrender.com");

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get("/api/polls");
      console.log(...response.data);
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          addPoll(response.data[i]); // Ensure addPoll handles an array
        }
      }
    };
    fetchPolls();
  }, []);

  useEffect(() => {
    socket.on("pollUpdated", (updatedPoll) => {
      updatePoll(updatedPoll); // Ensure updatePoll updates the state correctly
    });
    socket.on("pollCreated", (bnew) => {
      addPoll(bnew); // Ensure addPoll handles a single poll object
    });
  }, []);

  const handleVote = (pollId, optionIndex) => {
    socket.emit("vote", pollId, optionIndex);
  };

  // Add guard clause for when polls is undefined or empty
  if (!polls || polls.length === 0) {
    return <p>No polls available.</p>;
  }

  return (
    <div>
      {polls.map((poll) => (
        <div key={poll.question}>
          <h3>{poll.question}</h3>
          <ul>
            {poll.options?.map((option, index) => (
              <li key={option}>
                {option} - {poll.votes[index]} votes
                <button onClick={() => handleVote(poll.id, index)}>Vote</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewPoll;
