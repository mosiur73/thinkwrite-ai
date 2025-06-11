"use client"
import React, { useState } from 'react'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const newPost = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    }

    try {
      const res = await fetch('/api/posts/[id]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })

      const data = await res.json()

      if (res.ok) {
        alert('✅ Post created successfully!')
        setTitle('')
        setContent('')
        setTags('')
      } else {
        alert(`❌ Error: ${data.error}`)
      }
    } catch (err) {
      console.error(err)
      alert('Server Error!')
    }

    setLoading(false)
  }

  const generateContent = async () => {
    if (!title) return alert("Please enter a topic (title) first.")
    setGenerating(true)

    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title }),
      })

      const data = await res.json()
      setContent(data.blog || "Could not generate content.")
    } catch (err) {
      console.error(err)
      alert('AI generation failed!')
    }

    setGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a New Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title (Topic)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border text-black px-4 py-2 rounded-md"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={generateContent}
              disabled={generating}
              className="text-sm text-blue-600 hover:underline"
            >
              {generating ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-black border px-4 py-2 rounded-md h-40"
              placeholder="Write your blog content..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full text-black border px-4 py-2 rounded-md"
              placeholder="e.g., react, nextjs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
