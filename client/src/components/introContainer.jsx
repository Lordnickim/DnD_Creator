import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function introContainer({script,formValues,form,stat,rollFunc,setStat,setRole,setStageDone}) {

  let initialState = null;
  if(formValues.length === 0) {
    initialState = '';
  } else {
    initialState = formValues[0];
  }

  const [ name, setName ] =useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(stat==='Constitution'){
      setStat(rollFunc());
      setStageDone(true);
    } else {
      setRole(name);
      setStat(rollFunc());
      setStageDone(true);
    }
    //ax
  }

  //axios request?

  if(form === 'Name') {
  return(
  <form onSubmit={handleSubmit}>
    <div>{script}</div>
    <label>Choose your {form}!</label>
    <input type="text" value = {name} onChange={e => setName(e.target.value)} />
    <input type='submit' value={`Role for ${stat}`} />
  </form>
  )
  } else if(formValues) {
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
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>{script}</div>
        <input type='submit' value={`Role for ${stat}`} />
      </form>)
  }
}