import newDeviceModel from "../models/new.model.js";
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
    publishTopic(
      `/device/addnewdevice/${Infor.clientID}`,
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
}

export default new DeviceService();
