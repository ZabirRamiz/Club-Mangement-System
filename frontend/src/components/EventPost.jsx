import React, { useState } from 'react';

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
    <div className="flex flex-col items-right "
      style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container mx-auto mt-8">
        <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold ml-7">Event Title</h2>
            <h2 className="text-xl font-semibold ml-5">Event Post</h2>
            <h2 className="text-xl font-semibold mr-7">Pending Work</h2>
          </div>
          {events.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-md my-4 shadow-lg">
              <div className="flex justify-between items-center ml-7">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex flex-col items-center">
                  <ul>
                    {event.posts.map((post, i) => (
                      <li key={i} className="flex items-center">
                        {post}
                        <button onClick={() => handleUpVote(index)} className="bg-blue-500 text-white rounded-full p-2 ml-2">
                          ↑ {upVote[index]}
                        </button>
                        <button onClick={() => handleDownVote(index)} className="bg-red-500 text-white rounded-full p-2 ml-2">
                          ↓ {downVote[index]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-end mr-7">
                  <ul>
                    {event.pendingWork.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventPost;













