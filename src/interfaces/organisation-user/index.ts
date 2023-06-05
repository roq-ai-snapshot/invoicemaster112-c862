import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';

export interface OrganisationUserInterface {
  id?: string;
  organisation_id: string;
  user_id: string;

  organisation?: OrganisationInterface;
  user?: UserInterface;
  _count?: {};
}
