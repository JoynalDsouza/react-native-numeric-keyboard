import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextView from "./TextView";
import { formatIndianCurrency } from "../../utils/formatIndianCurrency";

const KeyBoardKey = ({ value, onPressHandler }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressHandler(value)}
      style={styles.keyboardKey}
    >
      <TextView style={[keyboardKeyTextStyle, numberkeyStyles]}>
        {value}
      </TextView>
    </TouchableOpacity>
  );
};

const NumericKeyboard = ({
  setTextInput = () => {},
  setCursorSelection = () => {},
  backgroundColor,
  keyTextColor = "white",
  textInput = "",
  theme = "dark",
  formatToCurrency = false,
  closeKeyboard,
  hideDoubleZeros = false,
  numberkeyStyles = {},
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

  const keyboardBackgroundColor = theme === "dark" ? "black" : "white";

  return (
    <View
      style={{
        paddingVertical: 6,
        backgroundColor: backgroundColor
          ? backgroundColor
          : keyboardBackgroundColor,
        height: 250,
      }}
    >
      <View style={{ justifyContent: "space-around" }}>
        <View style={styles.keyboardRow}>
          <KeyBoardKey
            value={"1"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"2"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"3"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>
        </View>

        <View style={styles.keyboardRow}>
          <KeyBoardKey
            value={"4"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"5"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"6"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>
        </View>

        <View style={styles.keyboardRow}>
          <KeyBoardKey
            value={"7"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"8"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <KeyBoardKey
            value={"9"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>
        </View>

        <View style={styles.keyboardRow}>
          <TouchableOpacity
            onPress={() => {
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
                <TextView style={[keyboardKeyTextStyle, numberkeyStyles]}>
                  {"00"}
                </TextView>
              )
            ) : (
              <View>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={
                    theme === "dark"
                      ? require("./assests/chevron-down-white.png")
                      : require("./assests/chevron-down.png")
                  }
                ></Image>
              </View>
            )}
          </TouchableOpacity>

          <KeyBoardKey
            value={"0"}
            onPressHandler={handleKeyPress}
          ></KeyBoardKey>

          <TouchableOpacity
            onPress={() => handleKeyPress("backspace")}
            style={styles.keyboardKey}
          >
            <Image
              source={
                theme === "dark"
                  ? require("./assests/backspace.png")
                  : require("./assests/backspace-black.png")
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
