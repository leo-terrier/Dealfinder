export const searchBoxStyleSheet = {
  card : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
    width: {
      xl: "44%",
      lg: "52%",
      md: "66%",
      sm: "80%",
      xs: "83%"
      },
    mt:"20px",
    },
  boxOut: {
    maxHeight: {
      //md: "80vh",
      xs: "80vh",
    },
    overflow: "auto",
    paddingX: {
      md: 0,
      xs: 3,
    }, 
    marginTop:{
      xs: 3,
      md: 4,
    },
    marginBottom:{
      xs: 3,
      md: 4,
    },
    scrollbarColor: "dark",
  },
  boxIn: {
    fontWeight:"bold", 
  },
  typography: {
    a: {
      fontSize: {
        md: "65px",
        sm:"55px",
        xs: "45px"
      },
      fontFamily: "chivo",
      textShadow: "1px 1px 2px black",
      color: "primary.main" 
    },
    b: {
      fontWeight: "bold",
      mt: {
        xs: 2,
        md: 3
      },
      mb: {
        xs: 1,
        md: 3
      },
      fontSize: {
        xs: "21px",
        md: "23px"
      }
    },
    c: {
      mt: {
        xs: 3,
        md: 3
      },
      mb: {
        xs: 0,
        md: 2
      },
      fontStyle: "italic",
      fontWeight: "lighter",
      fontSize: {
        xs: "20px",
        md: "23px"
      }
    }
  },
  grid: {
    width: "80%", 
    margin:"auto",
  },
  gridField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px",
  },
  gridLabel : {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: {
      xs: 2,
      md: 0,
    },
    mb: {
      xs: 1,
      md: 0,
    },
    fontSize: {
      md: "20px",
      xs: "18px"}
    },
  gridLabelOptional : { 
    alignItems: "center",
    justifyContent: "center",
    mt: {
      xs: 2,
      md: 0,
    },
    mb: {
      xs: 1,
      md: 0,
    },
    fontSize: {
      md: "20px",
      xs: "20px"
    }
    },
  gridWrongInput: {
    mt:1, 
    color:"red",
  },
  gridOptionalPhrase: {
    justifyContent: "center"
  },
  gridFab: {
    mt: {
      xs:2,
      md: 2,
    }
  },
  textField: {
    width: {
      xs: "85%",
      md: "90%"
    },
    color:"black", 
  },
  button: {
    mt: {
      md: 2,
      xs: 2}
  }
}
