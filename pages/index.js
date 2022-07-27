import Head from "next/head"
import CreatePost from "../components/CreatePost"
import fire from "../config/fire-config"
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

/*
Sing in and sing out user
*/

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })
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
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out")
        setTimeout(() => {
          setNotification("")
        }, 2000)
      })
  }
  return (
    <div>
      <Head>
        <title>Blog App</title>
      </Head>
      <h1>Blog</h1>
      {notification}
      {!loggedIn ? (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>{" "}
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a itemProp="hello">{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      {loggedIn && <CreatePost />}
    </div>
  )
}
export default Home
