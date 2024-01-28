# Hive Streaming Test

- In order to build the component that measures CPU Usage in a File sharing client, Angular+Electron were used to create a desktop app. 
- I decided to implement what would work as a signalling server in a P2P system, using Node+Express+Typescript and Websockets, to which each client would connect to and would be able to see other users connected as well. After connecting the CPU usage would be measured.
- The CPU measurements would then be sent to the same server which is connected to a MongoDB database. These values should be sent via HTTP Post Request to the server and then stored in a MongoDB collection that stores the information regarding the client identifier, the cpu measurement (in %), the timestamp and the room the client was connected to in the P2P system. 
- Ideally the CPU measurements would be measured through Node process in Electron and then sent to the Angular process. However I encountered numerous problems in sending these values to Angular, mainly because Electron exposes communication methods through the window object that is currently not available in the recent versions of Angular. For that reason, a mock value is being generated per minute in each client to simulate those measurements. 
- A simple user interface was implemented so that the user could connect the client to the network and read the current CPU usage percentage.

To start the client: npm run electron
To start the server: npm run dev

