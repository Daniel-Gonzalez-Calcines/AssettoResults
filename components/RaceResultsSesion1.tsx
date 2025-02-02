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

function RaceResultsSesion1({ sesion, file }: AllLapsSesion1Props) {
    interface Player {
        name?: string;
        car?: string;
        skin?: string;
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
    const [raceresults, setRaceResults] = useState<number[]>([]);

    useEffect(() => {
        const loadData = async () => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const jsonData = JSON.parse(event.target?.result as string);
                        const newPlayers = jsonData.players;

                        setResultFile(jsonData.sessions)
                        setRaceResults(jsonData.sessions[sesion].raceResult || []);
                        setPlayers(newPlayers);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
                };
                reader.readAsText(file); // Read the file as text
            }
        };

        loadData();
    }, [file]);

    const[resultado, setResultFile] = useState<resultfileinterface[]>([])

    function finddriver(car: number) {
        if (car !== undefined) {
            const index = car;
            if (index >= 0 && index < players.length) {
                const player = players[index];
                return player ? player.name : "Unknown";
            }
        }
        return "Unknown";
    }

    function findcar(car: number) {
        if (car !== undefined) {
            const index = car;
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

    function addalllapstime(car: number) {
        let totaltime = 0;
        for (let i = 0; i < resultado[sesion].laps.length; i++) {
            if (resultado[sesion].laps[i].car === car) {
                totaltime += resultado[sesion].laps[i].time;
            }
        }
        return formatMilliseconds(totaltime);
    }

    function findlapcompleted(car: number) {
        let lapscompleted = 0;
        for (let i = 0; i < resultado[sesion].laps.length; i++) {
            if (resultado[sesion].laps[i].car === car) {
                lapscompleted++;
            }
        }
        return lapscompleted;
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
                            <TableCell sx={{ color: "white" }}>Tiempo Total</TableCell>
                            <TableCell sx={{ color: "white" }}>Vueltas completadas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {raceresults.length > 0 ? (
                            raceresults.map((position: number, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{finddriver(position)}</TableCell>
                                    <TableCell>{findcar(position)}</TableCell>
                                    <TableCell>{addalllapstime(position)}</TableCell>
                                    <TableCell>{findlapcompleted(position)}</TableCell>
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

export default RaceResultsSesion1;
