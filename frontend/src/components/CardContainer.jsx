import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useState } from "react";
import { PopOver } from "./PopOver";

export function CardContainer() {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  const togglePopOver = () => {
    setIsPopOverOpen(!isPopOverOpen);
  };

  return (
    <Card className="w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Apple AirPods
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 items-center justify-center ml-20 pl-10">
        <PopOver
          size="lg"
          fullWidth={true}
          isOpen={isPopOverOpen}
          togglePopover={togglePopOver}
        />
      </CardFooter>
    </Card>
  );
}
