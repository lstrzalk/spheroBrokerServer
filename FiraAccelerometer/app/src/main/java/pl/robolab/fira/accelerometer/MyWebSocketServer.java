package pl.robolab.fira.accelerometer;

import android.util.Log;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class MyWebSocketServer extends WebSocketServer {

    MainActivity activity;
    String toPrint = "";
    String command = "";
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

    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        Log.d("socket", message);
        activity.onMessageFromScoket(message);
        /*toPrint = message;
        command = message;
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                //activity.SocketMessegeRecievedField.setText(toPrint);
                //activity.testCommand(command);

            }
        });*/

    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println(ex.getStackTrace());
    }

    @Override
    public void onStart() {

    }
}
