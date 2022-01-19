import React from "react";
import { StyleSheet, Easing, Animated } from "react-native";

export default function Logo() {
  this.state = { spinValue: new Animated.Value(0) };

  Animated.loop(
    Animated.timing(this.state.spinValue, {
      toValue: 1, // đặt giá trị về 1
      duration: 10000, // quay trong khoảng thời gian 10000ms = 10s
      easing: Easing.linear, // quay đều
      useNativeDriver: true,
    })
  ).start();

  const spin = this.state.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // gía trị truyền vào phần rotate để quay
  });

  return (
    <>
      <Animated.Image
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        source={require("../assets/logo.png")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 135,
    height: 120,
    marginBottom: 8,
  },
});
