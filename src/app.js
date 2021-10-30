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

export default function App() {

    const [appState, setAppState] = useState();
    
     useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
        axios.get(apiUrl)
            .then((resp) => {
                const allAlboms = resp.data;
                setAppState(allAlboms);  
        });
      }, [setAppState]);
      
    const cards = appState;
    const theme = createTheme();

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
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                            <CardMedia
                                component="img"
                                sx={{
                                // 16:9
                                pt: '0',
                                }}
                                image="https://source.unsplash.com/random"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography>
                                    fffff
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Delete</Button>
                            </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    <Stack spacing={2} style={{paddingTop: '20px'}}>
                        <Pagination count={10} variant="outlined" shape="rounded" />
                    </Stack>
                    </Container>
                </main>
                </ThemeProvider>
            </React.StrictMode>
        </div>
    )
}
