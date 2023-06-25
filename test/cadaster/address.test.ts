import { describe, it,test } from "mocha";
import assert from "assert";
import { getAddressByCep } from "../../routes/utils/address";
import { addressType } from "../../models/interfaces/itf_address";

describe("valid Address cases - getAddressByCep", () => {
  test("cep not special char",async () => {
    const addressTest: addressType = {
        address: "Rua Waldemar Neves Guerra",
        neighborhood: "Rádio Clube",
        city: "Santos",
        state: "SP",
      };
  
      const cep = "11088410";
      const address = await getAddressByCep(cep);
      assert.deepStrictEqual(address, addressTest, `method: ${address}\n comparer: ${JSON.stringify(addressTest)}`);
    });

  test("cep with special char",async () => {
    const addressTest: addressType = {
        address: "Rua Waldemar Neves Guerra",
        neighborhood: "Rádio Clube",
        city: "Santos",
        state: "SP",
      };
      const cep = "11088-410";
      const address = await getAddressByCep(cep);
      assert.deepStrictEqual(address, addressTest, `method: ${address}\n comparer: ${JSON.stringify(addressTest)}`);
    });
});


describe("invalid Address cases - getAddressByCep", () => {
  test("CEP less than 8 characters",async () => {
    const addressTest: string = "O CEP informado é inválido. O CEP deve conter exatamente 8 caracteres"
    const cep = "1108841";
    const address = await getAddressByCep(cep);
    assert.deepStrictEqual(address, addressTest, `method: ${address}\n comparer: ${JSON.stringify(addressTest)}`);
  });

  test("CEP greater than 8 characters",async () => {
    const addressTest: string = "O CEP informado é inválido. O CEP deve conter exatamente 8 caracteres"
    const cep = "1108841123";
    const address = await getAddressByCep(cep);
    assert.deepStrictEqual(address, addressTest, `method: ${address}\n comparer: ${JSON.stringify(addressTest)}`);
  });
  
  test("CEP not found",async () => {
    const addressTest: string = "Desculpe, mas o CEP informado não foi encontrado."
    const cep = "11088411";
    const address = await getAddressByCep(cep);
    assert.deepStrictEqual(address, addressTest, `method: ${address}\n comparer: ${JSON.stringify(addressTest)}`);
  });  

});