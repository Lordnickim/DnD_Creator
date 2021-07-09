import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function outroContainer({script}) {

  return(
    <div>{script}</div>
  )
}