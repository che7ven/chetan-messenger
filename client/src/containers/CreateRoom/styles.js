const styles = (theme) => ({
  button: {
    marginTop: 10,
  },
  chatContainer: {
    position: "absolute",
    top: "30%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  chatContent: {
    height: "75%",
    border: "solid 1px black",
  },
  createRoomWrapper: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  innerContainer: {
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  helperText: {
    color: "#cb2022",
    fontSize: 14,
    margin: 0,
  },
});

export default styles;
