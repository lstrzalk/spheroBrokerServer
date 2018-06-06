package com.example.nazwa.myapplication;


import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import com.orbotix.ConvenienceRobot;
import com.orbotix.DualStackDiscoveryAgent;
import com.orbotix.common.DiscoveryException;
import com.orbotix.common.Robot;
import com.orbotix.common.RobotChangedStateListener;
import com.orbotix.le.RobotLE;

public class RobotController {
    private ConvenienceRobot mRobot;

    private static final int REQUEST_CODE_LOCATION_PERMISSION = 42;
    private static final float ROBOT_VELOCITY = 0.6f;

    MainActivity activity;

    public RobotController(MainActivity activity){
        this.activity = activity;
    }
//
//
//    DualStackDiscoveryAgent.getInstance().addRobotStateListener( this );
//    @Override
//    protected void onStart() {
//
//        if( Build.VERSION.SDK_INT < Build.VERSION_CODES.M
//                || checkSelfPermission( Manifest.permission.ACCESS_COARSE_LOCATION ) == PackageManager.PERMISSION_GRANTED ) {
//            startDiscovery();
//        }
//    }
//
//    private void startDiscovery() {
//        //If the DiscoveryAgent is not already looking for robots, start discovery.
//        if( !DualStackDiscoveryAgent.getInstance().isDiscovering() ) {
//            try {
//                DualStackDiscoveryAgent.getInstance().startDiscovery(getApplicationContext());
//            } catch (DiscoveryException e) {
//                Log.e("Sphero", "DiscoveryException: " + e.getMessage());
//            }
//        }
//    }
//
//    @Override
//    public void handleRobotChangedState(Robot robot, RobotChangedStateNotificationType type) {
//        switch( type ) {
//            case Online: {
//
//                //If robot uses Bluetooth LE, Developer Mode can be turned on.
//                //This turns off DOS protection. This generally isn't required.
//                if( robot instanceof RobotLE) {
//                    ( (RobotLE) robot ).setDeveloperMode( true );
//                }
//
//                //Save the robot as a ConvenienceRobot for additional utility methods
//                mRobot = new ConvenienceRobot( robot );
//
//                //Start blinking the robot's LED
//                //blink( false );
//                break;
//            }
//        }
//    }
//
//
//    //private ConvenienceRobot mRobot;
}
