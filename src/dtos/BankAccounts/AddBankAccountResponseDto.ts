import { BankAccount } from '../../models/BankAccount';
import { DefaultResponseDto } from '../DefaultResponseDto';

export interface AddBankAccountResponseDto
	extends DefaultResponseDto
{
	BankAccount: BankAccount;
}
