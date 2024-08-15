import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Workbee } from "../target/types/workbee";
import { assert } from "chai";
import { Keypair } from "@solana/web3.js";

describe("workbee", () => {
  // Configure the client to use the Localhost cluster.
  const provider = anchor.AnchorProvider.local("https://api.devnet.solana.com");
  anchor.setProvider(provider);

  const program = anchor.workspace.Workbee as Program<Workbee>;

  // Generate a new Keypair for the completer
  const completer = Keypair.generate();

  // Use the wallet from the local Solana CLI as the authority
  const authority = provider.wallet.publicKey;

  const taskAccount = Keypair.generate();

  
  it("Add a task", async () => {
    console.log("Task Account Public Key: ", taskAccount.publicKey.toBase58());

    const task_detail_id = "1234re";
    const category = "Development";
    const prizeAmount = 0.1 * anchor.web3.LAMPORTS_PER_SOL;

    // Add a new task
    const txId = await program.methods
      .addTask(task_detail_id, category, new anchor.BN(prizeAmount))
      .accounts({
        taskAccount: taskAccount.publicKey,
        authority: authority
      })
      .signers([taskAccount])
      .rpc();

    console.log("Add Task Transaction ID:", txId);

    // Confirm the transaction
    // await provider.connection.confirmTransaction(txId);

    // Fetch the updated task account
    const task = await program.account.task.fetch(taskAccount.publicKey);
    console.log("New Task: ", task);

    // Get the balance of the completer after completing the task
    // const balanceAfter = await provider.connection.getBalance(completer.publicKey);
    // console.log("Completer balance after completing task:", balanceAfter / anchor.web3.LAMPORTS_PER_SOL, "SOL");

    // Check if the task was marked complete
    // assert.equal(task.isCompleted, true);
    // assert.equal(task.completer.toBase58(), completer.publicKey.toBase58());
  });

  it("Complete Task", async () => {
    console.log("Completer Account Public Key: ", completer.publicKey.toBase58());

     // Mark Task as complete
    const completeTxId = await program.methods.completeTask()
     .accounts({
       taskAccount: taskAccount.publicKey,
       authority: authority,
       completer: completer.publicKey
     })
     .signers([completer])
     .rpc();

    console.log("Complete Task Transaction ID:", completeTxId);

    // Fetch the updated task account
    // const task = await program.account.task.fetch(taskAccount.publicKey);

    // Get the balance of the completer after completing the task
    const balanceAfter = await provider.connection.getBalance(completer.publicKey);
    console.log("Completer balance after completing task:", balanceAfter / anchor.web3.LAMPORTS_PER_SOL, "SOL");

    // Check if the task was marked complete
    // assert.equal(task.isCompleted, true);
    // assert.equal(task.completer.toBase58(), completer.publicKey.toBase58());
  });


});