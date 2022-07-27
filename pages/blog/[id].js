import fire from "../../config/fire-config.js"
import { useState, useEffect } from "react"
import Link from "next/link"

const Blog = (props) => {
  const [blog, setBlog] = useState(null)
  console.log(blog)

  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .doc(props.id)
      .get()
      .then((result) => {
        setBlog(result.data())
      })
  }, [])

  console.log(blog)
  if (!blog) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}

Blog.getInitalProps = ({ query }) => {
  console.log(query.id)
  return {
    id: query.id,
  }
}

export default Blog
