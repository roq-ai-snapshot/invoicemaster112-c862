-- CreateTable
CREATE TABLE "contract" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organisation_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organisation_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisation_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organisation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "organisation_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "invoice_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_date" DATE NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organisation" ADD CONSTRAINT "organisation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organisation_user" ADD CONSTRAINT "organisation_user_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organisation_user" ADD CONSTRAINT "organisation_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

