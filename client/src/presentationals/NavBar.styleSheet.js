export const NavBarStyleSheet = {
  toolbar: {
    backgroundColor:"main.primary", 
    justifyContent : {
      sm: "space-between",
      xs: "center",
    },
  },
  box: {
    display: "flex", 
    alignItems: "center",
    width: {
      xs:"100%", 
      sm:"auto"},
    justifyContent:  "space-evenly",
  },
  boxRight: {
    display: "flex",
    alignItems: "center", 
    justifyContent : {
      sm: "center",
      xs:"space-evenly",
    } 
  }, 
  button: {
    textTransform:"none" ,
    fontSize: {
      xs: "18px",
      sm: "20px",
      md: "22px"
    },
    marginX:{
      md: 1.5,
      sx: .5}, 
    fontFamily: "catamaran",
    fontWeight: "bold",
    color: "white",
  },
  typography: {
  },
  iconButton: {
    color: "white"
  },
}
