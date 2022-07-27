
import { fire } from "../../config/fire-config.js"
import fire from "../../config/fire-config.js"
import { useState, useEffect } from "react"
import Link from "next/link"

/*
"If we want to render the content on the server, we better use 
getServerSideProps instead of getInitialProps"

For this we will:
1.Replace our firebase funtion (inside of the useEffect) to an asych await 
promise.
*/

const Blog = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <Link href="/">
        <button>Back</button>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {} //empty object/hash table
  await fire
    .firestore()
    .collection("blog")
    .doc(query.id) //fetch the blog post
    .get()
    .then((result) => {
      content["title"] = result.data().title
      content["content"] = result.data().content
    })

  return {
    props: {
      title: content.title,
      content: content.content,
    },
  }
}

export default Blog
