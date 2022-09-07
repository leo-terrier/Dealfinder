export const stripArrondissement = (str) => {
  if(str.includes("Arrondissement")){
    const arr = str.split(' ')
     arr.splice(arr.length - 2, 2)
     return arr[0]
  }else{
    return str
  }
}