import React from 'react'

const Action = ({handleclick , type , classname}) => {
  return (
    <div className={classname} onClick={()=>handleclick()}>
      {type}
    </div>
  )
}

export default Action
