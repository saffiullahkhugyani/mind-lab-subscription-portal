import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";
import { string } from "zod";

export default function WelcomeEmailTemplate(firstName: string) {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Welcome aboard! Let's get you started on your journey.
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[16px]">
                Welcome to Our Platform! 🎉
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Hi {firstName}, we're thrilled to have you join our community
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                You've just taken the first step towards an amazing experience.
                We've prepared everything you need to get started and make the
                most of your account.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Here's what you can do right now:
              </Text>

              {/* Action Items */}
              <Section className="bg-gray-50 rounded-[8px] p-[24px] mb-[24px]">
                <Text className="text-[14px] font-semibold text-gray-900 mb-[12px] m-0">
                  ✅ Complete your profile setup
                </Text>
                <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                  Add your details to personalize your experience
                </Text>

                <Text className="text-[14px] font-semibold text-gray-900 mb-[12px] m-0">
                  🚀 Explore key features
                </Text>
                <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                  Discover what makes our platform special
                </Text>

                <Text className="text-[14px] font-semibold text-gray-900 mb-[12px] m-0">
                  💬 Join our community
                </Text>
                <Text className="text-[14px] text-gray-600 m-0">
                  Connect with other users and share your experience
                </Text>
              </Section>

              {/* CTA Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href="https://example.com/get-started"
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
                >
                  Get Started Now
                </Button>
              </Section>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Support Section */}
            <Section className="mb-[32px]">
              <Heading className="text-[20px] font-bold text-gray-900 mb-[16px]">
                Need Help?
              </Heading>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px]">
                We're here to support you every step of the way. If you have any
                questions or need assistance:
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                • Check out our{" "}
                <a
                  href="https://example.com/help"
                  className="text-blue-600 underline"
                >
                  Help Center
                </a>
                <br />• Email us at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 underline"
                >
                  support@example.com
                </a>
                <br />• Join our community forum for tips and discussions
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[8px]">
                Thanks for joining us,
                <br />
                The Team at Our Platform
              </Text>

              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                Our Platform Inc.
                <br />
                123 Business Street, Suite 100
                <br />
                Business City, BC 12345
              </Text>

              <Text className="text-[12px] text-gray-400 leading-[16px] mt-[16px] m-0">
                <a
                  href="https://example.com/unsubscribe"
                  className="text-gray-400 underline"
                >
                  Unsubscribe
                </a>{" "}
                |
                <a
                  href="https://example.com/privacy"
                  className="text-gray-400 underline ml-[8px]"
                >
                  Privacy Policy
                </a>
              </Text>

              <Text className="text-[12px] text-gray-400 mt-[8px] m-0">
                © 2025 Our Platform Inc. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
