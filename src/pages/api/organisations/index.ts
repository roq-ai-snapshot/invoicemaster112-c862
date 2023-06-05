import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organisationValidationSchema } from 'validationSchema/organisations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganisations();
    case 'POST':
      return createOrganisation();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganisations() {
    const data = await prisma.organisation
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organisation'));
    return res.status(200).json(data);
  }

  async function createOrganisation() {
    await organisationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.contract?.length > 0) {
      const create_contract = body.contract;
      body.contract = {
        create: create_contract,
      };
    } else {
      delete body.contract;
    }
    if (body?.invoice?.length > 0) {
      const create_invoice = body.invoice;
      body.invoice = {
        create: create_invoice,
      };
    } else {
      delete body.invoice;
    }
    if (body?.organisation_user?.length > 0) {
      const create_organisation_user = body.organisation_user;
      body.organisation_user = {
        create: create_organisation_user,
      };
    } else {
      delete body.organisation_user;
    }
    const data = await prisma.organisation.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
