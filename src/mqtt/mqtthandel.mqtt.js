import ErrorResponse from "../helpers/errorHandle.response.js";
import newDeviceModel from "../models/new.model.js";
import RGBModel from "../models/rgb.model.js";
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
    const newRGB = await RGBModel.create({
      name: "RGB",
      user: data.clientID,
      address: data.address,
    });

    if (!newRGB) {
      console.log("Cannot add RGB for user");
    } else {
      console.log("Successfully add RGB device for user name ::", newRGB.user);
    }
  }
};
export { mqttHandle };
