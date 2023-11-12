import Button from "@/components/buttons/button";
import Modal from "@/components/core/modal";
import Typography from "@/components/core/typography";

import * as React from "react";

type ModalReturnType = {
  openModal: () => void;
};

type ModalProps = {
  handleButtonDelete: (id: string) => Promise<void>;
  id: string;
  sks: number;
  name: string;
  children: (props: ModalReturnType) => JSX.Element;
};

export default function DeleteModal({
  handleButtonDelete,
  id,
  sks,
  name,
  children,
}: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title="Modal Title">
        <Modal.Section>
          <Typography variant="h4" className="text-start">
            Mata Kuliah {name}?
          </Typography>
          <span className="h-[2px] bg-d-100 w-full"> </span>
          <Typography variant="p" className="text-start">
            Perhatian, anda akan menghapus mata kuliah {name} dengan kode
            {id} dan bobot SKS sebesar {sks}. Tindakan anda tidak dapat diulang
            dan data akan terhapus secara permanen!
          </Typography>
        </Modal.Section>
        <Modal.Section>
          <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              size="base"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="warning"
              size="base"
              onClick={() => handleButtonDelete(id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
