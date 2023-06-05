import { ContractInterface } from 'interfaces/contract';
import { InvoiceInterface } from 'interfaces/invoice';
import { OrganisationUserInterface } from 'interfaces/organisation-user';
import { UserInterface } from 'interfaces/user';

export interface OrganisationInterface {
  id?: string;
  name: string;
  user_id: string;
  contract?: ContractInterface[];
  invoice?: InvoiceInterface[];
  organisation_user?: OrganisationUserInterface[];
  user?: UserInterface;
  _count?: {
    contract?: number;
    invoice?: number;
    organisation_user?: number;
  };
}
