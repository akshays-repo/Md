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
          <div className="header">
          <h3>{props.viewDetails?.form_name}</h3>
          </div>
          <div className="body pb5">
          <p><span>Full Name</span>: <span className="pl2">{props.viewDetails?.name}</span></p>
          <p><span>Email</span>:  <span  className="pl2">{props.viewDetails?.email}</span></p>
          <p><span>Phone Number</span>:  <span className="pl2">{props.viewDetails?.phone}</span></p>
          </div>
        </div>
        <div className="responseContent">
        {props.viewDetails?.response.map(res => (
         
          <div className="responseBg">
            <div className="fitstColumn">
            <p className="question">{res.Key_name}</p>
            </div>
          <div className="secondColumn">
            <p>
              {res.custom_types == 'esign'
                ? res.answer?.map(answer => <img src={answer} />)
                : res.answer?.map(answer => <p>{answer}</p>)}
              {}
            </p>
            </div>
          </div>
         
        ))}
         </div>
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
