import React, { useState } from 'react';

const EventCard = ({ event, index, handleUpVote, handleDownVote, upVote, downVote }) => {
  return (
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
  );
}

export default EventCard;
