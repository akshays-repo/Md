import React , {useEffect} from 'react'

const ViewResponse = (props) => {
useEffect(() =>{
  console.log("dfdf", props.viewDetails)
})
return(
  <div className="responseBox">
  <h5> Response</h5>
  {props.viewDetails?.map(res => (
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

export default ViewResponse