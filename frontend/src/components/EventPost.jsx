import  { React, useEffect, useState } from 'react';
import EventCard from './EventCard';
import CreateEventForm from './CreateEventForm';

// EventPost component to display event posts

const EventPost = () => {
  const [works, setWorks] = useState("")
  const [posts, setPosts] = useState('')
  const [events, setEvents] = useState("")
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  // Sample event data
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const fetchEvents = await fetch("/api/events/getEvents");
        const allEvents = await fetchEvents.json();
  
        // Fetch all works
        const fetchWorks = await fetch("/api/works/getWorks");
        const allWorks = await fetchWorks.json();
  
        // Fetch all posts
        const fetchPosts = await fetch("/api/posts/allPosts");
        const allPosts = await fetchPosts.json();
  
        // Match event_id of works and posts with _id of events and add it to the matching JSON object of events
        const updatedEvents = allEvents.map(event => {
          const eventWorks = allWorks.filter(work => work.event === event.title);
          const eventPosts = allPosts.filter(post => post.event === event.title);
          return { ...event, works: eventWorks, posts: eventPosts };
        });
  
        // Update state with the updated events data
        setEvents(updatedEvents);
        console.log(events)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Fetch data when component mounts
    fetchData();
    
  }, []);
  
  
  



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
<>

  <div className="flex flex-col items-right " style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '115vh' }}>
  <div className="w-2/6 mt-6 ml-4">
    <CreateEventForm/>
    </div>
    <div className="container mx-auto mt-0 w-2/4 overflow-y-auto mr-16 " style={{ marginTop: '-950px' }}>

      <div className="bg-gray-100 text-gray-800 py-3 px-4 rounded-md shadow-md">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold ml-7">Event Title</h2>
          <h2 className="text-xl font-semibold ml-5">Event Post</h2>
          <h2 className="text-xl font-semibold mr-7">Pending Work</h2>
          
        </div>
        
     

        {events && events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}
       
      </div>
    </div>
    {/* <div className="w-2/6 mt-0">
    <CreateEventForm/>
    </div> */}
    
   </div>
   
   
   </>

  )
}

export default EventPost;













