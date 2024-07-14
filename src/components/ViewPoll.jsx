import React, { useEffect } from "react";
import io from "socket.io-client";
import axios from "../utils/axiosConfig";
import useStore from "../store/store";

function ViewPoll() {
  const polls = useStore((state) => state.polls);
  const addPoll = useStore((state) => state.addPoll);
  const updatePoll = useStore((state) => state.updatePoll);
  const socket = io("https://polling-web-service.onrender.com");
  const loadPoll = useStore((state) => state.loadPoll);
  const removePoll = useStore((state) => state.removePoll);

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get("/api/polls");
      if (response.data.length > 0) {
        console.log(response.data)
        loadPoll(response.data);
      }
    };
    fetchPolls();
    socket.on("pollUpdated", (updatedPoll) => {
      updatePoll(updatedPoll);
    });
    socket.on("pollCreated", (newPoll) => {
      addPoll(newPoll);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = (pollId, optionIndex) => {
    socket.emit("vote", pollId, optionIndex);
  };

  const deletePoll = async (pollId) => {
    const res = await axios.delete("/api/polls", {
      pollId,
    });

    if (res.data.msg === "success") {
      removePoll(pollId);
    }
  };
  if (!polls || polls.length === 0) {
    return (
      <div className="result_section">
        {" "}
        <p>No polls available.</p>
      </div>
    );
  }

  return (
    <div className="result_section">
      {polls.map((poll) => (
        <div key={poll.question}>
          <h3>
            <span>{poll.question}</span>{" "}
            <button onClick={() => deletePoll(poll.id)}>remove</button>
          </h3>
          <ul>
            {poll.options?.map((option, index) => (
              <li key={option}>
                <span>
                  {" "}
                  {option} -{" "}
                  <span className="votes_lbl">{poll.votes[index]} votes</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleVote(poll.id, index)}
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewPoll;
