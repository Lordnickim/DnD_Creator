import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function introContainer({script,formValues,form,stat,rollFunc,setStat,setRole,setStageDone}) {
  const [ name, setName ] =useState(formValues[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRole(name);
    setStat(rollFunc());
    setStageDone(true);
    //ax
  }

  //axios request?


  return (
  <form onSubmit={handleSubmit}>
    <div>{script}</div>
    <label>Choose your {form}!</label>
    <select value={name} onChange={e => setName(e.target.value)}>
    {formValues.map(entry => {
      return <option value={entry}>{entry}</option>
    })}
    </select>
    <input type='submit' value={`Role for ${stat}`} />
  </form>)
}