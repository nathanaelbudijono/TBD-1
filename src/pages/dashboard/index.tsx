import * as React from "react";

import Button from "@/components/buttons/button";
import Breadcrumbs from "@/components/core/breadcrumb";
import Typography from "@/components/core/typography";
import Input from "@/components/forms/input";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";

import { getUser } from "@/lib/verification/getUser";
import { User } from "@/lib/slices/user-slices";
import { useAppStore } from "@/lib/store";

import Dashboardmain from "@/modules/Dashboard/main";
import Navbar from "@/modules/navbar";

import Footer from "@/modules/footer";

import { GetServerSidePropsContext } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ImSpinner2 } from "react-icons/im";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Seo from "@/components/core/seo";

interface Inputs {
  id: string;
  mataKuliah: string;
}

export default function Dashboard({ user }: { user: User }) {
  const { postMK, errorMessageMK } = useAppStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm<Inputs>({
    mode: "onTouched",
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await postMK(data.id, data.mataKuliah);
      if (errorMessageMK === "Kode MK/Nama MK sudah pernah dibuat") {
        return toast.error(errorMessageMK);
      } else {
        return toast("Mata Kuliah berhasil dibuat");
      }
    } catch (err) {
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }

    return;
  };
  ///-----End Region create Matakuliah-----///
  return (
    <>
      <Seo siteName="Dashboard" title="FENS" />
      <BaseLayout>
        <Navbar user={user.username} />
        <Layout className="flex flex-col">
          <Breadcrumbs />
          <main className="flex flex-col mt-2">
            <Typography variant="h2" className="mb-3">
              Dashboard
            </Typography>
            <Dashboardmain />
            <section className="mt-5">
              <div>
                <Typography variant="h4">
                  Formulir Membuat MataKuliah
                </Typography>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 bg-primary-300 px-5 py-4 rounded-md shadow-sm w-full"
                >
                  <FormProvider {...methods}>
                    <Input
                      id="id"
                      placeholder="ID"
                      label="ID"
                      validation={{ required: "ID must be filled" }}
                    />
                    <Input
                      id="mataKuliah"
                      placeholder="Matakuliah"
                      label="Matakuliah"
                      validation={{ required: "Matakuliah must be filled" }}
                    />

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ImSpinner2 className="animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </FormProvider>
                </form>
              </div>
            </section>
            <Toaster />
          </main>
        </Layout>
        <Footer />
      </BaseLayout>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await getUser(ctx);
}
