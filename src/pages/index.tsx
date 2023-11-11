import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Button from "@/components/buttons/button";
import Seo from "@/components/core/seo";
import Typography from "@/components/core/typography";
import Input from "@/components/forms/input";
import PasswordInput from "@/components/forms/password-input";
import Layout from "@/components/layout/layout";

import { redirectUser } from "@/lib/verification/redirect-user";

import { useAppStore } from "@/lib/store";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineXCircle } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import UnstyledLink from "@/components/links/unstyled-link";
type Inputs = {
  username: string;
  password: string;
};

export default function Home() {
  const router = useRouter();
  const { loginUser, errorMessage } = useAppStore();
  const methods = useForm<Inputs>({
    mode: "onTouched",
  });
  const { handleSubmit, reset, clearErrors } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await loginUser(data.username, data.password);
    router.push("/dashboard");
    return;
  };
  const handleClear = () => {
    reset({ username: "" });
    clearErrors("username");
  };
  return (
    <main className="relative">
      <Seo title="Login" />
      <Layout className="justify-center items-center flex-col h-screen relative">
        <section className="px-10 py-7 bg-primary-300 rounded-md shadow-md backdrop-blur-[5px] bg-opacity-40">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 "
          >
            <FormProvider {...methods}>
              <Typography variant="h3">Login</Typography>
              {errorMessage && (
                <Typography variant="small">{errorMessage}</Typography>
              )}
              <Input
                id="username"
                validation={{ required: "Name must be filled" }}
                placeholder="Enter your username"
                leftIcon={AiOutlineUser}
                rightNode={
                  <button type="button" className="p-1" onClick={handleClear}>
                    <HiOutlineXCircle className="text-xl text-typo-icons" />
                  </button>
                }
              />
              <PasswordInput
                id="password"
                validation={{ required: "Password must be filled" }}
                placeholder="Enter your password"
                leftIcon={RiLockPasswordFill}
              />
              <Button type="submit" variant="primary">
                Login
              </Button>
            </FormProvider>
          </form>
          <UnstyledLink href="/register" className="mt-3">
            Create an account
          </UnstyledLink>
        </section>
      </Layout>
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await redirectUser(ctx);
}
