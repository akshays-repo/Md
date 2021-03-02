import React, { useEffect } from 'react';
import Pdf from 'react-to-pdf';
const ref = React.createRef();
const ViewResponse = props => {
  useEffect(() =>{
console.log("pp",props)
  }, [])
  return (
    <div>
      <div ref={ref} className="responseBox">
        <div>
          <h3>{props.viewDetails?.form_name}</h3>
          <p>Full Name: {props.viewDetails?.name}</p>
          <p>Email: {props.viewDetails?.email}</p>
          <p>Phone Number: {props.viewDetails?.phone}</p>
        </div>
       
        {props.viewDetails?.response.map(res => (
          <div className="responseBg">
            <p className="question">{res.Key_name}</p>
            <p>
              {res.custom_types == 'esign'
                ? res.answer?.map(answer => <img src={answer} />)
                : res.answer?.map(answer => <p>{answer}</p>)}
              {}
            </p>
          </div>
        ))}
      </div>

      <div style={{ paddingTop: '20px' }}>
        <Pdf targetRef={ref} filename="response.pdf" x={50} >
          {({ toPdf }) => (
            <button className="view-button button-square" onClick={toPdf}>
              <span>
                <i class="far fa-download pr2"></i>
              </span>
              Generate Pdf
            </button>
          )}
        </Pdf>
      </div>
    </div>
  );
};

export default ViewResponse;
