use anchor_lang::{prelude::*, solana_program};
use std::mem::size_of;

pub mod constant;
pub mod states;

use crate::{constant::*, states::*};

declare_id!("Hewk4zP3LATWU6QaDqKq2K7zAkpS6nUYogkXfC7fS7wM");

#[program]
pub mod workbee {
    use super::*;

    pub fn add_task(
        ctx: Context<AddTask>,
        title: String,
        brief_description: String,
        category: String,
        prize_amount: u64,
    ) -> Result<()> {
        let new_task = &mut ctx.accounts.task_account;
        let authority = &ctx.accounts.authority;

        let sol_amount_in_lamports = prize_amount * ONE_SOL_IN_LAMPORTS;

        let transfer_ix = solana_program::system_instruction::transfer(
            &authority.key(),
            &new_task.key(),
            sol_amount_in_lamports,
        );

        solana_program::program::invoke(
            &transfer_ix,
            &[authority.to_account_info(), new_task.to_account_info()],
        )?;

        new_task.owner = authority.key();
        new_task.title = title;
        new_task.brief_description = brief_description;
        new_task.category = category;
        new_task.created_at = ctx.accounts.clock.unix_timestamp;
        new_task.is_completed = false;
        new_task.prize_amount = sol_amount_in_lamports;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct AddTask<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [TASK_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<Task>() + 8
    )]
    pub task_account: Box<Account<'info, Task>>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}