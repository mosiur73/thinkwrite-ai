// "use client"
// import { useEffect, useState } from "react"
import Link from "next/link"
import UserInfo from "@/components/UserInfo"
import { getServerSession } from "next-auth"
import { authOption } from "./api/auth/[...nextauth]/route"
export default async function Home() {

  const session=await getServerSession(authOption)
  //  const [latestPosts, setLatestPosts] = useState([])

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch("/api/posts/[id]")
  //     const data = await res.json()
  //     setLatestPosts(data.slice(0, 3)) 
  //   }

  //   fetchPosts()
  // }, [])

  return (
   <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to AI Blog!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Create, read, and manage blog posts with ease.
        </p>
        {/* <UserInfo></UserInfo>
        {JSON.stringify(session)} */}
        <div className="flex justify-center gap-4">
          <Link href="/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Create Post
            </button>
          </Link>
          <Link href="/posts">
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg">
              View All Posts
            </button>
          </Link>
        </div>
      </section>

      {/* <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Latest Posts
        </h2>
        {latestPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <div key={post._id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {post.content.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </section> */}
    </div>
  );
}
