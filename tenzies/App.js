import * as React from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";

export default class App extends React.Component {
  render() {
    return Platform.OS === "web" ? (
      <iframe
        src="https://kingmathers92.github.io/React-Tenzies-Game/"
        height={"100%"}
        width={"100%"}
      />
    ) : (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: "https://kingmathers92.github.io/React-Tenzies-Game/",
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>
    );
  }
}
