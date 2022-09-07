export const HomeStyleSheet = {
  card : {
    display:"flex",
    flexDirection:"column", 
    justifyContent:"space-evenly", 
    alignItems:"center", 
    width:{
      xs:"70%", 
      sm:"55%", 
      lg:"35%"
      }, 
    backgroundColor:"rgba(0, 79, 157, .8)", 
    color:"white", 
    borderRadius:"10px", 
    padding:5}, 
  typography : {
    a: {
      fontFamily: "chivo", 
      textShadow: "1px 1px 2px hsl(245, 79%, 65%)", 
      fontSize:{
          xs:"40px",
          sm:"60px"
        }
      },
    b: { 
      fontFamily:"Catamaran", 
      fontWeight:"bold", 
      color:"rgb(30, 255, 243)", 
      textAlign:"center", 
      fontSize:{
        xs:"30px", 
        sm:"40px"
      }
    }

  }
}