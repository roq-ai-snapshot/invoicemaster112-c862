import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { organisationUserValidationSchema } from 'validationSchema/organisation-users';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.organisation_user
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getOrganisationUserById();
    case 'PUT':
      return updateOrganisationUserById();
    case 'DELETE':
      return deleteOrganisationUserById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganisationUserById() {
    const data = await prisma.organisation_user.findFirst(convertQueryToPrismaUtil(req.query, 'organisation_user'));
    return res.status(200).json(data);
  }

  async function updateOrganisationUserById() {
    await organisationUserValidationSchema.validate(req.body);
    const data = await prisma.organisation_user.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteOrganisationUserById() {
    const data = await prisma.organisation_user.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
