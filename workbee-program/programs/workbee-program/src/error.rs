use anchor_lang::prelude::*;

#[error_code]
pub enum WorkBeeErrors {
    #[msg("The provided task ID does not match the task account public key.")]
    InvalidTaskId,
    #[msg("The provided completer public key is not valid.")]
    InvalidCompleterPubkey,
}
