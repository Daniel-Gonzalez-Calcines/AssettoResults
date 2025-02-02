import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AllLapsSesion1Props {
    sesion: number;
    file: File | null;
}

function BestLapSesion1({ sesion, file }: AllLapsSesion1Props) {
    interface Player {
        name?: string;
        car?: string;
        skin?: string;
    }

    interface bestLaps {
        car: number;
        sector1?: number;
        sector2?: number;
        sector3?: number;
        time: number;
        lap: number;
        totallaps?: number;
    }

    interface resultfileinterface {
        event: number;
        name: string;
        type: number;
        lapsCount: number;
        duration: number;
        laps: any[]; // You can specify a more detailed type if you know the structure of laps
        lapstotal: number[];
        bestLaps: any[]; // You can specify a more detailed type if you know the structure of bestLaps
        raceResult: any[]
    }

    const [players, setPlayers] = useState<Player[]>([]);
    const [bestlaps, setBestLaps] = useState<bestLaps[]>([]);
    const [lapstotal, setLapsTotal] = useState<number[]>([]);
    const[resultado, setResultFile] = useState<resultfileinterface[]>([])

    useEffect(() => {
        const loadData = async () => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const jsonData = JSON.parse(event.target?.result as string);
                        const newPlayers = jsonData.players;
                        const newBestLaps = jsonData.sessions[sesion].bestLaps || [];

                        const sortedBestLaps = newBestLaps.sort((a: { time: number; }, b: { time: number; }) => a.time - b.time);

                        setResultFile(jsonData.sessions)
                        setPlayers(newPlayers);
                        setBestLaps(sortedBestLaps);
                        setLapsTotal(jsonData.sessions[sesion].lapstotal || []);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };
                reader.readAsText(file); // Read the file as text
            }
        };

        loadData();
    }, [file]);

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

    function findlapcount1(car: bestLaps) {
        if (car.car !== undefined) {
            const index = car.car;
            if (index >= 0 && index < lapstotal.length) {
                const player = lapstotal[index];
                return player ? lapstotal[index] : "Unknown";
            }
        }
        return "Unknown";
    }

    function findlap(lap: bestLaps, sector: number) {
        let foundLap = 0;
        let time = "";

        resultado.forEach((sesion: { laps: any; }) => {
            const laps = sesion.laps;

            if (laps && Array.isArray(laps)) {
                laps.forEach((currentLap) => {
                    if (
                        currentLap.time === lap.time &&
                        currentLap.car === lap.car &&
                        currentLap.lap === lap.lap
                    ) {
                        foundLap = currentLap.sectors[sector];
                    }
                });
            }
        });

        time = formatMilliseconds(foundLap);

        return time || 0;
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
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="Pilotos">
                    <TableHead sx={{ backgroundColor: "darkred" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Posición</TableCell>
                            <TableCell sx={{ color: "white" }}>Piloto</TableCell>
                            <TableCell sx={{ color: "white" }}>Coche</TableCell>
                            <TableCell sx={{ color: "white" }}>Sector 1</TableCell>
                            <TableCell sx={{ color: "white" }}>Sector 2</TableCell>
                            <TableCell sx={{ color: "white" }}>Sector 3</TableCell>
                            <TableCell sx={{ color: "white" }}>Tiempo</TableCell>
                            <TableCell sx={{ color: "white" }}>Vuelta</TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Vueltas en la sesión
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bestlaps.length > 0 ? (
                            bestlaps.map((row: bestLaps, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{finddriver(row)}</TableCell>
                                    <TableCell>{findcar(row)}</TableCell>
                                    <TableCell>{findlap(row, 0)}</TableCell>
                                    <TableCell>{findlap(row, 1)}</TableCell>
                                    <TableCell>{findlap(row, 2)}</TableCell>
                                    <TableCell>{formatMilliseconds(row.time)}</TableCell>
                                    <TableCell>{row.lap}</TableCell>
                                    <TableCell>{findlapcount1(row)}</TableCell>
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
    );
}

export default BestLapSesion1;
