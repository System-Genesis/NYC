import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import utils, { createCheckDigit } from "../src/utils/utils";
chai.should();

chai.use(chaiHttp);

describe("utils", () => {
  describe("createCheckDigit", () => {
    it("20702656 => 8", () => {
      const digit = createCheckDigit(20702656);

      assert.equal(digit, 8);
    });

    it("34613114 => 7", () => {
      const digit = createCheckDigit(34613114);

      assert.equal(digit, 7);
    });
  });

  describe("randomElement", () => {
    it("[] => undefined", () => {
      const res = utils.randomElement([]);

      assert.equal(res, undefined);
    });

    it("[1] => 1", () => {
      const res = utils.randomElement([1]);

      assert.equal(res, 1);
    });

    it("[1,11] => number", () => {
      const res = utils.randomElement([1, 11]);

      assert.isNumber(res);
    });
  });

  describe("randomArrFromArr", () => {
    it("[] => []", () => {
      const res = utils.randomArrFromArr([]);

      assert.deepEqual(res, []);
    });

    it("[[1]] => [[1]]", () => {
      const res = utils.randomArrFromArr([[1]]);

      assert.deepEqual(res, [[1]]);
    });

    it("[[1,12],[11,14],[3,5]] => array of array", () => {
      const res = utils.randomArrFromArr([
        [1, 12],
        [11, 14],
        [3, 5],
      ]);

      assert.equal(res[0].length, 2);
      assert.isArray(res);
      assert.isAtMost(res.length, 3);
      assert.isAtLeast(res.length, 1);
    });
  });
});
