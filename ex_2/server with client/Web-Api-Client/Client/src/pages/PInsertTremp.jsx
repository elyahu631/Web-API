import React, { useState } from "react";

export default function PInsertTremp(props) {
  const [trempInserted, setTrempInserted] = useState(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState(false);

  const btnInsertTremp = () => {
    if (from === "" || to === "" || time === "") {
      console.log("Please fill all inputs.")
      return;
    }
    const Tremp2Addd =
    {
      From_Root: from,
      To_Root: to,
      Type: type,
      Time: time,
    }

    fetch(props.apiUrl, {
      method: 'POST',
      body: JSON.stringify(Tremp2Addd),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        if(!res.ok){
          setTrempInserted(null)
          return;
        }
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch POST = ", result);
          setTrempInserted(result)

        },
        (error) => {
          console.log("err POST=", error);
        });

  }

  return (
    <div >
      <hr />
      <div >
        <input onChange={(e) => { setFrom(e.target.value) }} type="text" placeholder="From root:" />
        <input onChange={(e) => { setTo(e.target.value) }} type="text" placeholder="To root:" />
        <input onChange={(e) => { setTime(e.target.value.toString()); console.log(time.toString()) }} defaultValue={new Date()} type="datetime-local" name="time" />
        <input onClick={() => { setType((prev) => !prev) }} type="checkbox" name="type" id="" /><br />
        <button onClick={btnInsertTremp}>Insert tremp</button>
        {trempInserted  && <div style={{ textAlign: "center" }}>
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
                <td>{trempInserted.Id}</td>
                <td>{trempInserted.From_Root}</td>
                <td>{trempInserted.To_Root}</td>
                <td>{trempInserted.Type.toString()}</td>
                <td>{trempInserted.Time}</td>
              </tr>
            </tbody>
          </table>
        </div>}

      </div>
    </div>
  );
}
