import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3  max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Yaaas, you&apos;re finally here! <span>&#128131;&#127998;</span></h1>
        <p className="text-gray-500 text-xs  sm:text-sm">Welcome to my blog!&#128525; Here, you&apos;ll find my tech adventures, insights, articles, projects, and tutorials on web development and other exciting things I learn. From coding to community, I&apos;m passionate about exploring new ideas, empowering others, and making a positive impact  &#129325;. Let&apos;s learn, grow, and have fun along the way!&#129392; </p>
        <Link to="/search" className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View All Posts</Link>
      </div>
      <div className="p-3 bg-green-100 dark:bg-slate-700">
        <CallToAction/>
      </div>
      
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {posts.map((post) => ( 
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                View All Posts
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
