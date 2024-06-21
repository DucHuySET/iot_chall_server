import ErrorResponse from "../helpers/errorHandle.response.js";
import newDeviceModel from "../models/new.model.js";
import RGBModel from "../models/rgb.model.js";
import userModel from "../models/user.model.js";
import publishTopic from "../mqtt/publish.mqtt/index.js";
import { subscribeTopic } from "../mqtt/subscribe.mqtt/index.js";

class DeviceService {
  addMyGateway = async (Gateway) => {
    publishTopic(
      `/device/addgateway/${Gateway.macGateway}`,
      1,
      JSON.stringify({
        mac: Gateway.macGateway,
        clientID: Gateway.clientID,
      })
    );

    return {
      message:
        "Send request add Gateway successfully, wait for gateway respond",
    };
  };
  getDetectedDevice = async (id) => {
    const detectedDevice = await newDeviceModel.find({ user: id });
    return {
      detectedDevice,
      //  type : detectedDevice.type,
      //  uuid : detectedDevice.uuid,
      //  mac : detectedDevice.mac,
      //  clientID : detectedDevice.clientID
    };
  };

  addNewDevice = async (Infor) => {
    const User = await userModel.findById(Infor.clientID);
    if (!User) {
      throw new ErrorResponse("You are not belong to this page", 404);
    }
    publishTopic(
      `/device/addnewdevice/${User.gateway}`,
      1,
      JSON.stringify({
        uuid: Infor.uuid,
        mac: Infor.mac,
      })
    );
    return {
      type: Infor.type,
      message: "send request add new device successfully",
    };
  };

  rgbInfor = async (Infor) => {
    const rgb = await RGBModel.findOne({
      user: Infor.clientID,
      address: Infor.RGBAddress,
    });
    console.log(Infor.RGBAddress);

    if (!rgb) {
      throw new ErrorResponse("This RGB is not belong to you", 404);
    }

    return {
      rgb,
    };
  };

  rgbControl = async (Infor) => {
    const user = await userModel.findById(Infor.clientID);
    if (!user) {
      throw new ErrorResponse("User exit!!", 403);
    }
    if (Infor.groupAddress) {
      console.log(Infor.groupAddress);
      const rgb = await RGBModel.findOne({
        user: Infor.clientID,
        Group: { $in: Infor.groupAddress },
      });
    //  console.log(Infor.groupAddress);

      if (!rgb) {
        throw new ErrorResponse("This RGB is not belong to you", 404);
      }
      const payload = {
        address: Infor.groupAddress,
        red: Infor.red,
        blue: Infor.blue,
        green: Infor.green,
      };
      publishTopic(
        `/device/rgb/control/${user.gateway}`,
        1,
        JSON.stringify(payload)
      );
    } else {
      const rgb = await RGBModel.findOne({
        user: Infor.clientID,
        address: Infor.unicastAddress,
      });
      console.log(Infor.unicastAddress);

      if (!rgb) {
        throw new ErrorResponse("This RGB is not belong to you", 404);
      }
      const payload = {
        address: Infor.unicastAddress,
        red: Infor.red,
        blue: Infor.blue,
        green: Infor.green,
      };
      publishTopic(
        `/device/rgb/control/${user.gateway}`,
        1,
        JSON.stringify(payload)
      );
    }
    return {
      message: "Send RGB control Successfully, wait for respond",
    };
  };
}

export default new DeviceService();
