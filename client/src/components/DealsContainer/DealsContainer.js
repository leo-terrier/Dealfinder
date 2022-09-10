import { Box, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { capitalizeFirstLetter, formatPrice } from "../../util/helper";
import { containerStyle } from "./DealsContainer.stylesheet.js";

export const DealsContainer = ({addDeal, deals, removeDeal, savedDeals, greaterThanXl, setDealOnMap, isLoadingResults}) => {

  const columns = [{
    field: 'address',
    headerName: 'Address',
    headerAlign: "center",
    flex:1.7,
    align: "center"
  }, {
    field: 'price',
    headerName: 'Price (€)',
    type: "number",
    flex:1,
    headerAlign: "center",
    align: "center",
    sortComparator: (a, b) => Number(a.replace(/\s/g, "")) - Number(b.replace(/\s/g, ""))
  }, {
    field: 'surface',
    headerName: 'Surface (m²)',
    type: 'number',
    flex:1,
    headerAlign: "center",
    align: "center"
  }, {
    field: 'nbOfRoom',
    headerName: 'Rooms',
    type: 'number',
    flex:1,
    headerAlign: "center",
    align: "center"
  }, {
    field: 'date',
    headerName: 'Deal date',
    type: 'date',
    flex:1,
    align: greaterThanXl ? "right" : "center",
    headerAlign: "center",
    sortComparator: (a, b) => new Date(a) - new Date(b)
  }, {
    field: "action", 
    headerName: "", 
    flex:1,
    sortable: false, 
    headerAlign:"center", 
    align:"center",
    renderCell: (params) => {
      const notAdded = savedDeals.findIndex(savedDeal => savedDeal.deal_id ===params.row.id) === -1
      const onClick = (e) => {
        e.stopPropagation(); 
        const deal = deals.find(deal => deal.deal_id === params.row.id);
        notAdded ? addDeal(deal) : removeDeal(deal)
      }
      return (<Button variant={notAdded ? "buttonA" : "buttonDTransparent"} onClick={onClick} sx={{backgroundColor: notAdded && "transparent"}}>{notAdded ? "save" : "remove"}</Button>);
      }
    }
  ];
 
  const rows = deals.map(deal => ({
    id: deal.deal_id,
    address: deal.streetNumber + ' ' + capitalizeFirstLetter(deal.streetName),
    price: formatPrice(deal.price).replace('€', ''),
    surface: deal.surface,
    nbOfRoom: deal.nbOfRoom,
    date: deal.date,
  }))
  
  if (!isLoadingResults){
    return(
      <Box sx={containerStyle}>   
        <DataGrid
          rows={rows}
          columns={columns}
          onSelectionModelChange={(itm)=>{
            try {
              setDealOnMap(deals[deals.findIndex(deal => deal.deal_id === itm[0])].deal_id)
            }catch(e){
              console.log('Error datagrid =>')
              console.log(e)
              return
            }
          }}
          disableMultipleSelection={true}
          headerHeight={42}
          />
      </Box>

      )
  }
}

