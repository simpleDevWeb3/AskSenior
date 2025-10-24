import { useState } from "react";

export function useVote() {
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  function handleUpVote(e) {
    e.stopPropagation();
    setUpVote((upVote) => !upVote);
    setDownVote(false);
  }

  function handleDownVote(e) {
    e.stopPropagation();
    setDownVote((upVote) => !upVote);
    setUpVote(false);
  }

  return { upVote, downVote, handleUpVote, handleDownVote };
}
