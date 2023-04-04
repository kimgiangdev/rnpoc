/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraPosition,
} from 'react-native-vision-camera';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Svg, Defs, Rect, Mask, Circle} from 'react-native-svg';

const App = () => {
  const devices = useCameraDevices();
  const camera = useRef(null);
  const device = devices.front;

  const [showCamera, setShowCamera] = useState<boolean>(false);
  console.log('devices', devices);

  useEffect(() => {
    async function getPermission() {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log('cameraPermission', cameraPermission);
      if (cameraPermission === 'denied') {
        // await Linking.openSetting();
      }
    }
    getPermission();
  }, []);
  const backgroundStyle = {
    backgroundColor: '#000000',
  };
  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  const WrappedSvg = () => (
    <View style={{aspectRatio: 1}}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Circle r="45" cx="50" cy="50" />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#mask)"
          fill-opacity="0"
        />
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
            fontSize: 24,
            color: '#fff',
          }}>
          Video verification
        </Text>
        <Text style={{textAlign: 'center', color: '#fff'}}>
          Let's make sure you are a real person
        </Text>
        <View
          style={{
            height: 360,
            width: 250,
            borderWidth: 1,
            borderColor: '#fff',
            alignSelf: 'center',
            marginTop: 30,
            // borderRadius: 250 / 2,
            // width: 220,
            // height: 220,
            // borderRadius: 110,
            // backgroundColor: 'red',
            // transform: [{scaleY: 2}],
            // zIndex: 100,
          }}>
          <Camera
            ref={camera}
            isActive={true}
            photo={true}
            device={device}
            style={styles.cameraContainer}
          />
          {/* <WrappedSvg /> */}
          {/* <View
            style={{
              backgroundColor: 'red',
              height: 50,
              width: 50,
              position: 'absolute',
              top: 0,
              zIndex: 10,
            }}></View> */}
        </View>
        <View>
          <Text style={{textAlign: 'center', color: '#fff'}}>
            Your face is FakeFace
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'rgb(133, 178, 132)',
              width: 300,
              height: 40,
              borderRadius: 25,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowCamera(true)}>
            <Text style={{color: '#fff'}}>Start Vertifying</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(24, 45, 50)',
  },
  cameraContainer: {
    flex: 1,
    zIndex: 1111,
    // height: 360,
    // width: '100%',
    // position: 'absolute',
    // top: 10,
    // left: 10,
  },
});

export default App;
