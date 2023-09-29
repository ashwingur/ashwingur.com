import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ParkingIDs,
  ParkingFacility,
} from "../../../../shared/interfaces/parking.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await axios
    .get<ParkingIDs>("https://api.transport.nsw.gov.au/v1/carpark", {
      headers: {
        Authorization: `apikey ${process.env.OPEN_DATA_TOKEN}`,
      },
    })
    .then(async (response) => {
      // Filtering out 1-5 as those are only historical data about tallawong, kellyville, bella vista, hills showground and cherrybrook
      const parkingIDs = Object.keys(response.data).filter(
        (e) => Number(e) > 5
      );
      const parkingPromises = parkingIDs.map((id) =>
        axios.get<ParkingFacility>(
          `https://api.transport.nsw.gov.au/v1/carpark?facility=${id}`,
          {
            headers: {
              Authorization: `apikey ${process.env.OPEN_DATA_TOKEN}`,
            },
          }
        )
      );

      await Promise.all(parkingPromises)
        .then((parkingResponses) => {
          const resposneData = parkingResponses.map(
            (parkingResponse) => parkingResponse.data
          );
          return res.status(200).json(resposneData);
        })
        .catch((error) => {
          console.error("Error:", error);
          return res
            .status(500)
            .json({ error: "something went wrong: " + JSON.stringify(error) });
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      return res
        .status(500)
        .json({ error: "something went wrong: " + JSON.stringify(error) });
    });
}
