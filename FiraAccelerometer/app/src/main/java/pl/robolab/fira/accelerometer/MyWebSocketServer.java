package pl.robolab.fira.accelerometer;

import android.util.Log;
import android.widget.TextView;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class MyWebSocketServer extends WebSocketServer {

    MainActivity activity;
    String command = "";

    String currentPlayerName = "";



    public MyWebSocketServer(InetSocketAddress address, MainActivity mainActivity) {
        super(address);
        this.activity = mainActivity;

        // TODO Auto-generated constructor stub
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {

    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println("closed " + conn.getRemoteSocketAddress() + " with exit code " + code + " additional info: " + reason);
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        Log.d("socket", message);

        if(message.startsWith("winner")){
            currentPlayerName = message.split(":")[1];
            System.out.println("Change player: "+ currentPlayerName);
            return;
        }

        String tmp[] = message.split(":");
        String currentID = tmp[0];
        if(!currentID.equals(currentPlayerName)){
            System.out.println(currentID + " is not a winner!");
            conn.send("Bye");
            return;
        }
        command = tmp[1];
        System.out.println("Player: "+currentPlayerName + "command: " + command);
        activity.onMessageFromSocket(command);


    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println(ex.getStackTrace());
    }

    @Override
    public void onStart() {

    }
}
