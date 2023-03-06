import { BigNumber, ContractReceipt, ethers } from "ethers";
import { ContractInfo } from "../utils/util_contractinfo";
import { logtools } from "../utils/util_log";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import * as fs from "fs";

export module extLock {
  export function RegTasks() {
    task("Lock:withdraw", "withdraw").setAction(async ({}, _hre) => {
      logtools.logyellow("method == [Lock:withdraw]");
      await ContractInfo.LoadFromFile(_hre);

      let contrat = await ContractInfo.getContract("Lock");

      let tran = await contrat.withdraw();
      let recipt: ContractReceipt = await tran.wait();
      logtools.loggreen("result = [");
      logtools.loggreen("     hash = " + recipt.transactionHash);
      logtools.loggreen("     status = " + recipt.status);
      logtools.loggreen("]");
      logtools.logcyan(
        "矿工费" +
          ethers.utils.formatUnits(
            recipt.gasUsed.mul(5000000000),
            BigNumber.from("18")
          )
      );
    });

    task("Lock:getBurnAmount", "getBurnAmount").setAction(async ({}, _hre) => {
      logtools.logyellow("method == [NGP:getBurnAmount]");
      await ContractInfo.LoadFromFile(_hre);

      let contrat = await ContractInfo.getContractProxy("NGP", "NGPProxy");

      let getBurnAmount = await contrat.getBurnAmount("E11402N2255");
      console.log("getBurnAmount:", getBurnAmount);
    });
  }
}
