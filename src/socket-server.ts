import { Server } from "socket.io";
import { configDotenv } from "dotenv";

configDotenv();

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(`Server listening at http://[::1]:${process.env.WEBSOCKET_PORT}`);
    socket.on("deliverShoutoutWithClip", async (response) => {
        io.emit('recieveShoutoutWithClip', response)
    });
})

io.listen(Number(process.env.WEBSOCKET_PORT));