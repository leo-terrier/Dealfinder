import { Box, Grid, Typography } from "@mui/material";
import { SavedSearch } from "../SavedSearch/SavedSearch.js";

import { savedSearchesStyleSheet } from "./SavedSearches.stylesheet.js";

const { box, typography, gridItem } = savedSearchesStyleSheet;

export const SavedSearches = ({
  savedSearches,
  removeSearch,
  clickSavedSearch,
}) => {
  return (
    <Box sx={box}>
      <Typography variant="h6" component="h4" sx={typography}>
        SAVED SEARCHES
      </Typography>
      <Grid container>
        {savedSearches.map((savedSearch) => {
          return (
            <Grid item xs={12} md={6} sx={gridItem} key={savedSearch.search_id}>
              <SavedSearch
                savedSearch={savedSearch}
                removeSearch={removeSearch}
                clickSavedSearch={clickSavedSearch}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
