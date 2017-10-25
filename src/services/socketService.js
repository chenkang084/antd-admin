import io from "socket.io-client";
import config from "../config";
const socketService = io(config.uri.socketHost);

socketService.on("connect", function() {
  console.log("connected");

  socketService.emit("name", "my name is kang");
});
socketService.on("reply", function(data) {
  console.log("reply", data);
});
socketService.on("disconnect", function() {
  console.log("disconnect");
});

export default socketService;
