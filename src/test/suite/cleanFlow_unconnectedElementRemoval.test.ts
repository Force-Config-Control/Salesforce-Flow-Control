import "mocha";
import * as assert from "assert";
import Flow = require("../../main/Models/Flow");
import {CleanFlow} from "../../main/libs/CleanFlow";
import mainwithaddvars = require("./testfiles/mainwithloosenodes.json");

describe("When there are any unconnected nodes",async function () {
    let mainFlow;

    before("",  async function () {

        // ARRANGE
        mainFlow = new Flow({
            label: 'main',
            path: 'anypath',
            xmldata : mainwithaddvars,
            detail: 'anypath'
        });
    });
    it("They should be removed from the new flow result", async function () {

        // ACT
        let result = new CleanFlow().execute(mainFlow);

        // ASSERT
        assert.strictEqual(result.flowElements.length,6);
        assert.strictEqual(result.flowVariables.length,3);
        assert.strictEqual(result.unusedVariables.length,1);
    });
});