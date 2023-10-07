import { useState,useEffect } from 'react';
import './App.css'

function App() {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search?query=react')
      .then(response => response.json())
      .then(data => setStories(data.hits))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then(response => response.json())
      .then(data => setStories(data.hits))
      .catch(error => console.error(error));
  };
  
  return (
    <div>
      <div className='header'>
        <div>HN Logo</div>
        <div>
          <form onSubmit={handleSubmit}>
          <input 
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Whatcha looking fer?' />
          <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
      {stories.map(story => (
      <div key={story.objectID}>
        <div className='story_url'>
          <div className='story'><a href={story.url}><p>{story.title}</p></a></div>
          <div><p> ({story.url}) </p></div>
        </div>
        <div>
          <p>{story.points} points | by {story.author} | {story.created_at_i} hours ago | {story.num_comments} comments</p>
        </div>
        <hr />
      </div>
      ))}
    </div>
  );
}

export default App;



