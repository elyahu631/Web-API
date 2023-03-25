import React, { useState } from "react";

export default function PGetAllTremps(props) {
    const [tremps, setTremps] = useState(null);
    let trempDivs = null;
    if (tremps != null) {
        trempDivs = tremps.map(Tremp =>
            <div style={{ display: "flex", justifyContent: "space-between" }} key={Tremp.Id}><div>{Tremp.Id}</div><div>{Tremp.From_Root}</div><div>{Tremp.To_Root}</div><div>{Tremp.Type.toString()}</div>
            </div>);

    }

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

    return (
        <div>
            <hr />
            <div >
                <button onClick={btnGetAllTremps}>Get all tremps</button>
                {trempDivs}
            </div>
        </div>
    );
}
