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
    backgroundColor:"rgba(0, 79, 157)", 
    color:"white", 
    borderRadius:"10px", 
    padding:5}, 
  typography : {
    a: {
      fontFamily: "Rampart One", 
      textShadow: "1px 1px 2px hsl(245, 79%, 65%)", 
      fontSize:{
          xs:"50px",
          sm:"70px"
        },
        mb:2,
      },
    b: { 
      fontFamily:"Catamaran", 
      fontWeight:"bold", 
      color:"rgb(30, 255, 243)", 
      textAlign:"center", 
      fontSize:{
        xs:"20px", 
        sm:"30px"
      }
    }

  }
}