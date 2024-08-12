use anchor_lang::prelude::*;

#[constant]
pub const TASK_TAG: &[u8] = b"task";

#[constant]
pub const ONE_SOL_IN_LAMPORTS: u64 = 1_000_000_000;

pub const PADDING_LENGTH: usize = 16;
pub const DESCRIMINATOR_LENGTH: usize = 8;
pub const TITLE_LENGTH: usize = 60;
pub const DESCRIPTION_LENGTH: usize = 1900;
pub const CATEGORY_LENGTH: usize = 12;
pub const OWNER_LENGTH: usize = 32;
pub const CREATED_AT_LENGTH: usize = 8;
pub const IS_COMPLETED_LENGTH: usize = 1;
pub const PRIZE_AMOUNT_LENGTH: usize = 8;