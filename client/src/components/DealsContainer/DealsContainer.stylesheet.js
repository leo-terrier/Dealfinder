export const containerStyle = {
  flexDirection:"column",  
  textAlign: "center", 
  height: {
    xs:'41vh', 
    lg:700}, 
  minWidth: {
    xs:'100%', 
    lg:'700px'}, 
  overflow:"auto", 
  padding: {
    lg: "0 20px 0 40px"
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
