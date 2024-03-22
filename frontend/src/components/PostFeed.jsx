import { useEffect, useState } from "react";

const feed = ({ post }) => {
  const [name, setName] = useState("");
  const [userID, setUserID] = useState(parseInt(localStorage.getItem("Id")));
  const [upVote, setUpVote] = useState(post.upvote.length);
  const [downVote, setDownVote] = useState(post.downvote.length);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `api/user/getSpecificUser/${post.postUserId}`
      );
      const json = await response.json();
      if (response.ok) {
        setName(json.name);
      }
    };

    fetchData();
  }, []);

  const handleUpVote = async (e) => {
    e.preventDefault();
    console.log(post.postUserId);
    const upVoterArray = post.upvote;
    const downVoterArray = post.downvote;
    if (upVoterArray.indexOf(userID) === -1) {
      upVoterArray.splice(upVoterArray.indexOf(userID), 0, userID);
      if (downVoterArray.indexOf(userID) !== -1) {
        downVoterArray.splice(downVoterArray.indexOf(userID), 1);
      }
    } else {
      upVoterArray.splice(upVoterArray.indexOf(userID), 1);
    }

    const response = await fetch(`/api/posts/updatePost/${post._id}`, {
      method: "PATCH",
      body: JSON.stringify({ upvote: upVoterArray }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      console.log("BHI JHAMELA");
    } else {
      setUpVote(post.upvote.length);
      setDownVote(post.downvote.length);
    }
  };

  const handleDownVote = async (e) => {
    e.preventDefault();

    console.log(post.postUserId);
    const upVoterArray = post.upvote;
    const downVoterArray = post.downvote;
    if (downVoterArray.indexOf(userID) === -1) {
      downVoterArray.splice(downVoterArray.indexOf(userID), 0, userID);
      if (upVoterArray.indexOf(userID) !== -1) {
        upVoterArray.splice(upVoterArray.indexOf(userID), 1);
      }
    } else {
      downVoterArray.splice(downVoterArray.indexOf(userID), 1);
    }
    const response = await fetch(`/api/posts/updatePost/${post._id}`, {
      method: "PATCH",
      body: JSON.stringify({ downvote: downVoterArray }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      console.log("BHI JHAMELA");
    } else {
      setUpVote(post.upvote.length);
      setDownVote(post.downvote.length);
    }
  };

  return (
    <div
      className="flex flex-col items-right mt-4 "
      style={{ marginLeft: "700px" }}
    >
      <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <a href="#">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h6>
        </a>
        <div className="flex justify-between mt-4">{post.body}</div>
        {/* Up and down arrows inside the card */}
        <div className="absolute right-4 bottom-4">
          <button
            onClick={handleUpVote}
            className="bg-blue-500 text-white rounded-full p-2 mr-2"
          >
            ↑ {upVote}
          </button>
          <button
            onClick={handleDownVote}
            className="bg-red-500 text-white rounded-full p-2"
          >
            ↓ {downVote}
          </button>
        </div>
      </div>
    </div>
  );
};

export default feed;
