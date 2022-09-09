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
  fabFilter: {
    position: "absolute",
    top: "30px",
    left:{
      xs:"30px",
      xl: "50px",
    },
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
    boxShadow:'0' 
  },
  filterButton: {
    fontSize:"60px",
    color:"#004f9d"
  },
  OutterInputBox:{
    zIndex:1,
    position: "absolute",
    bottom: {
      xs:"10px",
      xl: "10px"
    },
    left:{
      xs:"10px",
      xl: "30px"
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor:"rgba(255, 255, 255, .8)",
    padding: 2,
    border:"1px dashed #004f9d",
  },
  innerInputBox:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"end",
    mt:1
  },
  fieldBox: {
    mt:"3px",
    display:"flex",
  },
  input: {
    width:"90px",
    marginLeft:"10px",
    borderWidth:"1px",
    textAlign: "right"
  },
  refreshBox: {
    height:"20px", 
    display:"flex", 
    justifyContent:"left", 
    marginTop:"12px"
  },
  refreshButton:{
    backgroundColor:"white", 
    padding:1.5
  },
  tooltip: {
    width:"150px"
  },
  fiberIcon: {
    cursor: 'pointer', 
    width: '12px', 
  }
}
