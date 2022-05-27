const styles = (theme) => ({
  chatContainer: {
    position: "absolute",
    top: "15%",
    alignContent: "center",
    flexDirection: "column",
  },
  chatPaperWrapper: {
    width: "50%",
  },
  chatContent: {
    flexDirection: "column",
    width: "80%",
  },
  chatContentWrapper: {
    width: "90%",
    height: "15vw",
    padding: 8,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    "& :last-child": {
      margin: 4,
    },
  },
  chatInputWrapper: {
    margin: "16px",
    width: "90%",
  },
  chip: {
    width: "fit-content",
    margin: "8px 8px 0 8px",
  },
  messengerWrap: {
    justifyContent: "flex-start",
  },
  paperHeader: {
    justifyContent: "space-between",
    width: "auto",
    minHeight: 60,
    alignItems: "center",
    backgroundColor: "beige",
    borderRadius: "4px 4px 0 0",
    marginBottom: 4,
  },
  name: {
    fontSize: "x-small",
    color: "#243435",
  },
  usersWrapper: {
    width: "20%",
    borderLeft: "black 1px solid",
    padding: 8,
  },
  me: {
    textAlign: "start",
  },
  others: {
    textAlign: "end",
  },
  notify: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default styles;
