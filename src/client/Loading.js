import React from 'react';

const Loading = props => {
  if (props.error) {
    return <div>Error!</div>;
  }

  if (props.timedOut) {
    return <div>Taking a long time...</div>;
  }

  if (props.pastDelay) {
    return <div>Loading...</div>;
  }

  return null;
};

export default Loading;
