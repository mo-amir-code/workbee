use anchor_lang::prelude::*;

#[constant]
pub const TASK_TAG: &[u8] = b"task";

#[constant]
pub const ONE_SOL_IN_LAMPORTS: u64 = 1_000_000_000;

// Common constants
pub const PADDING_LENGTH: usize = 16;
pub const DESCRIMINATOR_LENGTH: usize = 8;
pub const CREATED_AT_LENGTH: usize = 8;
pub const PUB_KEY_LENGTH: usize = 32;

// Task Struct Constants
pub const TASK_DETAIL_ID_LENGTH: usize = 16;
pub const CATEGORY_LENGTH: usize = 12;
pub const IS_COMPLETED_LENGTH: usize = 1;
pub const PRIZE_AMOUNT_LENGTH: usize = 8;
