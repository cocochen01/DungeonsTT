import { useEffect } from 'react';
import { socket } from './socket';

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected); // true
    });

    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>VTT Clone</h1>
      <p>Connected to server via Socket.IO</p>
    </div>
  );
}

export default App;
