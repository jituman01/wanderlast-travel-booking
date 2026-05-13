"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

export function BookingCancelAlert({bookingId}) {


    const handleCancelBooking = async() =>{

        const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })

        const data = await res.json();

        window.location.reload();

        toast.success('Your Booking Cancelled !!')
    }


  return (
    <AlertDialog>
      <Button
        className={" rounded-none border-red-500 text-red-500"}
        variant="outline"
      >
        <TrashBin /> Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-cyan-100">
            <AlertDialog.CloseTrigger className={'bg-white'}/>
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" className="bg-white" />
              <AlertDialog.Heading>
                Cancel Project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className={'bg-white'}>
                Cancel
              </Button>
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}