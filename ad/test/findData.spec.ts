import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import utils from "../src/utils/utils";

const findInData = utils.findInData;

chai.should();

chai.use(chaiHttp);

describe("find data", () => {
  type dataTest = {
    name: string;
    phone: string;
  };
  const data: dataTest[] = [
    { name: "a", phone: "1" },
    { name: "ac", phone: "11" },
    { name: "gac", phone: "11" },
    { name: "3ab", phone: "2" },
    { name: "b", phone: "12" },
    { name: "bc", phone: "22" },
    { name: "gac", phone: "101" },
  ];

  it("name:ac return  { name: ac, phone: 11 }", () => {
    const queryByName = { name: "ac" };

    const nameResult = findInData(data, queryByName) as dataTest;

    assert.equal(nameResult.name, "ac");
  });

  it("name:c (not exact) return  { name: ac, phone: 11 }", () => {
    const queryByName = { name: "c" };

    const nameResult = findInData(data, queryByName, false) as dataTest;

    assert.equal(nameResult.name, "ac");
  });

  it("name:gac phone:10 (not exact) return  { name: gac, phone: 101 }", () => {
    const queryByName = { name: "gac", phone: 10 };

    const nameResult = findInData(data, queryByName, false) as dataTest;

    assert.equal(nameResult.name, "gac");
    assert.equal(nameResult.phone, "101");
  });

  it("name:gac return (first) { name:gac, phone: 11 }", () => {
    const queryByName = { name: "gac" };

    const nameResult = findInData(data, queryByName) as dataTest;

    assert.equal(nameResult.name, "gac");
    assert.equal(nameResult.phone, "11");
  });

  it("not existing name return undefined", () => {
    const queryByName = { name: "x" };

    const nameResult = findInData(data, queryByName) as dataTest;

    assert.isUndefined(nameResult);
  });

  it("phone:22 return { name: b, phone: 22 }", () => {
    const queryByPhone = { phone: "22" };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.phone, "22");
    assert.equal(ageResult.name, "bc");
  });

  it("name:bc & phone:22 return { name: b, phone: 22 }", () => {
    const queryByPhone = { name: "bc", phone: "22" };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.phone, "22");
    assert.equal(ageResult.name, "bc");
  });

  it("name:b (exists) & phone not exists return undefined", () => {
    const queryByPhone = { name: "b", phone: 55 };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.isUndefined(ageResult);
  });

  it("name not exists & phone:22 (exists) return undefined", () => {
    const queryByPhone = { name: "dd", phone: 22 };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.isUndefined(ageResult);
  });

  it("name:a & not existing field return undefined", () => {
    const queryByPhone = { name: "a", qw: 22 };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.isUndefined(ageResult);
  });

  it("name:a & not existing field with undefined value return undefined", () => {
    const queryByPhone = { name: "a", qw: undefined };

    const ageResult = findInData(data, queryByPhone) as dataTest;

    assert.isUndefined(ageResult);
  });
});
