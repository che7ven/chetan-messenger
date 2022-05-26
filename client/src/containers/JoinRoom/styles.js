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
    alignItems: "center",
  },
  chatContent: {
    height: "75%",
    border: "solid 1px black",
  },
  createRoomWrapper: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-between",
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
  listWrapper: {
    width: "50%",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  roomHead: {
    backgroundColor: "coral",
    color: "white",
    minHeight: 42,
    maxWidth: 360,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px 16px 0 0",
  },
});

export default styles;
