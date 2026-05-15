"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const  [departureDate, setDepartureDate]  = useState(null);
  // console.log(new Date (departureDate));
  const { price,_id,destinationName,imageUrl, country } = destination;
  
  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
        userImage: user?.image,
        userName: user?.name,
        destinationId: _id,
        destinationName,
        price,
        imageUrl,
        country,
        departureDate: new Date(departureDate)
    }

    const { data: tokenData } = await authClient.token()
    console.log(tokenData);
    

    // console.log(bookingData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(bookingData)
    })

    const data = await res.json();
    // console.log(data);
    toast.success('You Booked Successfully')
  }
  
  
  return (
     <Card className="rounded-none border mt-5">
      <p className="text-sm text-muted">Starting from</p>
      <h2 className="text-3xl font-bold text-cyan-500">${price}</h2>
      <p className="text-sm text-muted">per person</p>

      <DateField onChange={setDepartureDate}  className="w-[256px]" name="date">
        <Label>Departure Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button onClick={handleBooking} className={"w-full rounded-none bg-cyan-500"}>Book Now</Button>
    </Card>
  );
};

export default BookingCard;