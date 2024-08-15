use anchor_lang::prelude::*;
use crate::constant::*;

#[account]
#[derive(Debug)]
pub struct Task {
    pub owner: Pubkey,
    pub task_detail_id: String,
    pub category: String,
    pub created_at: i64,
    pub is_completed: bool,
    pub prize_amount: u64,
    pub completer: Pubkey,
}

impl Task {
    pub const LEN: usize = PADDING_LENGTH
        + DESCRIMINATOR_LENGTH
        + CATEGORY_LENGTH
        + TASK_DETAIL_ID_LENGTH
        + PUB_KEY_LENGTH
        + PUB_KEY_LENGTH
        + CREATED_AT_LENGTH
        + IS_COMPLETED_LENGTH
        + PRIZE_AMOUNT_LENGTH;
}