import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import jsPDF from "jspdf";

export default function ViewSupermarketsUI() {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/Supermarket/supermarkets"
        );
        setSupermarkets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching supermarkets:", error);
      }
    };

    fetchSupermarkets();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSupermarkets = supermarkets.filter((supermarket) =>
    supermarket.sm_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Supermarkets Report", 15, 10);
    doc.autoTable({
      html: "#supermarkets-table",
      columns: [
        { header: "Name", dataKey: "name" },
        { header: "Location", dataKey: "location" },
      ],
    });
    doc.save("supermarkets_report.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="inline-flex justify-end">
        <div className="mb-4 mt-5">
          <Input
            placeholder="Search supermarket by name"
            value={searchQuery}
            onChange={handleSearchChange}
            size="regular"
            outline={true}
            icon={<MagnifyingGlassIcon />}
          />
        </div>
        <div className="ml-5">
          <Button
            className=" w-15 mt-5 bg-green-700 hover:bg-green-900"
            onClick={generateReport}
          >
            Generate PDF Report
          </Button>
        </div>
      </div>
      <table
        id="supermarkets-table"
        className="w-full min-w-max table-auto text-left"
      >
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Location
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Update
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                style={{ fontWeight: "bolder" }}
                className="font-normal leading-none opacity-70 text-center"
              >
                Delete
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSupermarkets.map((supermarket, index) => {
            const isLast = index === supermarkets.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={supermarket._id}>
                <td className={classes}>{supermarket.sm_name}</td>
                <td className={classes}>{supermarket.sm_location}</td>
                <td
                  className={`${classes} bg-blue-gray-50/50`}
                  style={{ textAlign: "center" }}
                >
                  <Button className="hover:bg-black">Update</Button>
                </td>
                <td
                  className={`${classes} bg-blue-gray-50/50`}
                  style={{ textAlign: "center" }}
                >
                  <Button className="bg-red-700 hover:bg-red-900">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
