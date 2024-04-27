

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Function to handle edit button click
  const handleEditClick = () => {
    // Add your logic here to handle edit functionality
    // For example, you can toggle the edit mode or open a modal for editing
    setIsEditing(true);
    navigate(`/EventEdit/${event._id}`)
  };

  return (
    <div key={event.title} className="bg-white p-4 rounded-md my-4 shadow-lg">
      <div className="flex justify-between items-center ml-7">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {/* Edit Button */}
        
        {/* End of Edit Button */}
        <div className="flex flex-col items-center">
          <ul>
            {event.posts.length === 0 ? ( // Check if event.posts is empty
              <p>No posts available</p> // Render a message if no posts are available
            ) : (
              <ul>
                {event.posts.map((post) => ( // Map over the posts if there are any
                  <li key={post._id} className="flex items-center justify-between">
                    {post.body}
                    <div>
                      <button className="bg-blue-500 text-white rounded-full p-2 ml-2">
                        ↑ {post.upvote.length}
                      </button>
                      <button className="bg-red-500 text-white rounded-full p-2 ml-2">
                        ↓ {post.downvote.length}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
        <div className="flex flex-col items-end mr-7">
          <ul>
            {event.works.length === 0 ? (
              <p>No Works Available</p>
            ) : (
              <ul>
                {event.works.map((work) => (
                  <li key={work._id}>
                    <b>{work.body}</b>: {work.work_status}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
        <button
          className="bg-blue-500 text-white rounded-full p-2 ml-2"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EventCard;

