import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);

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
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://viewcenter.fwh.is" }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={["*"]}
        mixedContentMode="always"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <Image
            source={require("./assets/viewcenter.png")} // your logo file
            style={styles.logo}
          />
          <Text style={styles.loaderText}>Loading ViewCenter…</Text>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  loaderText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
});
