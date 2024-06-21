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
      .json(await deviceService.addNewDevice({ type, uuid, mac, clientID }));
  };

  // -----------------------------------RGB---------------------------------//
  rgbInfor = async (req, res, next) => {
    const RGBAddress = req.params.address;
    console.log("GET :: RGB infor", RGBAddress);
    const clientID = req.get("CLIENT_ID");
    return res
      .status(201)
      .json(await deviceService.rgbInfor({ RGBAddress, clientID }));
  };

  rgbControl = async (req, res, next) => {
    const clientID = req.get("CLIENT_ID");
    const unicastAddress = req.params.address;
    if (req.query.groupaddress) {
      const groupAddress = req.query.groupaddress;
      const { red, green, blue } = req.body;
      return res.status(201).json(
        await deviceService.rgbControl({
          red,
          green,
          blue,
          clientID,
          unicastAddress,
          groupAddress,
        })
      );
    } else {
      const { red, green, blue } = req.body;
      return res.status(201).json(
        await deviceService.rgbControl({
          red,
          green,
          blue,
          clientID,
          unicastAddress,
        })
      );
    }
  };
}
export default new DeviceController();
