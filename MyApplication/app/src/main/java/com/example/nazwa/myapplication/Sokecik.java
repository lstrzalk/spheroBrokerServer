package com.example.nazwa.myapplication;

import android.util.Log;

import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;



public class Sokecik extends WebSocketServer{
    MainActivity activity;
    String toPrint = "";
    String command = "";
    public Sokecik(InetSocketAddress address, MainActivity mainActivity) {
        super(address);
        this.activity = mainActivity;

        // TODO Auto-generated constructor stub
    }

    @Override
    public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onError(WebSocket arg0, Exception arg1) {
        // TODO Auto-generated method stub
        System.out.println(arg1.getStackTrace());

    }

    @Override
    public void onStart() {

    }

    @Override
    public void onMessage(WebSocket arg0, String arg1) {
        // TODO Auto-generated method stub
        Log.d("socket", arg1);
        toPrint = arg1;
        command = arg1;
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                activity.SocketMessegeRecievedField.setText(toPrint);
                activity.testCommand(command);

            }
        });


        /*try {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.runCommand(command);
                }
            });
        }catch (Exception e){
            e.printStackTrace();
        }*/




    }

    @Override
    public void onOpen(WebSocket arg0, ClientHandshake arg1) {
        // TODO Auto-generated method stub

    }

    private class msgThread extends Thread{
        @Override
        public void run(){
            try{

            }catch (Exception e){

            }

        }
    }


}