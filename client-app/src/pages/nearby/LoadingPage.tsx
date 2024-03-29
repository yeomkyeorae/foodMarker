import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function LoadingPage(): React.ReactElement {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // eslint-disable-next-line
    let timer = setInterval(() => {
      setCount(count => count + 1);      
    }, 500);

    return () => {
      clearInterval(timer)
    }
  }, []);

  let dot = '';
  for(let i = 0; i < (count % 4); i++) {
    dot += '.';
  }

  return (
    <div style={{ width: "100%", height: "90vh", lineHeight: "80vh"}}>
      <span>위치 불러오는 중{dot}</span>
    </div>
  );
}

export default withRouter(LoadingPage);
