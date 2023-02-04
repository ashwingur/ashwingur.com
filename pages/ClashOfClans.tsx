import axios from "axios";
import React, { useEffect } from "react";

// My profile: #YLPGLJOV
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdkMWI3YjEzLTgxN2EtNGVlMy05YzMzLWRkMWM3ZTBhZGNmOSIsImlhdCI6MTY3NTUwMjMzNiwic3ViIjoiZGV2ZWxvcGVyL2U2MTQyMGVkLTU4ZTgtMWE0Yy0zN2Y3LWJmM2ZkYWNmNDYxNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyMC4xNTUuNzEuNTUiXSwidHlwZSI6ImNsaWVudCJ9XX0.8NhFzRvTyfO8FmYgk8mEP54-zIgG0moXhXC16NBzo8VV9VJCYhf4lZtmEW5pu71j_Yi5kU1bKru1_C2xD-CjWA";
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const ClashOfClans = () => {
  useEffect(() => {
    // const httpClient = axios.create({
    //   baseURL: "https://api.clashofclans.com/v1",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // httpClient
    //   .get(`/players/${encodeURIComponent("#YLPGLJOV")}`)
    //   .then((response) => console.log(JSON.stringify(response)))
    //   .catch((error) => {
    //     console.log("error is " + JSON.stringify(error));
    //   });

    axios
      .get("https://api.clashofclans.com/v1/players/%23YLPGLJOV", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdkMWI3YjEzLTgxN2EtNGVlMy05YzMzLWRkMWM3ZTBhZGNmOSIsImlhdCI6MTY3NTUwMjMzNiwic3ViIjoiZGV2ZWxvcGVyL2U2MTQyMGVkLTU4ZTgtMWE0Yy0zN2Y3LWJmM2ZkYWNmNDYxNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyMC4xNTUuNzEuNTUiXSwidHlwZSI6ImNsaWVudCJ9XX0.8NhFzRvTyfO8FmYgk8mEP54-zIgG0moXhXC16NBzo8VV9VJCYhf4lZtmEW5pu71j_Yi5kU1bKru1_C2xD-CjWA",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => console.log(response.data));

    // axios
    //   .get(`https://api.clashofclans.com/v1/players/%23YLPGLJOV`)
    //   .then((response) => {
    //     console.log("response is " + JSON.stringify(response));
    //   })
    //   .catch((error) => {
    //     console.log("error is " + JSON.stringify(error));
    //   });
  }, []);
  return <div>ClashOfClans</div>;
};

export default ClashOfClans;
