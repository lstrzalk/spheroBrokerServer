package com.example.nazwa.myapplication;

import android.net.wifi.WifiManager;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.format.Formatter;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class MainActivity extends AppCompatActivity {
    TextView IPStatusField;
    TextView BluetoothStatusField;
    TextView SocketConnectionInfoField;
    TextView SocketMessegeRecievedField;
    Server server;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        IPStatusField = (TextView)findViewById(R.id.IPStatusField);
        BluetoothStatusField = (TextView)findViewById(R.id.BluetoothStatusField);
        SocketConnectionInfoField = (TextView)findViewById(R.id.SocketConnectionInfoField);
        SocketMessegeRecievedField = (TextView)findViewById(R.id.SocketMessegeRecievedField);

        server = new Server(this);
        IPStatusField.setText(server.getIpAddress() + ":" + server.getPort());
    }
}
