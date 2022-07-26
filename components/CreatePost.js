import React, { useState } from "react"
import { fire, fire2 } from "../config/fire-config.js"
import "firebase/firestore"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notification, setNotification] = useState("")

  //   const handleSumbit = (e) => {
  //     e.preventDefault()

  //     fire.firestore().collection("blog").add({
  //       title: title,
  //       content: content,
  //     })

  //     setTitle("")
  //     setContent("")

  //     setNotification("Blogpost created")

  //     setTimeout(() => {
  //       setNotification("")
  //     }, 2000)
  //   }

  console.log(fire2)

  const handleSubmit = (event) => {
    event.preventDefault()

    fire.firestore().collection("blog").add({
      title: title,
      content: content,
    })

    console.log({
      title: title,
      content: content,
    })

    setTitle("")
    setContent("")
    setNotification("Blogpost created")
    setTimeout(() => {
      setNotification("")
    }, 2000)
  }

  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        {notification}
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} // object destructuring
          />
        </div>
        <div>
          Content <br />
          <textarea
            value={content}
            // onChange={({ target }) => setContent(target.value)}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreatePost
