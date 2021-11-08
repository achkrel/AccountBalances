import {SubstrateEvent} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    //Create a new Account entity with ID using block hash
    let record = new
    Account(event.extrinsic.block.block.header.hash.toString());
    // Assing the Polkadot address to the account filed
    record.account = account.toString();
    // Assing the balance to the balance filed "type cast as Balance"
    record.balance = (balance as Balance).toBigInt();
    await record.save();
}