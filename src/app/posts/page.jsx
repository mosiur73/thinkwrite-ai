"use client"

import React, { useEffect, useState } from "react"

const AllPostsPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editTags, setEditTags] = useState("")

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/posts/[id]")
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Start editing a post
  const startEdit = (post) => {
    setEditingId(post._id)
    setEditTitle(post.title)
    setEditContent(post.content)
    setEditTags(post.tags?.join(", ") || "")
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
    setEditTags("")
  }

  // Handle update
  const handleUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Title and content are required")
      return
    }

    try {
      const res = await fetch(`/api/posts/[id]?id=${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          tags: editTags.split(",").map((tag) => tag.trim()),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert("Update failed: " + data.error)
      } else {
        alert("Post updated successfully!")
        cancelEdit()
        fetchPosts()
      }
    } catch (error) {
      console.error(error)
      alert("Server error during update")
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const res = await fetch(`/api/posts/[id]?id=${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        alert("Delete failed: " + data.error)
      } else {
        alert("Post deleted successfully!")
        fetchPosts()
      }
    } catch (error) {
      console.error(error)
      alert("Server error during delete")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Blog Posts</h1>

      {loading ? (
        <p className="text-gray-600">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) =>
          editingId === post._id ? (
            <div key={post._id} className="bg-white p-4 rounded-xl shadow border mb-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full text-black border mb-2 px-3 py-2 rounded"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full text-black border mb-2 px-3 py-2 rounded h-24"
              />
              <input
                type="text"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="Tags, comma separated"
                className="w-full border text-black mb-4 px-3 py-2 rounded"
              />

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          ) : (
            <div key={post._id} className="bg-white p-4 rounded-xl shadow border mb-4">
              <h2 className="text-xl text-black font-semibold ">{post.title}</h2>
              <p className="text-black mt-2">{post.content.slice(0, 100)}...</p>
              <p className="text-sm text-black mt-1">Tags: {post.tags?.join(", ")}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => startEdit(post)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  )
}

export default AllPostsPage
