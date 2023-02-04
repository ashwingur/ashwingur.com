import axios from "axios";
import React, { useEffect } from "react";
import { Player } from "clashofclans.js";

// My profile: #YLPGLJOV

const ClashOfClans = () => {
  useEffect(() => {
    // axios.get("/api/clashofclans/player").then((response) => {
    //   const playerData: Player = response.data;
    //   console.log(playerData.name);
    //   console.log(playerData);
    // });

    axios
      .get("https://cocproxy.royaleapi.dev/v1/players/%23YLPGLJOV", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU1YTI0MmJkLTk0OGMtNDVlMC1iOGFiLWE2ZTAxNzJiNDkxMyIsImlhdCI6MTY3NTUxMzE3Mywic3ViIjoiZGV2ZWxvcGVyL2U2MTQyMGVkLTU4ZTgtMWE0Yy0zN2Y3LWJmM2ZkYWNmNDYxNCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Mc_2fdq5yCdHpVFHSME6SQ9iTp5AL3MqB-W6MEMHefjEy6WWrprvyHJUCDFK0EdzF-TivT5CPtCVmBwxbv4bVQ",
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }, []);
  return <div>ClashOfClans</div>;
};

export default ClashOfClans;
