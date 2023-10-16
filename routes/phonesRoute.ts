import { Router, Response } from "express";
import Phones from "../src/models/mobilesModel";
import { IParamsPhone, IPhones } from "../src/models/interfaces/itf_phones";

const router = Router();

router.get("/phones", async (req, res)=> {
    const search = req.query.search as string
    const limit = parseInt(req.query.limit as string)
    if(search)
        return res.send(await Phones.find({$text: {$search: search}}).limit(5));
    else
        return res.send(await Phones.find().limit(limit > 0? limit : 5));
});

router.get("/phones/all", async (req, res)=>  res.send(await Phones.find()));

router.post("/phones", async (req, res) => {
    try{
        const phones = req.body as ReadonlyArray<IPhones>;
        await Phones.insertMany(phones)
        return res.send("inserido com sucesso!");
    } catch(error){
        return res.send(error)
    }
    
})

export default router;