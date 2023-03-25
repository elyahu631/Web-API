import React, { useState } from "react";

export default function PDeleteById(props) {
  const [id, setId] = useState(1);

  const btnDeleteTrempById = () => {

    fetch(props.apiUrl + id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch btnDeleteTrempById= ", result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  return (
    <div >
      <hr />
      <div >
        <input onChange={(e)=>{setId(e.target.value)}} defaultValue="1" type="number" />
        <button onClick={btnDeleteTrempById}>Delete Tremp by id</button>
      </div>
    </div>
  );
}
