import { Router } from "express";
import { getAddressByCep } from "./utils/address";
import Company from "../models/companiesModel";

const router = Router();

router.get("/CEP", async (req, res) => {
    const cep = req.query.cep as string;
    const address = await getAddressByCep(cep)
    return typeof address === 'string'? res.status(400).json({ error: address }) : res.send(address)
});

router.post("/Company",async (req, res) => {
    
});

export default router;