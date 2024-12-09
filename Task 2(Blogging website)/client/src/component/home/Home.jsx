



//component
import { Grid2 } from '@mui/material';
import Banner from "../banner/Banner";
import Categories from "./Categories";

const Home=()=>{
    return (
        <>
        <Banner/>
        <Grid2 container spacing={2}>
                <Grid2 size={{ lg:3, sm:6, xs:12 }} >
                    <Categories />
                </Grid2>
                <Grid2 container  size={{ lg:9, sm:6, xs:12 }} >
                    Postss
                </Grid2>
            </Grid2>
        </>
    )
}

export default Home;