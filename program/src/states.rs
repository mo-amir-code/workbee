use anchor_lang::prelude::*;
use crate::constant::*;

#[account]
pub struct Task {
    pub owner: Pubkey,
    pub title: String,
    pub brief_description: String,
    pub category: String,
    pub created_at: i64,
    pub is_completed: bool,
    pub prize_amount: u64,
}

impl Task {
    pub const LEN: usize = PADDING_LENGTH
        + DESCRIMINATOR_LENGTH
        + TITLE_LENGTH
        + DESCRIPTION_LENGTH
        + CATEGORY_LENGTH
        + OWNER_LENGTH
        + CREATED_AT_LENGTH
        + IS_COMPLETED_LENGTH
        + PRIZE_AMOUNT_LENGTH;
}