import React, { useState } from 'react';
import Container from './Container';
import EventCard from './EventCard';

// EventPost component to display event posts
function EventPost() {
  // Sample event data
  const events = [
    {
      title: "Event 1",
      posts: ["Post 1"],
      pendingWork: ["Task 1", "Task 2"]
    },
    {
      title: "Event 2",
      posts: ["Post 2"],
      pendingWork: ["Task 1"]
    },
    {
      title: "Event 3",
      posts: ["Post 3"],
      pendingWork: ["Task 1", "Task 2"]
    }
  ];

  const [upVote, setUpVote] = useState([0, 0, 0]);
  const [downVote, setDownVote] = useState([0, 0, 0]);

  const handleUpVote = (index) => {
    const newUpVotes = [...upVote];
    newUpVotes[index] += 1;
    setUpVote(newUpVotes);
  };

  const handleDownVote = (index) => {
    const newDownVotes = [...downVote];
    newDownVotes[index] += 1;
    setDownVote(newDownVotes);
  };

  return (
    <Container>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold ml-7">Event Title</h2>
        <h2 className="text-xl font-semibold ml-5">Event Post</h2>
        <h2 className="text-xl font-semibold mr-7">Pending Work</h2>
      </div>
      {events.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          index={index}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </Container>
  );
}

export default EventPost;













