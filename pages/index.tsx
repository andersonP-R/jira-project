import type { NextPage } from "next";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            {/* agregar una nueva entrada */}
            {/* listado de entradas */}
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        {/*  */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En Progreso" />
            <CardContent>
              {/* agregar una nueva entrada */}
              {/* listado de entradas */}

              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        {/*  */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Completadas" />
            <CardContent>
              {/* agregar una nueva entrada */}
              {/* listado de entradas */}
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
