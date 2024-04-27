import React from 'react'

const Button = ({name,classname , ...props}) => {
  return (
    <button className={`px-4 py-2 rounded-md ${classname}`} {...props}>
        {name}
    </button>
  )
}

export default Button