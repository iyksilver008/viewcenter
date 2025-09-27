import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("./assets/splash.png")}
          style={styles.splashImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: "https://viewcenter.fwh.is" }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      mediaPlaybackRequiresUserAction={false}
      startInLoadingState={true}   // shows loader until site loads
      originWhitelist={["*"]}      // allow all URLs
      allowsBackForwardNavigationGestures={true} // smoother navigation on iOS
      mixedContentMode="always"    // fix if site has http + https
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn("WebView error: ", nativeEvent);
      }}
    />
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
