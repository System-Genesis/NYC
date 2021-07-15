import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import utils from '../src/utils/utils';

const filterData = utils.filterData;

chai.should();

chai.use(chaiHttp);

describe('filter data', () => {
  type dataTest = {
    name: string;
    phone: number;
  }[];
  const data: dataTest = [
    { name: 'a', phone: 1 },
    { name: 'ac', phone: 11 },
    { name: '3ab', phone: 2 },
    { name: 'b', phone: 12 },
    { name: 'bc', phone: 22 },
  ];

  it('name:a (includes) return array of 3', () => {
    const queryByName = { name: 'a' };

    const nameResult = filterData(data, queryByName) as dataTest;

    assert.equal(nameResult.length, 3);
    assert.equal(nameResult[0].name, 'a');
  });

  it('name:ac (specific) return array of 1', () => {
    const queryByName = { name: 'ac' };

    const nameResult = filterData(data, queryByName) as dataTest;

    assert.equal(nameResult.length, 1);
    assert.equal(nameResult[0].name, 'ac');
  });

  it('not existing name return empty array', () => {
    const queryByName = { name: 'x' };

    const nameResult = filterData(data, queryByName) as dataTest;

    assert.equal(nameResult.length, 0);
  });

  it('phone:22 return array of 1 ', () => {
    const queryByPhone = { phone: 22 };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 1);
    assert.equal(ageResult[0].phone, 22);
  });

  it('name:b & phone:22 return array of 1', () => {
    const queryByPhone = { name: 'b', phone: 22 };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 1);
    assert.equal(ageResult[0].phone, 22);
    assert.equal(ageResult[0].name, 'bc');
  });

  it('name:b (exists) & phone not exists return empty array', () => {
    const queryByPhone = { name: 'b', phone: 55 };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 0);
  });

  it('name not exists & phone:22 (exists) return empty array', () => {
    const queryByPhone = { name: 'dd', phone: 22 };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 0);
  });

  it('name:a & not existing field return empty array', () => {
    const queryByPhone = { name: 'a', qw: 22 };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 0);
  });

  it('name:a & not existing field with undefined value return empty array', () => {
    const queryByPhone = { name: 'a', qw: undefined };

    const ageResult = filterData(data, queryByPhone) as dataTest;

    assert.equal(ageResult.length, 0);
  });
});
