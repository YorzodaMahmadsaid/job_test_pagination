import React from 'react'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PreviewModal from './PreviewModal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import LoadingButton from '@mui/lab/LoadingButton';


const sortTags = [
    {id: 1, name: 'AlbomId1'},
    {id: 2, name: 'AlbomId2'},
    {id: 3, name: 'AlbomId3'},
    {id: 4, name: 'AlbomId4'},
    {id: 5, name: 'AlbomId5'},
    {id: 6, name: 'AlbomId6'},
    {id: 7, name: 'AlbomId7'},
    {id: 8, name: 'AlbomId8'},
    {id: 9, name: 'AlbomId9'},
    {id: 10, name: 'AlbomId10'},
]

export default function App() {
    const theme = createTheme();
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [activeCard, setActiveCard] = useState()
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    
     useEffect(() => {
        setLoading(true);
        const apiUrl = `https://jsonplaceholder.typicode.com/photos?albumId=${currentPage}`;
        // const apiUrl = `http://jsonplaceholder.typicode.com/photos`;
        axios.get(apiUrl)
            .then((resp) => {
                setLoading(false)
                const allAlboms = resp.data;
                setCards(allAlboms);  
        });
    }, [currentPage]);
          
    const handlePreview = (card) => {
        setActiveCard(card)
        setOpenModal(true)
    }

    const handleResetPreview = () => {
        setOpenModal(false)
    }

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(resp => {
            let newCards = [...cards]

            let index = newCards.findIndex((item) => item.id === id)

            if (index > -1) {
                newCards.splice(index, 1)
                setCards(newCards)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleChangePage = (event, page) => {
        setCurrentPage(page)
    }

    return (
        <div>
             <React.StrictMode>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Some text
                    </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container sx={{ py: 8 }} maxWidth="md">
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth style={{marginBottom: '20px'}}>
                            <InputLabel id="demo-simple-select-label">Select AlbomId</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Select AlbomId"
                                onChange={(e) => {
                                    handleChangePage(e, e.target.value)
                                }}
                            >
                                {
                                    sortTags.map(item => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    {loading ? <p>Loading...</p> : 
                    <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                    // 16:9
                                    pt: '0',
                                    }}
                                    image={card.url}
                                    alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography>
                                        {card.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handlePreview(card)}>View</Button>
                                    <Button 
                                        size="small" 
                                        onClick={() => 
                                        handleDelete(card.id)}
                                    >Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    }
                    <Stack spacing={2} style={{paddingTop: '20px'}}>
                        <Pagination count={10} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" />
                    </Stack>
                    </Container>
                    {activeCard && <PreviewModal card={activeCard} open={openModal} handleClose={handleResetPreview} />}
                </main>
                </ThemeProvider>
            </React.StrictMode>
        </div>
    )
}
