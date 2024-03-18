import React from 'react'

import PropTypes from 'prop-types'

import './solid-button.css'

const SolidButton = (props) => {
  return (
    <div className="solid-button-container">
      <button className="solid-button-button ">
        {props.button}
      </button>
    </div>
  )
}



export default SolidButton
