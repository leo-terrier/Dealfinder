import { createTheme } from '@mui/material/styles';
import background from "./img/immobilier3.png";

export const containerStyle = {
  height:"100vh", 
  display:"flex", 
  justifyContent:"center", 
  alignItems:"center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "start",
  backgroundRepeat: "no-repeat",

}

export let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      //main:"rgb(51, 102, 153)",
      main: "#004f9d",
    },
    secondary: {
      main:"#e91e63"
    },
    black: "black",
  },
  floatingLabelFocusStyle: {
    color: "black"
},
  components: {
    MuiButton: {
      variants: [  
        {
          props: { variant: 'buttonA' },
          style: {
            backgroundColor:"white", 
            color:"rgb(51, 102, 153)",
            '&:hover': {
                    backgroundColor: "rgb(51, 102, 153)",
                    color: 'white',
                    }
                  }
                },
        {
          props: { variant: 'buttonD' },
          style: {
            backgroundColor:"white", 
            color:"red",
            '&:hover': {
                    backgroundColor: "red",
                    color: 'white',
                    },
                  }
                },
        {
          props: { variant: 'buttonDTransparent' },
          style: {
            backgroundColor:"transparent", 
            color:"red",
            '&:hover': {
                    backgroundColor: "red",
                    color: 'white',
                    },
                  }
                },
        {
          props: { variant: 'noHover' },
          style: {
            '&:hover': {
              backgroundColor: "transparent",
            },
            color:"#e91e63"
                  }
                },
              ]
            },
  MuiFab : {
    variants : [
      {
        props: { variant: "fab"},
        style: {
          '&:hover': {
            backgroundColor: "#004f9d"
          },
          backgroundColor: "#004f9d",
          color: "white",
        }
      }
    ]
  },
  MuiPaper: {
    variants : [
      {
        props: { variant:"savedSearch"},
        style : {
          '&:hover': {
            cursor: 'pointer',
          },
        position:"relative",  
        backgroundColor:"rgb(220,220,220)", 
        boxShadow:"none", 
        border:"1px dashed black", 
        padding:"5px" 
        }
      }
    ]
  }, 
  }
})