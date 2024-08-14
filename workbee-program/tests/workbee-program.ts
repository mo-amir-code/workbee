import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Workbee } from "../target/types/workbee";
import { assert } from "chai";
import { Keypair } from "@solana/web3.js";

describe("workbee", () => {
  // Configure the client to use the Devnet cluster.
  const provider = anchor.AnchorProvider.local("https://api.devnet.solana.com");
  anchor.setProvider(provider);

  const program = anchor.workspace.Workbee as Program<Workbee>;

  // Use the wallet from the local Solana CLI as the authority
  const authority = provider.wallet.publicKey;

  it("Adds a task and retrieves all task accounts", async () => {
    const taskAccount = Keypair.generate();

    const title = "Build a DApp using Rust language on solana blockchain";
    const briefDescription = "Build a decentralized application on Solana";
    const category = "Development";
    const prizeAmount = 0.1 * anchor.web3.LAMPORTS_PER_SOL;

    // Add a new task
    const tx = await program.methods
      .addTask(
        title,
        briefDescription,
        category,
        new anchor.BN(prizeAmount)
      )
      .accounts({
        taskAccount: taskAccount.publicKey,
        authority: authority,
        // systemProgram: anchor.web3.SystemProgram.programId,
        // clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      })
      .signers([taskAccount])
      .rpc();

    console.log("Transaction signature", tx);

    // Fetch the specific task
    const task = await program.account.task.fetch(taskAccount.publicKey);

    assert.equal(task.owner.toBase58(), authority.toBase58());
    assert.equal(task.title, title);
    assert.equal(task.briefDescription, briefDescription);
    assert.equal(task.category, category);
    assert.equal(task.isCompleted, false);
    assert.equal(task.prizeAmount.toNumber(), prizeAmount);

    console.log("Task added successfully with title:", task.title);

    // Fetch and display all task accounts
    const allTasks = await program.account.task.all();

    console.log("All Task Accounts:");
    allTasks.forEach((t, index) => {
      console.log(`Task ${index + 1}:`);
      console.log(`  Public Key: ${t.publicKey.toBase58()}`);
      console.log(`  Title: ${t.account.title}`);
      console.log(`  Description: ${t.account.briefDescription}`);
      console.log(`  Category: ${t.account.category}`);
      console.log(`  Prize Amount: ${t.account.prizeAmount.toNumber()}`);
      console.log(`  Is Completed: ${t.account.isCompleted}`);
      console.log(`  Created At: ${new Date(Number(t.account.createdAt) * 1000).toLocaleString()}`);
    });

    assert.isTrue(allTasks.length > 0, "There should be at least one task account");
  });
});