import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Media() {
  return (
    <Grid container wrap="nowrap" >

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />

      <Skeleton variant="rectangular" sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ width: '20vh', height: '30vh' }} />
    </Grid>
  );
}

const GalleryLoader = () => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Skeleton sx={{ marginRight: 1, my: 1, marginBottom: 1, paddingBottom: 1 }} style={{ height: '5vh' }} />
      <Media />
      <Media />
    </Box>
  );
}

export default GalleryLoader