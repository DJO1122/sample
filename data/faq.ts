import { GST_RATE, LIVE_CHANNEL_COUNT } from "@/data/plans";
import { SITE } from "@/data/site";

export interface FaqEntry {
  question: string;
  answer: string;
}

export const FAQS: FaqEntry[] = [
  {
    question: "How long does installation take?",
    answer:
      "Most connections in covered areas are installed within 24 to 48 hours of your site check. Our technician runs the fiber, installs the router and confirms your speed before leaving.",
  },
  {
    question: "Who owns the modem and router?",
    answer:
      "Free modems and routers remain the property of Aerotel Net Pvt Ltd. They stay with the connection and are returned if you discontinue the service.",
  },
  {
    question: "Is GST included in the prices shown?",
    answer: `No. Every price on this site is exclusive of GST. ${GST_RATE}% GST is applicable on all plan values and is added to your bill.`,
  },
  {
    question: "Do you cover my area?",
    answer:
      "Plans are available in selected cities and localities. Share your area on the booking form or call us and we will confirm availability before any payment.",
  },
  {
    question: "What are the installation charges?",
    answer:
      "Installation charges are confirmed after verifying your map location and the wiring distance from our nearest fiber point. We quote the exact amount before we start work.",
  },
  {
    question: "How do I pay my bill?",
    answer: `You can pay at our Poyampalayam office or through the payment link our team shares with you. Call ${SITE.phones[0].display} if you need a receipt or a GST invoice.`,
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes. Call our support line and we will move you to another plan from your next billing cycle. There is no charge for changing speed on an existing fiber line.",
  },
  {
    question: "What is included in IPTV and OTT?",
    answer:
      `IPTV carries ${LIVE_CHANNEL_COUNT}+ live channels in SD and HD. The OTT bundle adds the Smart Play TV apps. The exact app and channel list is confirmed at the time of booking.`,
  },
];
