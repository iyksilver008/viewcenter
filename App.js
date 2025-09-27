import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
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
        {/* Full-screen splash background - exact filename: splash.png */}
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
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      mediaPlaybackRequiresUserAction={false}
      style={{ flex: 1 }}
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
