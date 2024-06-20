import express from "express";
import asynMiddlewareHandler from "../../services/middleware.service.js";
import deviceController from "../../controllers/device.controller.js";

const deviceRouter = express.Router();
deviceRouter
.post("/addmygateway", asynMiddlewareHandler(deviceController.addMyGateway))
.get("/getnewdevice", asynMiddlewareHandler(deviceController.getAllNewDevice))
.post("/addnewdevice",asynMiddlewareHandler(deviceController.addNewDevice))


export default deviceRouter;
