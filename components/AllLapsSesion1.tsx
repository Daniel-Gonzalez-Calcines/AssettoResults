import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid2,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AllLapsSesion1Props {
    sesion: number;
    file: File | null;
}

function AllLapsSesion1({ sesion, file }: AllLapsSesion1Props) {
    interface Player {
        name?: string;
        car?: string;
        skin?: string;
    }

    interface bestLaps {
        car: number;
        sectors: number[];
        time: number;
        lap: number;
        totallaps?: number;
    }

    interface lap {
        times: number[];
    }

    const [showall, setShowAll] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [laps, setLaps] = useState<bestLaps[]>([]);
    const [bestlapslist, setBestLapsList] = useState<number>(0);
    const [bestsectorslist, setBestSectorsList] = useState<number[]>([]);
    const [currentbestlap] = useState<lap[]>([]);
    const [personalbestlap] = useState<lap[]>([]);

    let currentbestlapupdate = [...currentbestlap];
    let personalbestsectorsupdate = [...personalbestlap];

    useEffect(() => {
        const loadData = async () => {
            if (file) {
                const reader = new FileReader();
                return new Promise<void>((resolve, reject) => {
                    reader.onload = (event) => {
                        try {
                            const jsonData = JSON.parse(event.target?.result as string);
                            const newPlayers = jsonData.players;
                            const newLaps = jsonData.sessions[sesion].laps || [];
                            const newBestLaps = jsonData.sessions[sesion].bestLaps || [];
                            const sortedBestLaps = newBestLaps.sort(
                                (a: { time: number }, b: { time: number }) => a.time - b.time
                            );
                            const sortedSector1 = newLaps.sort(
                                (a: { sectors: number[] }, b: { sectors: number[] }) =>
                                    a.sectors[0] - b.sectors[0]
                            );
                            const sortedSectors = [...bestsectorslist];
                            sortedSectors[0] = sortedSector1[0].sectors[0];
                            const sortedSector2 = newLaps.sort(
                                (a: { sectors: number[] }, b: { sectors: number[] }) =>
                                    a.sectors[1] - b.sectors[1]
                            );
                            sortedSectors[1] = sortedSector2[0].sectors[1];
                            const sortedSector3 = newLaps.sort(
                                (a: { sectors: number[] }, b: { sectors: number[] }) =>
                                    a.sectors[2] - b.sectors[2]
                            );
                            sortedSectors[2] = sortedSector3[0].sectors[2];
                            const sortedsectorsback = newLaps.sort(
                                (
                                    a: { car: number; lap: number },
                                    b: { car: number; lap: number }
                                ) => {
                                    if (a.car !== b.car) {
                                        return a.car - b.car;
                                    }
                                    return a.lap - b.lap;
                                }
                            );

                            setBestSectorsList(sortedSectors);
                            setBestLapsList(sortedBestLaps[0].time);
                            setPlayers(newPlayers);
                            setLaps(sortedsectorsback);
                            resolve(); // Resolve the promise when data is loaded
                        } catch (error) {
                            console.error("Error parsing JSON:", error);
                            reject(error); // Reject the promise on error
                        }
                    };
                    reader.onerror = (error) => {
                        console.error("Error reading file:", error);
                        reject(error); // Reject the promise on file read error
                    };
                    reader.readAsText(file); // Read the file as text
                });
            }
        };

        const loadDataAndBestLaps = async () => {
            try {
                await loadData(); // Wait for loadData to finish
                setShowAll(true);
            } catch (error) {
                console.error("Error during loading data or best laps:", error);
            }
        };

        loadDataAndBestLaps(); // Call the combined function
    }, [file]);

    function selectcolor(tiempos: bestLaps, car: number) {
        if (tiempos.time === bestlapslist) {
            if (currentbestlapupdate[car] === undefined) {
                currentbestlapupdate[car] = { times: [] };
            }
            currentbestlapupdate[car].times[0] = tiempos.sectors[0];
            currentbestlapupdate[car].times[1] = tiempos.sectors[1];
            currentbestlapupdate[car].times[2] = tiempos.sectors[2];
            currentbestlapupdate[car].times[3] = tiempos.time;
            return "purple";
        } else if (
            currentbestlapupdate[car] === undefined ||
            currentbestlapupdate[car].times[3] === undefined ||
            tiempos.time <= currentbestlapupdate[car].times[3]
        ) {
            if (currentbestlapupdate[car] === undefined) {
                currentbestlapupdate[car] = { times: [] };
            }
            currentbestlapupdate[car].times[0] = tiempos.sectors[0];
            currentbestlapupdate[car].times[1] = tiempos.sectors[1];
            currentbestlapupdate[car].times[2] = tiempos.sectors[2];
            currentbestlapupdate[car].times[3] = tiempos.time;
            return "green";
        } else {
            return "orange";
        }
    }

    function selectcolorsector(sector: number, time: number, car: number) {
        if (time === bestsectorslist[sector]) {
            return "purple";
        } else if (
            personalbestsectorsupdate[car] === undefined ||
            personalbestsectorsupdate[car].times[sector] === undefined ||
            time <= personalbestsectorsupdate[car].times[sector]
        ) {
            if (personalbestsectorsupdate[car] === undefined) {
                personalbestsectorsupdate[car] = { times: [] };
            }
            personalbestsectorsupdate[car].times[sector] = time;
            return "blue";
        } else if (
            currentbestlapupdate[car] === undefined ||
            currentbestlapupdate[car].times[sector] === undefined ||
            time <= currentbestlapupdate[car].times[sector]
        ) {
            return "green";
        } else {
            return "orange";
        }
    }

    function finddriver(car: bestLaps) {
        if (car.car !== undefined) {
            const index = car.car;
            if (index >= 0 && index < players.length) {
                const player = players[index];
                return player ? player.name : "Unknown";
            }
        }
        return "Unknown";
    }

    function findcar(car: bestLaps) {
        if (car.car !== undefined) {
            const index = car.car;
            if (index >= 0 && index < players.length) {
                const player = players[index];
                return player ? player.car : "Unknown";
            }
        }
        return "Unknown";
    }

    function formatMilliseconds(ms: number): string {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
        } else if (minutes > 0) {
            return `${minutes}:${String(seconds).padStart(2, "0")}.${String(
                milliseconds
            ).padStart(3, "0")}`;
        } else {
            return `${seconds}.${String(milliseconds).padStart(3, "0")}`;
        }
    }

    return (
        <>
            {showall ? (
                <Grid2 container spacing={2} rowSpacing={1}>
                    <Grid2 size={12}>
                        <Typography>
                            <span style={{ color: 'purple', fontWeight: 'bold' }}>Mejor sector/vuelta general</span><br />
                            <span style={{ color: 'blue', fontWeight: 'bold' }}>Mejor sector personal actual</span><br />
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Mejor sector que en mejor vuelta personal</span><br />
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Mejor vuelta personal</span><br />
                            <span style={{ color: 'orange', fontWeight: 'bold' }}>No mejora mejor sector/vuelta actual</span>
                        </Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                            <Table sx={{ minWidth: 650 }} aria-label="Pilotos">
                                <TableHead sx={{ backgroundColor: "darkred" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "white" }}>Piloto</TableCell>
                                        <TableCell sx={{ color: "white" }}>Coche</TableCell>
                                        <TableCell sx={{ color: "white" }}>Sector 1</TableCell>
                                        <TableCell sx={{ color: "white" }}>Sector 2</TableCell>
                                        <TableCell sx={{ color: "white" }}>Sector 3</TableCell>
                                        <TableCell sx={{ color: "white" }}>Tiempo</TableCell>
                                        <TableCell sx={{ color: "white" }}>Vuelta</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {laps.length > 0 ? (
                                        laps.map((row: bestLaps, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{finddriver(row)}</TableCell>
                                                <TableCell>{findcar(row)}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        color: selectcolorsector(
                                                            0,
                                                            row.sectors[0],
                                                            row.car
                                                        ),
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {formatMilliseconds(row.sectors[0])}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        color: selectcolorsector(
                                                            1,
                                                            row.sectors[1],
                                                            row.car
                                                        ),
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {formatMilliseconds(row.sectors[1])}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        color: selectcolorsector(
                                                            2,
                                                            row.sectors[2],
                                                            row.car
                                                        ),
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {formatMilliseconds(row.sectors[2])}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        color: selectcolor(row, row.car),
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {formatMilliseconds(row.time)}
                                                </TableCell>
                                                <TableCell>{row.lap + 1}</TableCell>
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
                    </Grid2>
                </Grid2>
            ) : (
                <Typography variant="h1">Cargando datos</Typography>
            )}
        </>
    );
}

export default AllLapsSesion1;
