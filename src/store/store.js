import create from "zustand";

const useStore = create((set) => ({
  polls: [],
  addPoll: (poll) =>
    set((state) => ({
      polls: [...state.polls, poll].sort((a, b) => b.id - a.id),
    })),
  updatePoll: (updatedPoll) =>
    set((state) => ({
      polls: state.polls.map((poll) =>
        poll.id === updatedPoll.id ? { ...poll, ...updatedPoll } : poll
      ),
    })),
}));

export default useStore;
