import "./App.css";
import Typography from "@mui/material/Typography";
import PlayersList from "../components/PlayersList";
import BestLapSesion1 from "../components/BestLapsSesion1";
import AllLapsSesion1 from "../components/AllLapsSesion1";
import RaceResultsSesion1 from "../components/RaceResultsSesion1";
import { useEffect, useState } from "react";
import { Button, Grid2 } from "@mui/material";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  interface resultfileinterface {
    event: number;
    name: string;
    type: number;
    lapsCount: number;
    duration: number;
    laps: any[];
    lapstotal: number[];
    bestLaps: any[];
    raceResult: any[];
  }

  useEffect(() => {
    const loadData = async () => {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target?.result as string);
            setResultFile(jsonData.sessions);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(selectedFile); // Read the file as text
      }
    };

    loadData();
  }, [selectedFile]);

  const [resultado, setResultFile] = useState<resultfileinterface[]>([]);

  const [showplayers, setShowPlayers] = useState(true);
  const [showsesion1bestlaps, setShowSesion1BestLaps] = useState(false);
  const [showalllapssesion1, setAllLapsSesion1] = useState(false);
  const [showresultssesion1, setResultssesion1] = useState(false);

  const [showsesion2bestlaps, setShowSesion2BestLaps] = useState(false);
  const [showalllapssesion2, setAllLapsSesion2] = useState(false);
  const [showresultssesion2, setResultssesion2] = useState(false);

  const [showsesion3bestlaps, setShowSesion3BestLaps] = useState(false);
  const [showalllapssesion3, setAllLapsSesion3] = useState(false);
  const [showresultssesion3, setResultssesion3] = useState(false);

  function allfalse() {
    setShowPlayers(false);
    setAllLapsSesion1(false);
    setShowSesion1BestLaps(false);
    setResultssesion1(false);

    setAllLapsSesion2(false);
    setShowSesion2BestLaps(false);
    setResultssesion2(false);

    setAllLapsSesion3(false);
    setShowSesion3BestLaps(false);
    setResultssesion3(false);
  }

  function showplayerlist() {
    allfalse();
    setShowPlayers(true);
  }

  function showresultssesion1list() {
    allfalse();
    setResultssesion1(true);
  }

  function showalllapssesion1list() {
    allfalse();
    setAllLapsSesion1(true);
  }

  function showsesion1bestlapslist() {
    allfalse();
    setShowSesion1BestLaps(true);
  }

  function showresultssesion2list() {
    allfalse();
    setResultssesion2(true);
  }

  function showalllapssesion2list() {
    allfalse();
    setAllLapsSesion2(true);
  }

  function showsesion2bestlapslist() {
    allfalse();
    setShowSesion2BestLaps(true);
  }

  function showresultssesion3list() {
    allfalse();
    setResultssesion3(true);
  }

  function showalllapssesion3list() {
    allfalse();
    setAllLapsSesion3(true);
  }

  function showsesion3bestlapslist() {
    allfalse();
    setShowSesion3BestLaps(true);
  }

  return (
    <div>
      <Grid2 container spacing={2} rowSpacing={1}>
        <Grid2 size={12}>
          <Typography variant="h2">Lector de archivo de resultado de Assetto Corsa</Typography>
        </Grid2>
        <Grid2 size={12}>
          <input type="file" accept=".json" onChange={handleFileChange} />
          {selectedFile && (
            <div>
              <h3>Selected File:</h3>
              <p>{selectedFile.name}</p>
            </div>
          )}
        </Grid2>
        <Grid2 size={3}>
          <Button
            onClick={showplayerlist}
            sx={{
              backgroundColor: "darkred",
              color: "white",
              "&:hover": {
                color: "black",
              },
              padding: "1rem 2rem",
              width: "100%",
            }}
          >
            Lista de jugadores
          </Button>
        </Grid2>

        {resultado[0] ? (
          <>
            <Grid2 size={3}>
              <Button
                onClick={showalllapssesion1list}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                Todas las vueltas de {resultado[0].name}
              </Button>
            </Grid2>

            <Grid2 size={3}>
              <Button
                onClick={showsesion1bestlapslist}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                {resultado[0].raceResult
                  ? `Mejores vueltas de ${resultado[0].name}`
                  : `Resultado de ${resultado[0].name}`}
              </Button>
            </Grid2>

            {resultado[0].raceResult ? (
              <Grid2 size={3}>
                <Button
                  onClick={showresultssesion1list}
                  sx={{
                    backgroundColor: "darkred",
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                    padding: "1rem 2rem",
                    width: "100%",
                  }}
                >
                  Resultado de {resultado[0].name}
                </Button>
              </Grid2>
            ) : null}
          </>
        ) : null}

        {resultado[1] ? (
          <>
            <Grid2 size={3}>
              <Button
                onClick={showalllapssesion2list}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                Todas las vueltas de {resultado[1].name}
              </Button>
            </Grid2>

            <Grid2 size={3}>
              <Button
                onClick={showsesion2bestlapslist}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                {resultado[1].raceResult
                  ? `Mejores vueltas de ${resultado[1].name}`
                  : `Resultado de ${resultado[1].name}`}
              </Button>
            </Grid2>

            {resultado[1].raceResult ? (
              <Grid2 size={3}>
                <Button
                  onClick={showresultssesion2list}
                  sx={{
                    backgroundColor: "darkred",
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                    padding: "1rem 2rem",
                    width: "100%",
                  }}
                >
                  Resultado de {resultado[1].name}
                </Button>
              </Grid2>
            ) : null}
          </>
        ) : null}

        {resultado[2] ? (
          <>
            <Grid2 size={3}>
              <Button
                onClick={showalllapssesion3list}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                Todas las vueltas de {resultado[2].name}
              </Button>
            </Grid2>

            <Grid2 size={3}>
              <Button
                onClick={showsesion3bestlapslist}
                sx={{
                  backgroundColor: "darkred",
                  color: "white",
                  "&:hover": {
                    color: "black",
                  },
                  padding: "1rem 2rem",
                  width: "100%",
                }}
              >
                {resultado[2].raceResult
                  ? `Mejores vueltas de ${resultado[2].name}`
                  : `Resultado de ${resultado[2].name}`}
              </Button>
            </Grid2>

            {resultado[2].raceResult ? (
              <Grid2 size={3}>
                <Button
                  onClick={showresultssesion3list}
                  sx={{
                    backgroundColor: "darkred",
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                    padding: "1rem 2rem",
                    width: "100%",
                  }}
                >
                  Resultado de {resultado[2].name}
                </Button>
              </Grid2>
            ) : null}
          </>
        ) : null}

        {showplayers ? (
          <Grid2 size={12}>
            <PlayersList file={selectedFile} />
          </Grid2>
        ) : null}
        {showalllapssesion1 ? (
          <Grid2 size={12}>
            <AllLapsSesion1 sesion={0} file={selectedFile} />
          </Grid2>
        ) : null}
        {showsesion1bestlaps ? (
          <Grid2 size={12}>
            <BestLapSesion1 sesion={0} file={selectedFile} />
          </Grid2>
        ) : null}
        {showresultssesion1 ? (
          <Grid2 size={12}>
            <RaceResultsSesion1 sesion={0} file={selectedFile} />
          </Grid2>
        ) : null}

        {showalllapssesion2 ? (
          <Grid2 size={12}>
            <AllLapsSesion1 sesion={1} file={selectedFile} />
          </Grid2>
        ) : null}
        {showsesion2bestlaps ? (
          <Grid2 size={12}>
            <BestLapSesion1 sesion={1} file={selectedFile} />
          </Grid2>
        ) : null}
        {showresultssesion2 ? (
          <Grid2 size={12}>
            <RaceResultsSesion1 sesion={1} file={selectedFile} />
          </Grid2>
        ) : null}

        {showalllapssesion3 ? (
          <Grid2 size={12}>
            <AllLapsSesion1 sesion={2} file={selectedFile} />
          </Grid2>
        ) : null}
        {showsesion3bestlaps ? (
          <Grid2 size={12}>
            <BestLapSesion1 sesion={2} file={selectedFile} />
          </Grid2>
        ) : null}
        {showresultssesion3 ? (
          <Grid2 size={12}>
            <RaceResultsSesion1 sesion={2} file={selectedFile} />
          </Grid2>
        ) : null}
      </Grid2>
    </div>
  );
}

export default App;
