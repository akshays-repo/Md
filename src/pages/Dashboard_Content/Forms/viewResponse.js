import React, { useEffect } from 'react';
import Pdf from 'react-to-pdf';
const ref = React.createRef();
const ViewResponse = props => {
  return (
    <div>
      <div ref={ref} className="responseBox">
        <h5> Response</h5>
        {props.viewDetails?.map(res => (
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
        <Pdf targetRef={ref} filename="response.pdf">
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
