use anchor_lang::{prelude::*, solana_program};

pub mod constant;
pub mod states;

use crate::states::*;

declare_id!("7CCMb9Xa1hbVaD1JAsMmkRsekxMRvtqVa4tprQaJ5vxS");

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

        let transfer_ix = solana_program::system_instruction::transfer(
            &authority.key(),
            &new_task.key(),
            prize_amount,
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
        new_task.prize_amount = prize_amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddTask<'info> {
    #[account(
        init,
        payer = authority,
        space = Task::LEN
    )]
    pub task_account: Account<'info, Task>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}