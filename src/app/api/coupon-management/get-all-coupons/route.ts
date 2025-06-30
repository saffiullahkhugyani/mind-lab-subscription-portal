import { CouponDetailsModel } from "@/types/custom-types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: couponCodes, error: couponCodesError } = await supabase
      .from("coupon_codes")
      .select(
        "coupon_code, start_date, end_date, status, coupons!inner(coupon_id, programs!inner(program_english_name))"
      );
    const { data: couponsStudentMapping, error: couponsStudentMappingError } =
      await supabase
        .from("coupon_student_mapping")
        .select("coupon_id, students!inner(email)");

    if (couponCodesError) throw new Error(couponCodesError.message);
    if (couponsStudentMappingError)
      throw new Error(couponsStudentMappingError.message);

    if (!couponCodes || couponCodes.length === 0)
      return Response.json({ error: "No Coupon Codes Found" }, { status: 404 });

    if (!couponsStudentMapping || couponsStudentMapping.length === 0)
      return Response.json(
        { error: "No Coupons Mapping Found" },
        { status: 404 }
      );

    let couponsData: CouponDetailsModel[] = [];

    couponCodes.forEach((couponCode) => {
      couponsStudentMapping.forEach((item) => {
        if (item.coupon_id === couponCode.coupons.coupon_id) {
          couponsData.push({
            couponId: item.coupon_id,
            couponCode: couponCode.coupon_code,
            userEmail: item.students.email,
            startDate: couponCode.start_date,
            endDate: couponCode.end_date,
            status: couponCode.status,
            programName: couponCode.coupons.programs.program_english_name,
          });
        }
      });
    });

    return NextResponse.json({ success: true, data: couponsData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}
