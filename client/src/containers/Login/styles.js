const styles = (theme) => ({
  container: {
    position: "absolute",
    top: "30%",
    flexDirection: "column",
    alignContent: "center",
  },
  innerWrapper: {
    justifyContent: "center",
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
    width: "30%",
    marginRight: 24,
  },
});

export default styles;
