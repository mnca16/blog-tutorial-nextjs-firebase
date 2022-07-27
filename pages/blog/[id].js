import { fire } from "../../config/fire-config.js"
import { useState, useEffect } from "react"
import Link from "next/link"

/*
CREATE BLOG ROUTES, READ BLOG ENTRY
1.How to create a dynamic url form the index page for each blog entry 
  we did this in the index.js files 
2.Single blog entries --> read up on the different renders in Next.js documentation.
  We're using getInitialProps
NOTE: the props are not being read (code no working) I think is because this is 
a client side request, also I don't know where are the props coming from 

*/

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
