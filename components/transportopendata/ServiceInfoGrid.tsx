import Card from "@components/Card";
import React from "react";
import { useServiceInfo } from "shared/queries/transportopendata";
import { format } from "date-fns";
import { TbAlertTriangleFilled } from "react-icons/tb";

interface ServiceInfoGridProps {
  className?: string;
}
interface Validity {
  from: string;
  to: string;
}

const formatValidity = (validity: Validity[]): string[] => {
  return validity.map((item) => {
    const fromDate = new Date(item.from);
    const toDate = new Date(item.to);

    const formattedFrom = format(fromDate, "EEEE, dd MMM hh:mm a");
    const formattedTo = format(toDate, "EEEE, dd MMM hh:mm a");

    return `${formattedFrom} to ${formattedTo}`;
  });
};

const ServiceInfoGrid: React.FC<ServiceInfoGridProps> = ({ className }) => {
  const { isLoading, isError, data } = useServiceInfo(["030M1"]); // Metro line only for now

  if (isLoading || data === undefined || isError) {
    return <></>;
  }

  const alertBoxes = data.current
    .filter((item) => {
      const validityTimestamp = new Date(item.timestamps.validity[0].from);
      const currentDate = new Date();

      // Calculate the difference in days
      const diffInTime = validityTimestamp.getTime() - currentDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert from milliseconds to days

      // Filter if more than 10 days
      console.log(diffInDays);
      return diffInDays < 10;
    })
    .sort((a, b) => {
      const validityA = new Date(a.timestamps.validity[0].from).getTime();
      const validityB = new Date(b.timestamps.validity[0].from).getTime();

      // Sort by earliest validity (ascending)
      return validityA - validityB;
    })
    .map((item, key) => {
      const validity_strings = formatValidity(item.timestamps.validity).map(
        (s, index) => <p key={index}>{s}</p>,
      );
      return (
        <Card firstLayer={false} key={key}>
          <div className="flex items-center gap-4">
            <TbAlertTriangleFilled className="w-16 text-3xl text-error md:w-20 md:text-4xl" />
            <div>
              <p className="text-sm font-bold">{item.urlText}</p>
              <div className="text-sm text-text-muted"> {validity_strings}</div>
            </div>
          </div>
        </Card>
      );
    });

  return <div className={className}>{alertBoxes}</div>;
};

export default ServiceInfoGrid;
