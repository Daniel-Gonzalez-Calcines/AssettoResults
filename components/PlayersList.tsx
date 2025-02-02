import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
//import resultado from '../Carrera.json';
//import resultado from "../Carrera2.json";
import { useEffect, useState } from 'react'

interface Props {
    file: File | null;
}

function PlayerList({ file }: Props) {

    useEffect(() => {
        const loadData = async () => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const jsonData = JSON.parse(event.target?.result as string);
                        setPlayers(jsonData.players);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };
                reader.readAsText(file);
            }
        };

        loadData();
    }, [file]);

    interface Player {
        name?: string;
        car?: string;
        skin?: string;
    }

    const [players, setPlayers] = useState<Player[]>([]);

    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="Pilotos">
                    <TableHead sx={{ backgroundColor: "darkred" }}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                            <TableCell sx={{ color: "white" }}>Coche</TableCell>
                            <TableCell sx={{ color: "white" }}>Skin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.length > 0 ? (
                            players.map((row: Player, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.car}</TableCell>
                                    <TableCell>{row.skin}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No hay datos disponibles.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PlayerList;