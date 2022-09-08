export const containerStyle = {
  flexDirection:"column",  
  textAlign: "center", 
  height: {
    xs:'41vh', 
    xl:700}, 
  minWidth: {
    xs:'100%', 
    xl:'700px'}, /////ALT
  overflow:"auto", 
  padding: {
    xl: "0 20px 0 40px"
    }, 
  "& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator": {
    display: "none"
  }, 
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer"},
  '& .MuiDataGrid-root .MuiDataGrid-cell:focus':  {
    outline: 'none',
  },      
}
