const styles = (theme) => ({
  container: {
    position: "absolute",
    top: "30%",
    flexDirection: "column",
    alignContent: "center",
  },
  innerWrapper: {
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helperText: {
    color: "#cb2022",
    fontSize: 14,
    margin: "10px 0 0 10px",
  },
  buttonWrap: {
    "& button": {
      width: "100%",
    },
  },
  inputWrap: {
    width: "75%",
  },
});

export default styles;
