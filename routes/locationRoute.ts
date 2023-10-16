import { Router } from "express";
import NodeGeocoder from 'node-geocoder';
import { getDistance } from 'geolib';
import { GeolibInputCoordinates } from "geolib/es/types";
import axios from "axios";

const router = Router();

const options = {
    provider: 'openstreetmap', // Escolha seu provedor de geocodificação preferido
} as NodeGeocoder.Options;

const geocoder = NodeGeocoder(options);

// Rota para calcular a distância entre dois CEPs
router.get("/Calculate", async (req, res) => {
    const cepOrigin = req.query.cepOrigin as string;
    const cepDestination = req.query.cepDestination as string;

    calculateDistanceBetweenZIPs(cepOrigin, cepDestination)
        .then((distance) => {
            if (distance !== null) {
                res.json({ distance: `${distance.toFixed(2)} km` });
            } else {
                res.status(400).json({ error: "Erro ao calcular a distância." });
            }
        });
});
async function getCoordinatesFromCEP(cep: string): Promise<string | null> {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        return `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
    } catch (error) {
        console.error(`Erro ao buscar coordenadas para o CEP ${cep}: ${error}`);
        return null;
    }
}
async function calculateDistanceBetweenZIPs(zipOrigin: string, zipDestination: string): Promise<number | null> {
    try {
        const addressO: string = (await getCoordinatesFromCEP(zipOrigin))!;
        const addressD: string = (await getCoordinatesFromCEP(zipDestination))!;
        const originRes = await geocoder.geocode(addressO);
        const destinationRes = await geocoder.geocode(addressD);

        if (originRes.length > 0 && destinationRes.length > 0) {
            const originCoordinates: { latitude: number; longitude: number } = {
                latitude: originRes[0].latitude as number,
                longitude: originRes[0].longitude as number,
            };
            const destinationCoordinates: { latitude: number; longitude: number } = {
                latitude: destinationRes[0].latitude as number,
                longitude: destinationRes[0].longitude as number,
            };

            const distance = getDistance(originCoordinates, destinationCoordinates) / 1000; // Converter metros para quilômetros
            return distance;
        } else {
            console.error("Não foi possível obter as coordenadas de um dos CEPs. Verifique os CEPs informados.");
            return null;
        }
    } catch (error) {
        console.error(`Erro ao calcular a distância: ${error}`);
        return null;
    }
}

export default router;
