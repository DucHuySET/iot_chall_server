import deviceService from "../services/device.service.js";

class DeviceController {
  addMyGateway = async (req, res, next) => {
    const macGateway = req.body.mac;
    const clientID = req.get("CLIENT_ID");
    console.log("POST :: FIND MY GATREWAY - ", macGateway);
    return res
      .status(201)
      .json(await deviceService.addMyGateway({ macGateway, clientID }));
  };
  getAllNewDevice = async (req, res, next) => {
    console.log("GET :: ALL NEW DEVICE ");
    const clientID = req.get("CLIENT_ID");
    return res
      .status(201)
      .json(await deviceService.getDetectedDevice(clientID));
  };

  addNewDevice = async (req, res, next) => {
    console.log("POST :: ADD NEW DEVICE ");
    const clientID = req.get("CLIENT_ID");
    const { type, uuid, mac } = req.body;
    return res
      .status(201)
      .json(await deviceService.addNewDevice({ type, uuid, mac,clientID }));
  };
}
export default new DeviceController();
