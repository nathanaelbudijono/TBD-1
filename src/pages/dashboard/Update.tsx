import * as React from "react";

import { useRouter } from "next/router";

import Button from "@/components/buttons/button";
import Breadcrumbs from "@/components/core/breadcrumb";
import Typography from "@/components/core/typography";
import Input from "@/components/forms/input";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";

import { User } from "@/lib/slices/user-slices";
import { useAppStore } from "@/lib/store";

import Dashboardmain from "@/modules/Dashboard/main";
import Footer from "@/modules/footer";
import Navbar from "@/modules/navbar";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { ImSpinner2 } from "react-icons/im";

interface Inputs {
  id: string;
  mataKuliah: string;
}

export default function Update({ user }: { user: User }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { getMKByID, singleMK, updateMK } = useAppStore();
  const router = useRouter();
  const slug = router.query.slug as string;

  const methods = useForm<Inputs>({
    mode: "onTouched",
  });
  const { handleSubmit, reset } = methods;

  ///----Start Region get Matakuliah by ID-----///
  React.useEffect(() => {
    getMKByID(slug);
  }, [slug, singleMK]);

  ///----End Region get Matakuliah by ID-----///
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      await updateMK(data.id, data.mataKuliah, slug);
      toast("Mata Kuliah berhasil diupdate");
    } catch (err) {
      console.log(err);
      toast.error("Mata Kuliah gagal diedit");
    } finally {
      setIsLoading(false);
    }

    return;
  };
  return (
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
              <Typography variant="h4">Formulir Update MataKuliah</Typography>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 bg-[#7577b3] px-5 py-4 rounded-md shadow-sm w-full"
              >
                <FormProvider {...methods}>
                  <Input id="id" placeholder="id" label="id" />
                  <Input
                    id="mataKuliah"
                    placeholder="matakuliah"
                    label="matakuliah"
                  />
                  <Button variant="primary" type="submit" disabled={isLoading}>
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
  );
}
