'use client'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = (props) => {
  return (
    <TextareaAutosize name={props.name} placeholder={props.placeholder} maxLength={props.maxLength} rows={props.rows} className={props.className} defaultValue={props.value} />

  )
}

export default TextArea;