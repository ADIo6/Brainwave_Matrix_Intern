



//component
import { Grid2 } from '@mui/material';
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from './post/Posts';


const Home=()=>{
    return (
        <>
        <Banner/>
        <Grid2 container spacing={2}>
                <Grid2 size={{ lg:3, sm:6, xs:12 }} >
                    <Categories />
                </Grid2>
                <Grid2 container  size={{ lg:9, sm:6, xs:12 }} >
                    <Posts />
                </Grid2>
            </Grid2>
        </>
    )
}

export default Home;



// import Grid2 from '@mui/material/Unstable_Grid2'; // Correct import for Grid2
// import Banner from "../banner/Banner";
// import Categories from "./Categories";
// import Posts from './post/Posts';

// const Home = () => {
//     return (
//         <>
//             <Banner />
//             <Grid2 container spacing={2}>
//                 <Grid2 lg={3} sm={6} xs={12}>
//                     <Categories />
//                 </Grid2>
//                 <Grid2 container lg={9} sm={6} xs={12}>
//                     <Posts />
//                 </Grid2>
//             </Grid2>
//         </>
//     );
// };

// export default Home;
