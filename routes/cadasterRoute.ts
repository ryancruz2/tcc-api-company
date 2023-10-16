import { Router } from "express";
import { getAddressByCep } from "./utils/address";
import { Address, Company } from "../src/models/companiesModel";
import PhoneCompany from "../src/models/CompaniesPhones";
import { ICompany } from "../src/models/interfaces/itf_address"
import { IPhonesCompany } from "../src/models/interfaces/itf_phonesCompany"
import Phones from "../src/models/mobilesModel";
const router = Router();

router.get("/CEP", async (req, res) => {
    const cep = req.query.cep as string;
    const address = await getAddressByCep(cep)
    return typeof address === 'string' ? res.status(400).json({ error: address }) : res.send(address)
});

router.post("/Company", async (req, res) => {
    let company: ICompany = req.body as ICompany
    const addresNew = new Address(company.address);
    await addresNew.save()
        .then(doc => {
            console.log('Address saved successfully:', doc);
        })
        .catch(err => {
            console.error('Error saving document:', err);
        });
    const newDoc = new Company({ ...company, address: addresNew, nota: 0, countAvaliacoes: 1 })
    await newDoc.save()
        .then(doc => {
            console.log('Document saved successfully:', doc);
            res.send("Document saved successfully")
        })
        .catch(err => {
            console.error('Error saving document:', err);
            res.send(err)
        });
});

router.put("/Company/Avaliacao", async (req, res) => {
    const id = parseInt(req.query.id as string);
    const nota = parseInt(req.query.nota as string);
    const oldValue = await Company.findOne({ _id: id })
    const media = oldValue!.countAvaliacoes + 1;
    const sum = nota + oldValue!.nota;
    oldValue?.updateOne({ nota: sum, countAvaliacoes: media } as ICompany)
        .then(doc => {
            console.log('Document updated successfully:', doc);
        })
        .catch(err => {
            console.error('Error updated document:', err);
            res.send(err)
        });

    const result = await Company.findOne({ _id: id }, 'nota countAvaliacoes').lean();
    result!.nota = result!.countAvaliacoes <= 2 ? nota : parseFloat(result!.nota.toFixed(2)) / result!.countAvaliacoes;
    result!.nota = parseFloat(result!.nota.toFixed(1))
    return res.send(result)
});

router.get("/Company/Avaliacao", async (req, res) => {
    try {
        const result = await Company.findOne({ _id: parseInt(req.query.id as string) }, 'nota countAvaliacoes').lean();

        if (result) {
            result.nota = result.countAvaliacoes <= 2 ? result.nota : parseFloat(result.nota.toFixed(2)) / result.countAvaliacoes;
            result.countAvaliacoes = result.countAvaliacoes <= 2 ? result.countAvaliacoes - 1 : result.countAvaliacoes
            result.nota = parseFloat(result.nota.toFixed(1))
            return res.send(result)
        } else {
            console.log('Company not found');
            return res.send('Company not found')
        }
    } catch (err) {
        console.error(err);
    }
});

router.get("/Company/all", async (req, res) => res.send(await Company.find()));

router.post("/CompanyPhone", async (req, res) => {
    const params = req.body as IPhonesCompany;
    const newDoc = new PhoneCompany(params)
    await newDoc.save()
        .then(doc => {
            console.log('Document saved successfully:', doc);
            res.send("Document saved successfully")
        })
        .catch(err => {
            console.error('Error saving document:', err);
            res.send(err)
        });
});

router.get("/CompanyPhone", async (req, res) => {
    const id = parseInt(req.query.id as string);
    const phone = req.query.name as string;
    try {
        let phonesCmp: any[];
        if (phone)
            phonesCmp = await PhoneCompany.find({ idCompany: id, $text: { $search: phone } }).lean();
        else
            phonesCmp = await PhoneCompany.find({ idCompany: id }).lean();
        const listIdPhone = phonesCmp.map(x => x.idPhone);

        if (listIdPhone.length === 0) {
            return res.send([]);
        }

        const phones = await Phones.find({ _id: { $in: listIdPhone } }).lean()
        const join = phones.map(x => {
            const cmp = phonesCmp.find(y => y.idPhone === x._id)
            return {
                ...x,
                product: cmp?.product
            }
        })
        return res.send(join);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

});

export default router;