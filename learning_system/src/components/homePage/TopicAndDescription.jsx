import React from 'react'

export default function TopicAndDescription(props) {
  return (
    <div class=" ml-40 mt-20">
        <h1 class="bg-yellow-200 w-5/6 h-8 rounded-xl px-5 text-center mb-4 font-bold">{props.topic}</h1>
        <p class="bg-yellow-200 w-5/6 rounded-xl p-5 text-center">{props.children}</p>
    </div>
  )
}
