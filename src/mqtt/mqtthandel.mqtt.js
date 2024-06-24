import ErrorResponse from "../helpers/errorHandle.response.js";
import newDeviceModel from "../models/new.model.js";
import RGBModel from "../models/rgb.model.js";
import SensorModel from "../models/sensor.model.js";
import SirenModel from "../models/siren.model.js";
import EncoderModel from "../models/encoder.model.js";
import DoorModel from "../models/door.model.js";
import userModel from "../models/user.model.js";

const mqttHandle = async (topic, data) => {
  console.log(topic);
  console.log(data);
  if (topic === "/device/resgateway") {
    const updateGateway = await userModel.findOneAndUpdate(
      { _id: data.clientID },
      {
        gateway: data.mac,
      }
    );

    if (!updateGateway) {
      console.log("Cannot find gateway ?");
    } else {
      console.log("Update gateway for user name ::", updateGateway.name);
    }
  } else if (topic === "/device/detect") {
    const checkDetected = await newDeviceModel.findOne({
      user: data.clientID,
      mac: data.mac,
    });
    if (checkDetected) {
      console.log("This user have this device before, cannot add");
      return;
    } else {
      console.log("Prepare add new device");
    }
    const detectedDevice = await newDeviceModel.create({
      type: data.type,
      uuid: data.uuid,
      mac: data.mac,
      user: data.clientID,
    });
    if (!detectedDevice) {
      console.log("Cannot update detected device");
    }
  } else if (topic === "/device/rgb") {
    const tryOldRGB = await RGBModel.findOne({
      user: data.clientID,
      address: data.address,
    });

    if (tryOldRGB) {
      console.log("This user owned this RGB");
      return;
    } else {
      console.log("Prepare add new RGB for user");
    }
    const newRGB = await RGBModel.create({
      name: "Rgb",
      user: data.clientID,
      address: data.address,
    });

    if (!newRGB) {
      console.log("Cannot add RGB for user");
    } else {
      console.log("Successfully add RGB device for user name ::", newRGB.user);
    }
  } else if (topic === "/device/sensor") {
    const tryOldSensor = await SensorModel.findOne({
      user: data.clientID,
      address: data.address,
    });
    if (tryOldSensor) {
      console.log("This sensor owned this sensor");
      return;
    } else {
      console.log("Prepare to add new sensor");
    }
    const newSensor = await SensorModel.create({
      name: "Sensor",
      user: data.clientID,
      address: data.address,
    });

    if (!newSensor) {
      console.log("Cannot add Sensor for user");
    } else {
      console.log(
        "Successfully add Sensor device for user name ::",
        newSensor.user
      );
    }
  } else if (topic === "/device/siren") {
    const tryOldSiren = await SirenModel.findOne({
      user: data.clientID,
      address: data.address,
    });
    if (tryOldSiren) {
      console.log("This user owned this Siren");
      return;
    } else {
      console.log("Prepare to add new Siren");
    }
    const newSiren = await SirenModel.create({
      name: "Siren",
      user: data.clientID,
      address: data.address,
    });

    if (!newSiren) {
      console.log("Cannot add Siren for user");
    } else {
      console.log(
        "Successfully add Siren device for user name ::",
        newSiren.user
      );
    }
  } else if (topic === "/device/door") {
    const tryOldDoor = await DoorModel.findOne({
      user: data.clientID,
      address: data.address,
    });
    if (tryOldDoor) {
      console.log("This user owned this Door");
      return;
    } else {
      console.log("Prepare to add new Door");
    }
    const newDoor = await DoorModel.create({
      name: "Door",
      user: data.clientID,
      address: data.address,
    });

    if (!newDoor) {
      console.log("Cannot add Door for user");
    } else {
      console.log(
        "Successfully add Door device for user name ::",
        newDoor.user
      );
    }
  } else if (topic === "/device/encoder") {
    const tryOldEncoder = await EncoderModel.findOne({
      user: data.clientID,
      address: data.address,
    });
    if (tryOldEncoder) {
      console.log("This user onwed this encoder");
      return;
    } else {
      console.log("Preprare add new encoder ");
    }
    const newEncoder = await EncoderModel.create({
      name: "Encoder",
      user: data.clientID,
      address: data.address,
    });

    if (!newEncoder) {
      console.log("Cannot add Encoder for user");
    } else {
      console.log(
        "Successfully add Encoder device for user name ::",
        newEncoder.user
      );
    }
  }
};
export { mqttHandle };
