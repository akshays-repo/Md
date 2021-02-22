import React from 'react'

const ViewCreatedForms = (props) => {

return(
  <div className="responseBox">
  <h5> Response</h5>
  {props.viewDetails.map(res => (
    <div className="responseBg">
      <p className="question">{res.Key_name}</p>
      <p>
        {res.answer.map(answer => (
          <p>{answer}</p>
        ))}
      </p>
    </div>
  ))}
</div>)
}

export default ViewCreatedForms