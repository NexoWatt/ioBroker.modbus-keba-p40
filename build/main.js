"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModbusAdapter = void 0;
const modbus_1 = __importStar(require("@iobroker/modbus"));
const node_fs_1 = require("node:fs");
const adapterName = JSON.parse((0, node_fs_1.readFileSync)(`${__dirname}/../io-package.json`, 'utf8')).common.name;
class ModbusAdapter extends modbus_1.default {
    constructor(adapterOptions = {}) {
        const holdingRegs = (0, modbus_1.tsv2registers)('holdingRegs', `${__dirname}/../data/holding-registers.tsv`);
        const inputRegs = (0, modbus_1.tsv2registers)('inputRegs', `${__dirname}/../data/input-registers.tsv`);
        // holdingRegs.forEach(holdingReg => {
        //     holdingReg._address = parseInt(holdingReg._address as string, 10) - 40001;
        //     if (holdingReg.formula) {
        //         const match = holdingReg.formula.match(/sf\['(\d+)']/);
        //         if (match) {
        //             holdingReg.formula = holdingReg.formula.replace(
        //                 match[1],
        //                 (parseInt(match[1], 10) - 40001).toString(),
        //             );
        //         }
        //     }
        // });
        super(adapterName, adapterOptions, {
            params: {
                // Do not show addresses in the object IDs
                doNotIncludeAdrInId: true,
                // Remove the leading "_" in the names
                removeUnderscorePrefix: true,
                // Do not show aliases, because we don't want to see addresses
                showAliases: false,
                // Remove holdingRegister (and so on) from name
                // registerTypeInName: 'data',
            },
            holdingRegs,
            inputRegs,
        });
    }
}
exports.ModbusAdapter = ModbusAdapter;
// If started as allInOne mode => return function to create instance
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options) => new ModbusAdapter(options);
}
else {
    // otherwise start the instance directly
    (() => new ModbusAdapter())();
}
//# sourceMappingURL=main.js.map