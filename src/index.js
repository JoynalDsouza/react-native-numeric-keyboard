import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextView from "./TextView";
import { formatIndianCurrency } from "../../utils/formatIndianCurrency";

const NumericKeyboard = ({
  setTextInput = () => {},
  setCursorSelection = () => {},
  backgroundColor = "#4c56c0",
  keyTextColor = "white",
  textInput = "",
  theme = "dark",
  formatToCurrency = false,
  closeKeyboard,
  hideDoubleZeros = false,
}) => {
  const handleKeyPress = (value) => {
    try {
      if (!textInput && value !== "backspace") {
        setTextInput(value);
        const formattedValue = formatToCurrency
          ? formatIndianCurrency(value)
          : value;
        setCursorSelection({
          start: (formattedValue + "").length,
          end: (formattedValue + "").length,
        });
        return;
      }
      if (value === "backspace") {
        const sliceString = textInput.toString().slice(0, -1);
        setTextInput(sliceString);
        const formattedValue = formatToCurrency
          ? formatIndianCurrency(sliceString)
          : sliceString;
        setCursorSelection({
          start: formattedValue.length,
          end: formattedValue.length,
        });
        return;
      } else {
        setTextInput(textInput + value);
        const formattedValue = formatToCurrency
          ? formatIndianCurrency(textInput + value)
          : textInput + value;
        setCursorSelection({
          start: (formattedValue + "").length,
          end: (formattedValue + "").length,
        });
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const keyboardKeyTextStyle = {
    color: keyTextColor,
    fontSize: 24,
    fontWeight: "600",
  };

  return (
    <View
      style={{
        paddingVertical: 6,
        backgroundColor: backgroundColor,
        height: 250,
      }}
    >
      <View style={{ justifyContent: "space-around" }}>
        <View style={styles.keyboardRow}>
          <TouchableOpacity
            onPress={() => handleKeyPress("1")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>1</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("2")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>2</TextView>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleKeyPress("3")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>3</TextView>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRow}>
          <TouchableOpacity
            onPress={() => handleKeyPress("4")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>4</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("5")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>5</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("6")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>6</TextView>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRow}>
          <TouchableOpacity
            onPress={() => handleKeyPress("7")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>7</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("8")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>8</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("9")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>9</TextView>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardRow}>
          <TouchableOpacity
            onPress={() => {
              console.log(closeKeyboard);
              if (closeKeyboard) {
                closeKeyboard();
              } else {
                handleKeyPress("00");
              }
            }}
            style={styles.keyboardKey}
          >
            {!closeKeyboard ? (
              !hideDoubleZeros && (
                <TextView style={keyboardKeyTextStyle}>{"00"}</TextView>
              )
            ) : (
              <View>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={
                    theme === "dark"
                      ? require("../../imagesv2/withdraw/chevron-down-white.png")
                      : require("../../imagesv2/withdraw/chevron-down.png")
                  }
                ></Image>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("0")}
            style={styles.keyboardKey}
          >
            <TextView style={keyboardKeyTextStyle}>0</TextView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleKeyPress("backspace")}
            style={styles.keyboardKey}
          >
            <Image
              source={
                theme === "dark"
                  ? require("../../imagesv2/wallet/backspace.png")
                  : require("../../imagesv2/withdraw/backspace.png")
              }
              style={{ width: 35, height: 35 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "25%",
    alignItems: "center",
  },
  keyboardKey: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NumericKeyboard;