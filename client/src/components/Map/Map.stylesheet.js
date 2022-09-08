export const style = {
  boxContainer: {
    position: "relative", 
    width: "100%",
    padding: {
      xl: "0 40px 0 20px"
    },
    height: {
      xl: '30vw',
      xs: '60vh'
    },
  },
  /* boxAbsolute: {
    position: "absolute",
    top:0, 
    bottom:0,
    zIndex:1,
    display:"flex",
    justifyContent:"space-between"
  }, */
  /* boxRelative: {
    
    height:"80px",
    width:"100%",
    position: "absolute",
    top: 4,
    right: 4,  
    display:"flex", 
    justifyContent:"start",
    border:"none",
  }, */
  fabFilter: {
    position: "absolute",
    top: "30px",
    left:"50px",
    boxShadow:"none", 
    backgroundColor:"rgba(255,255,255, .7)", 
    height:"80px", 
    width:"80px", 
    border:"2px solid #004f9d"
  },
  mapCard: {
    width: "100%",
    height: {
      xl: '30vw',
      xs: '60vh'
    }, 
  },
  textField: {
    backgroundColor: "white",
    borderColor:"transparent",
  },
  
  filterButton: {
    fontSize:"60px",
    color:"#004f9d"
  },
  OutterInputBox:{
    zIndex:1,
    position: "absolute",
    bottom: {
      xs:10,
      xl: 10},
    left:{
      xs:"10px",
      xl: "30px"
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor:"rgba(255, 255, 255, .8)",
    padding:2,
    border:"1px dashed #004f9d",
  },
  innerInputBox:{
    display:"inline-flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"end",
    mt:1
  },
  fieldBox: {
    mt:"3px",
    display:"flex",
    justifyContent:"space-around",
  },
  input: {
    width:"90px",
    marginLeft:"10px",
    borderWidth:"1px",
    color:"black",
    textAlign: "right"

  }
}
