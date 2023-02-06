
import { useState } from "react";

import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import  { selectTest, addTest } from "store/slices/testSilece";

export default function index() {

  const dispatch = useDispatch();
  const testState = useSelector(selectTest);

  const [values, setValues] = useState({
    test: '',
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  function test() {
    dispatch(
      addTest({
        name: values.test,
      })
    );
  }

  return (
    <>
      <div>
        {testState.map((value, index) => {
          return (
            <p key={index}> {value.name} </p>
          )
        })}
        <TextField
          value={values.test}
          onChange={handleChange('test')}
          id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      <Button onClick={test} variant="contained">Contained</Button>
    </>
  );
}
