import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const App = () => {
  const [ isLoading, setIsLoading ] = useState(true);

  return (
    isLoading ? <div>Loading Adventure...</div>
    : (
      <div>Temp</div>
    )
  );
}

export default App;