import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";

export default function orderModal({onClick} : {onClick : () => void}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="rounded-lg bottom-0 mt-2 me-2" onPress={onOpen} color="secondary">Add to Order</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Addition Order Infomation</ModalHeader>
              <ModalBody>

                <Textarea
                  autoFocus
                  label="Topping"
                  placeholder="Add Topping to the product"
                  className=""
                  variant="bordered"
                />
                <Textarea
                  autoFocus
                  label="Noted"
                  placeholder="Addition note"
                  className=""
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={onClick} color="primary" onPress={onClose}>
                  Add
                </Button> 
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
