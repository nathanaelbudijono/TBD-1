import * as React from "react";

import Breadcrumbs from "@/components/core/breadcrumb";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";

import { getUser } from "@/lib/verification/getUser";
import { User } from "@/lib/slices/user-slices";

import Navbar from "@/modules/navbar";
import DashboardTable from "@/modules/Dashboard/table-rekap";
import Footer from "@/modules/footer";

import { GetServerSidePropsContext } from "next";

export default function Dashboard({ user }: { user: User }) {
  return (
    <BaseLayout>
      <Navbar user={user.username} />
      <Layout className="flex flex-col h-screen">
        <Breadcrumbs />
        <DashboardTable />
      </Layout>
      <Footer />
    </BaseLayout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await getUser(ctx);
}
