import { LngLat } from "maplibre-gl";
import { useState } from "react";
import { GetCabsRespose } from "../models/GetCabs.model";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CabSelection(props: any){
    const [cabsList, setCabsList] = useState<GetCabsRespose>();


    return (
        <div>
             <Card>
                <CardContent>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Ola</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component="div">
                                <ul>
                                    {cabsList && Object.entries(cabsList).map(([key, value]) => (
                                        <li key={key}>{key}: {value}</li>
                                    ))}
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}