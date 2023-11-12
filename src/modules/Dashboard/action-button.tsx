import IconButton from "@/components/buttons/icon-button";
import DeleteModal from "@/components/modules/modals/onclick-module";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";

type EditButtonProps = {
  id: string;
  name: string;
  sks: number;
};

export default function EditButton({ id, name, sks }: EditButtonProps) {
  const router = useRouter();
  const { deleteMK } = useAppStore();

  const handleButtonDelete = async (id: string) => {
    await deleteMK(id);
    toast("Mata kuliah berhasil di hapus");
    window.location.reload();
  };
  return (
    <main className="flex gap-2 justify-center">
      <IconButton
        icon={AiFillEdit}
        size="sm"
        onClick={() => {
          router.push(`/dashboard/update/${id}`);
        }}
      />
      <DeleteModal
        name={name}
        sks={sks}
        id={id}
        handleButtonDelete={handleButtonDelete}
      >
        {({ openModal }) => (
          <IconButton icon={BsFillTrash3Fill} size="sm" onClick={openModal} />
        )}
      </DeleteModal>
      <Toaster />
    </main>
  );
}
