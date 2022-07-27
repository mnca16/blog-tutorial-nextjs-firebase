import Head from "next/head"
import CreatePost from "../components/CreatePost"
import { fire } from "../config/fire-config"
import { useState, useEffect } from "react"
import Link from "next/link"

/*
READING FROM THE CLOUD FIRESTORE AND DISPLAYING THE DATA ON THE UI
-We imported fire from the config file which contains firestore properties value?
-We set up a useState with an empty array (setBlogs) to store the data coming form firebase
-With the fire constant with use the methods: 
  1. firestore() 
  2. collection("name of the collection")
  3. onSnapshot() which would map throuth the docs property? review this part 
-Then we render the data on the UI mapping throug the blogs state (we're just rendering the title)

*/

const Home = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setBlogs(blogs)
      })
  }, [])

  console.log(blogs)

  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <CreatePost />
    </div>
  )
}
export default Home
