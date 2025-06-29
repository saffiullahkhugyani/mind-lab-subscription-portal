import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

export interface SpecialDealEmailProps {
  userId: string;
  userName: string;
  userEmail: string;
  programId: number;
  programName: string;
  specialDealUrl: string;
  prices: {
    normal: {
      oneMonth: number;
      threeMonth: number;
      twelveMonth: number;
    };
    special: {
      oneMonth: number;
      threeMonth: number;
      twelveMonth: number;
    };
    discounts: {
      oneMonth: string;
      threeMonth: string;
      twelveMonth: string;
    };
  };
}

const SpecialDealEmail: React.FC<SpecialDealEmailProps> = ({
  userName,
  userEmail,
  programName,
  specialDealUrl,
  prices,
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto rounded-[8px] overflow-hidden">
            {/* Header */}
            <Section className="bg-red-600 text-center py-[24px] px-[32px]">
              <Text className="text-white text-[28px] font-bold m-0 leading-tight">
                🎉 Hi {userName}, Special Deal Just for You!
              </Text>
              <Text className="text-red-100 text-[16px] m-0 mt-[8px]">
                Enjoy exclusive savings on <strong>{programName}</strong>
              </Text>
            </Section>

            {/* Body */}
            <Section className="px-[32px] py-[32px] text-center">
              <Text className="text-[16px] text-gray-600 mb-[24px] leading-relaxed">
                We've crafted a special deal just for you. Choose the right plan
                and enjoy amazing discounts.
              </Text>

              {/* Pricing */}
              <Section className="bg-gray-50 border border-gray-200 rounded-[8px] p-[24px] mb-[32px] text-left">
                <Text className="text-[20px] font-bold text-gray-900 mb-[20px] text-center">
                  {programName} – Pricing Comparison
                </Text>

                {[
                  {
                    label: "1 Month",
                    normal: prices.normal.oneMonth,
                    special: prices.special.oneMonth,
                    discount: prices.discounts.oneMonth,
                  },
                  {
                    label: "3 Month",
                    normal: prices.normal.threeMonth,
                    special: prices.special.threeMonth,
                    discount: prices.discounts.threeMonth,
                  },
                  {
                    label: "12 Month",
                    normal: prices.normal.twelveMonth,
                    special: prices.special.twelveMonth,
                    discount: prices.discounts.twelveMonth,
                  },
                ].map(({ label, normal, special, discount }) => (
                  <Section key={label} className="mb-[16px]">
                    <Text className="text-[16px] font-semibold text-gray-900 m-0 mb-[4px]">
                      {label} Plan
                    </Text>
                    <Text className="text-[16px] text-gray-700 m-0">
                      Normal Price:{" "}
                      <span className="line-through">${normal.toFixed(2)}</span>
                    </Text>
                    <Text className="text-[16px] text-red-600 font-bold m-0">
                      Special Price: ${special.toFixed(2)} ({discount} off)
                    </Text>
                  </Section>
                ))}
              </Section>

              {/* CTA */}
              <Button
                href={specialDealUrl}
                className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-red-700"
              >
                Claim Your Special Deal
              </Button>

              <Text className="text-[12px] text-gray-500 m-0 mt-[16px]">
                ⏰ Hurry! This offer expires in 48 hours.
              </Text>
            </Section>

            <Hr className="border-gray-200 mx-[32px]" />

            {/* Footer */}
            <Section className="px-[32px] py-[24px] text-center">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                Sent to: {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                Questions? Reply to this email or contact support.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
                123 Business Street, Peshawar, Pakistan
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SpecialDealEmail;
