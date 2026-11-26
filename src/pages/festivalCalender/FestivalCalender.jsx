
import React from "react";
import { Helmet } from "react-helmet-async";
import HinduFestivalCalendar from "../../components/hinduCalender/HinduFestivalCalender";

function FestivalCalender() {
  return (
    <>
      <Helmet>
       <title>Hindu Festival Calendar | Festivals & Vrats | Poonjora</title>

        <meta
          name="description"
          content="Explore the Hindu Festival Calendar with festival dates, vrat details, tithi timings and sacred observances based on your selected city."
        />

        <link
          rel="canonical"
          href="https://poonjora.com/hindu-festival-calendar"
        />
      </Helmet>

      <HinduFestivalCalendar />
    </>
  );
}

export default FestivalCalender;
