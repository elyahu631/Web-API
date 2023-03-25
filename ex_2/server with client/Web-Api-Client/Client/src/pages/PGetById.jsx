import React, { useState } from "react";

export default function PGetById(props) {
  const [id, setId] = useState(1);
  const [tremp, setTremp] = useState(null);

  const btnGetTrempById = () => {

    fetch(props.apiUrl + id, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        if(!res.ok){
          setTremp(null)
          return;
        }
        console.log('res.ok', res.ok);
        return res.json()
      })
      .then(
        (result) => {
          setTremp(result)
        },
        (error) => {
          console.log("err post=", error);
          setTremp(null);
        });
  }

  return (
    <div >
      <hr />
      <div >
        <div>
          <input  onChange={(e) => { setId(e.target.value) }} defaultValue="1" type="number" />
          <button onClick={btnGetTrempById}>Get Tremp by id</button>
        </div>
        {tremp != null && <div style={{ textAlign: "center" }}>
          <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>From</th>
              <th>To</th>
              <th>Type</th>

              <th>Time</th>
            </tr>
            <tr>
              <td>{tremp.Id}</td>
              <td>{tremp.From_Root}</td>
              <td>{tremp.To_Root}</td>
              <td>{tremp.Type.toString()}</td>
              <td>{tremp.Time}</td>
            </tr>
            </tbody>
          </table>
        </div>}

      </div>
    </div>
  );
}
