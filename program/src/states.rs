use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct Task {
    pub owner: Pubkey,
    pub title: String,
    pub brief_description: String,
    pub category: String,
    pub created_at: i64,
    pub is_completed: bool,
    pub prize_amount: u64,
}