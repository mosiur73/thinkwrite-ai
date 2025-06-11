import clientPromise from "@/lib/dbConnect"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function POST(req) {
  try {
    const { title, content, tags } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("blog")
    const result = await db.collection("posts").insertOne({
      title,
      content,
      tags,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "Post created", postId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("blog")
    const posts = await db.collection("posts").find().sort({ createdAt: -1 }).toArray()

    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// Update post by ID
export async function PUT(req) {
  try {
    const client = await clientPromise
    const db = client.db("blog")

    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Post ID is required" }, { status: 400 })

    const { title, content, tags } = await req.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, tags, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post updated successfully" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Delete post by ID
export async function DELETE(req) {
  try {
    const client = await clientPromise
    const db = client.db("blog")

    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Post ID is required" }, { status: 400 })

    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
