import React, { useState } from "react";

export default function PUpdateTremp(props) {
  
  const [id, setId] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState(false);

const [tremps, setTremps] = useState(null);


    
    const btnGetAllTremps = () => {

        fetch(props.apiUrl, {
            method: 'GET',
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
                    console.log("fetch btnGetAllTremps= ", result);
                    setTremps(result);

                    result.map(Tremp => console.log(Tremp));
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
    
    let trempDivs = null;
    if (tremps != null) {
        trempDivs = tremps.map(Tremp =>
            <div style={{ display: "flex", justifyContent: "space-between" }} key={Tremp.Id}><div>{Tremp.Id}</div><div>{Tremp.From_Root}</div><div>{Tremp.To_Root}</div><div>{Tremp.Type.toString()}</div>
            </div>);

    }




    const btnUpdateTremp = () => {
      if (from === "" || to === "" || time === "") {
        console.log("Please fill all inputs.")
        return;
      }
      const Tremp2updated =
      {
        From_Root: from,
        To_Root: to,
        Type: type,
        Time: time,
      }
      
      fetch(props.apiUrl + id, {
        method: 'PUT',
        body: JSON.stringify(Tremp2updated),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8', //very important to add the 'charset=UTF-8'!!!!
          'Accept': 'application/json; charset=UTF-8',
        })
      })
        .then(res => {
          console.log('res=', res);
          if(!res.ok){
            return;
          }
          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch PUT = ", result);
          },
          (error) => {
            console.log("err PUT=", error);
          });
    }

    return (
        <div>
            <hr />
            <div >
                <button onClick={btnGetAllTremps}>Get all tremps</button>
                {trempDivs}
            </div>
            <hr />
            <div >
              <input onChange={(e) => { setId(e.target.value) }} type="text" placeholder="id:" />
              <input onChange={(e) => { setFrom(e.target.value) }} type="text" placeholder="From root:" />
              <input onChange={(e) => { setTo(e.target.value) }} type="text" placeholder="To root:" />
              <input onChange={(e) => { setTime(e.target.value.toString()); console.log(time.toString()) }} defaultValue={new Date()} type="datetime-local" name="time" />
              <input onClick={() => { setType((prev) => !prev) }} type="checkbox" name="type" id="" /><br />
              <button onClick={btnUpdateTremp}>Update tremp</button>
     

            </div>
        </div>
    );
}