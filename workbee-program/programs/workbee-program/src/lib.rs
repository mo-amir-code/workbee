use anchor_lang::{prelude::*, solana_program};

pub mod constant;
pub mod error;
pub mod states;

use crate::error::*;
use crate::states::*;

declare_id!("9CKdScUs677C7aqd8rKt944fzwLJhdU8pDhHK1C4iGpb");

#[program]
pub mod workbee {
    use super::*;

    pub fn add_task(
        ctx: Context<AddTask>,
        task_detail_id: String,
        category: String,
        prize_amount: u64,
    ) -> Result<()> {
        let new_task = &mut ctx.accounts.task_account;
        let user = &ctx.accounts.user;

        let transfer_ix = solana_program::system_instruction::transfer(
            &user.key(),
            &new_task.key(),
            prize_amount,
        );

        solana_program::program::invoke(
            &transfer_ix,
            &[user.to_account_info(), new_task.to_account_info()],
        )?;

        new_task.owner = user.key();
        new_task.task_detail_id = task_detail_id;
        new_task.category = category;
        new_task.created_at = ctx.accounts.clock.unix_timestamp;
        new_task.is_completed = false;
        new_task.prize_amount = prize_amount;

        Ok(())
    }

    pub fn complete_task(ctx: Context<CompleteTask>) -> Result<()> {
        let task_account = &mut ctx.accounts.task_account;
        let completer = &ctx.accounts.completer;

        if !is_valid_pubkey_format(&completer.key()) {
            return Err(WorkBeeErrors::InvalidCompleterPubkey.into());
        }

        if task_account.is_completed {
            return Err(WorkBeeErrors::TaskAlreadyCompleted.into());
        }

        let transaction_ix = solana_program::system_instruction::transfer(
            &task_account.key(),
            &completer.key(),
            task_account.prize_amount,
        );

        solana_program::program::invoke(
            &transaction_ix,
            &[task_account.to_account_info(), completer.to_account_info()],
        )?;

        task_account.completer = completer.key();
        task_account.is_completed = true;

        Ok(())
    }

}

pub fn is_valid_pubkey_format(pubkey: &Pubkey) -> bool {
    pubkey.to_bytes().len() == 32
}

#[derive(Accounts)]
pub struct AddTask<'info> {
    #[account(
        init,
        payer = user,
        space = Task::LEN
    )]
    pub task_account: Account<'info, Task>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CompleteTask<'info> {
    #[account(mut)]
    pub task_account: Account<'info, Task>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub completer: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}