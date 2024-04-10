//CRUD test => pass 31.03.24

const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
const mongoose = require("mongoose");

// Add drivers to a specific branch - Gimashi
router.post("/:branchID/driver-add", async (req, res) => {
  try {
    const { branchID } = req.params;
    const {
      driver_id,
      current_handover_money,
      vehicle_number,
      availability,
      //   driver_longitude,
      //   driver_latitude,
      available_district,
    } = req.body;

    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const newDriver = {
      driver_id,
      current_handover_money,
      vehicle_number,
      availability,
      //   driver_longitude,
      //   driver_latitude,
      available_district,
    };

    branch.drivers.push(newDriver);
    await branch.save();

    res.json("Driver added to branch");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the driver to the branch",
    });
  }
});

// Update driver details within a branch - Gimashi
router.put("/:branchID/driver-update/:driverID", async (req, res) => {
  try {
    const { branchID, driverID } = req.params;

    const {
      current_handover_money,
      vehicle_number,
      availability,
      // driver_longitude,
      // driver_latitude,
      available_district,
    } = req.body;

    // Find the branch by branchID
    const branch = await Branch.findById(branchID);

    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Find the index of the driver within the branch's drivers array
    const driverIndex = branch.drivers.findIndex(
      (driver) => driver.driver_id.toString() === driverID
    );

    if (driverIndex === -1) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver details if provided in the request
    if (current_handover_money !== undefined) {
      branch.drivers[driverIndex].current_handover_money =
        current_handover_money;
    }
    if (vehicle_number !== undefined) {
      branch.drivers[driverIndex].vehicle_number = vehicle_number;
    }
    if (availability !== undefined) {
      branch.drivers[driverIndex].availability = availability;
    }
    //   if (driver_longitude !== undefined) {
    //     branch.drivers[driverIndex].driver_longitude = driver_longitude;
    //   }
    //   if (driver_latitude !== undefined) {
    //     branch.drivers[driverIndex].driver_latitude = driver_latitude;
    //   }
    if (available_district !== undefined) {
      branch.drivers[driverIndex].available_district = available_district;
    }

    // Save the updated branch
    await branch.save();

    res.json({ message: "Driver details updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while updating the driver details within the branch",
    });
  }
});

// Remove a driver from a specific branch - Gimashi
router.delete("/:branchID/driver-delete/:driverID", async (req, res) => {
  try {
    const { branchID, driverID } = req.params;

    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    const driverIndex = branch.drivers.findIndex(
      (driver) => driver.driver_id.toString() === driverID.toString()
    );
    if (driverIndex === -1) {
      return res.status(404).json({ error: "Driver not found in branch" });
    }

    branch.drivers.splice(driverIndex, 1);
    await branch.save();

    res.json("Driver deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the driver from the branch",
    });
  }
});

// read all driver from a specific branch - Gimashi
router.get("/:branchID/driver-all", async (req, res) => {
  try {
    const { branchID } = req.params;

    const branch = await Branch.findById(branchID);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    res.json(branch.drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching drivers from the branch",
    });
  }
});

module.exports = router;
